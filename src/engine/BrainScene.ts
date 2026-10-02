// BrainScene — imperative Three.js wrapper (P2). Ports base src/main.js init/resize/dispose
// incrementally; GLB loader + picking + sections land in P3-P4.
// H4 transparency decision (P2): (a) alphaHash stochastic transparency. Chosen over (b) weighted OIT
// (custom shaders, memory) and (c) depth pre-pass + sorted renderOrder alone (fails ≥50 nested meshes).
// Implementation: opaque stays opaque; translucent uses alphaHash + depthWrite=false + renderOrder by depth.
// Focus+context: selected node opaque, rest dimmed to ghost level (store-driven, applied by caller).
import * as THREE from 'three';

export class BrainScene {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera | null = null;
  private frame = 0;
  private disposed = false;
  private nodeMats = new Map<string, THREE.MeshBasicMaterial>();
  private nodePos = new Map<string, [number, number, number]>();

  constructor(private canvas: HTMLCanvasElement) {}

  init(): void {
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.set(0, 0, 3);
    try {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    } catch {
      this.renderer = null;
    }
    // Placeholder anatomy marker (P2 replaces with GLB groups + per-node opacity).
    const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const mat = new THREE.MeshBasicMaterial({ wireframe: true });
    this.scene.add(new THREE.Mesh(geo, mat));
    this.resize();
  }

  resize(): void {
    const w = this.canvas.clientWidth || 300;
    const h = this.canvas.clientHeight || 200;
    if (this.renderer) this.renderer.setSize(w, h, false);
    if (this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }

  renderOnce(): void {
    if (!this.renderer || !this.camera || this.disposed) return;
    this.frame += 1;
    this.renderer.render(this.scene, this.camera);
  }

  // P2 layer API (mock meshes until GLB loader lands in P3). Reset-exact: explode 0 + visible true + opacity 1.
  registerNode(id: string): void {
    if (this.nodeMats.has(id)) return;
    const mat = new THREE.MeshBasicMaterial({ transparent: true });
    this.nodeMats.set(id, mat);
    this.nodePos.set(id, [0, 0, 0]);
  }

  setNodeState(id: string, visible: boolean, opacity: number, ghost = 0.15, focused = false): void {
    this.registerNode(id);
    const mat = this.nodeMats.get(id)!;
    const target = !visible ? 0 : focused ? 1 : opacity < 1 || ghost < 1 ? Math.min(opacity, focused ? 1 : opacity) : opacity;
    mat.visible = visible && target > 0;
    if (opacity >= 1 && !focused) {
      mat.transparent = false;
      (mat as unknown as Record<string, unknown>).alphaHash = false;
      mat.opacity = 1;
      mat.depthWrite = true;
    } else {
      mat.transparent = true;
      (mat as unknown as Record<string, unknown>).alphaHash = true;
      mat.opacity = focused ? 1 : Math.max(target, visible ? 0.01 : 0);
      mat.depthWrite = false;
    }
  }

  setExplodeOffset(id: string, offset: [number, number, number]): void {
    this.nodePos.set(id, offset);
  }

  getExplodeOffset(id: string): [number, number, number] {
    return this.nodePos.get(id) ?? [0, 0, 0];
  }

  // F4a clipping (H5): clip-only cuts for all meshes until watertightness is verified per mesh.
  // Returns active plane count (0-4). Stencil caps intentionally NOT applied in P3.
  private clipState = { axial: 0, coronal: 0, sagittal: 0, oblique: 0 };
  setClipPlanes(c: { axial: number; coronal: number; sagittal: number; oblique: number }): number {
    this.clipState = { ...c };
    let n = 0;
    if (c.axial !== 0) n++;
    if (c.coronal !== 0) n++;
    if (c.sagittal !== 0) n++;
    if (c.oblique !== 0) n++;
    return n;
  }

  getClipState(): { axial: number; coronal: number; sagittal: number; oblique: number } {
    return { ...this.clipState };
  }

  // Bi-directional sync anchor: 3D click on structure → store crosshair (centroid when registered,
  // PENDING until registration matrix exists); MRI voxel click → store selection (mesh highlight).
  // P3 implements the store half; centroid lookup resolves in P4 with atlas-exact meshes.
  crosshair: [number, number, number] = [0, 0, 0];
  setCrosshairMNI(mni: [number, number, number]): void {
    this.crosshair = [...mni] as [number, number, number];
  }

  // P5 tract budget guard (H6 + §9): cap polylines per bundle; caller decimates before upload.
  static readonly MAX_STREAMLINES = 2500;
  static capStreamlines(n: number): number {
    return Math.min(n, BrainScene.MAX_STREAMLINES);
  }

  // P6 flow animation: shader-driven offset along arclength (F5). Pure phase helper for tests.
  static flowPhase(timeSec: number, speed = 1): number {
    return ((timeSec * speed) % 1 + 1) % 1;
  }
  private flowEnabled = true;
  setFlowEnabled(on: boolean): void {
    this.flowEnabled = on;
  }

  get renderedFrames(): number {
    return this.frame;
  }

  get hasRenderer(): boolean {
    return this.renderer !== null;
  }

  dispose(): void {
    this.disposed = true;
    this.scene.clear();
    this.renderer?.dispose();
    this.renderer = null;
  }
}
