import { useEffect, useRef } from 'react';
import type { Keypoint } from '../../types';
import './PoseOverlay.scss';

const SKELETON_CONNECTIONS: [string, string][] = [
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],
];

interface PoseOverlayProps {
  keypoints: Keypoint[];
  width: number;
  height: number;
}

export function PoseOverlay({ keypoints, width, height }: PoseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    if (keypoints.length === 0) return;

    const kpMap = new Map(keypoints.map(kp => [kp.name, kp]));

    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    SKELETON_CONNECTIONS.forEach(([a, b]) => {
      const kpA = kpMap.get(a);
      const kpB = kpMap.get(b);
      if (!kpA || !kpB) return;
      ctx.beginPath();
      ctx.moveTo(kpA.x * width, kpA.y * height);
      ctx.lineTo(kpB.x * width, kpB.y * height);
      ctx.stroke();
    });

    ctx.fillStyle = '#ff4757';
    keypoints.forEach(kp => {
      if (kp.confidence < 0.5) return;
      ctx.beginPath();
      ctx.arc(kp.x * width, kp.y * height, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [keypoints, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="pose-overlay"
      width={width}
      height={height}
    />
  );
}
