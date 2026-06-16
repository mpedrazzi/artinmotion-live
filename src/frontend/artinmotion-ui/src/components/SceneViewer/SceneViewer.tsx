import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';
import type { PoseFrame } from '../../types';
import './SceneViewer.scss';

interface SceneViewerProps {
  poseFrame?: PoseFrame | null;
}

export function SceneViewer({ poseFrame }: SceneViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BABYLON.Engine | null>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);
  const sphereMapRef = useRef<Map<string, BABYLON.Mesh>>(new Map());

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new BABYLON.Engine(canvasRef.current, true);
    engineRef.current = engine;

    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;
    scene.clearColor = new BABYLON.Color4(0.05, 0.05, 0.1, 1);

    const camera = new BABYLON.ArcRotateCamera('cam', -Math.PI / 2, Math.PI / 3, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvasRef.current, true);

    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    engine.runRenderLoop(() => scene.render());
    window.addEventListener('resize', () => engine.resize());

    return () => {
      engine.dispose();
      window.removeEventListener('resize', () => engine.resize());
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current || !poseFrame) return;
    const scene = sceneRef.current;

    poseFrame.keypoints.forEach(kp => {
      let sphere = sphereMapRef.current.get(kp.name);
      if (!sphere) {
        sphere = BABYLON.MeshBuilder.CreateSphere(kp.name, { diameter: 0.08 }, scene);
        const mat = new BABYLON.StandardMaterial(`mat_${kp.name}`, scene);
        mat.emissiveColor = new BABYLON.Color3(1, 0.28, 0.35);
        sphere.material = mat;
        sphereMapRef.current.set(kp.name, sphere);
      }
      sphere.position.set(
        (kp.x - 0.5) * 3,
        -(kp.y - 0.5) * 3,
        kp.z * 3
      );
    });
  }, [poseFrame]);

  return (
    <div className="scene-viewer">
      <canvas ref={canvasRef} className="scene-viewer__canvas" />
    </div>
  );
}
