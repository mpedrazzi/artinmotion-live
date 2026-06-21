import { useEffect, useRef } from 'react';
import type { Keypoint } from '../../types';
import './PoseOverlay.scss';

// Full MediaPipe Pose Landmarker connections (33 landmarks)
const SKELETON_CONNECTIONS: [string, string][] = [
  // Face outline
  ['left_ear', 'left_eye'],
  ['left_eye', 'nose'],
  ['nose', 'right_eye'],
  ['right_eye', 'right_ear'],
  // Torso
  ['left_shoulder', 'right_shoulder'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],
  // Left arm
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['left_wrist', 'left_thumb'],
  ['left_wrist', 'left_index'],
  ['left_wrist', 'left_pinky'],
  // Right arm
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],
  ['right_wrist', 'right_thumb'],
  ['right_wrist', 'right_index'],
  ['right_wrist', 'right_pinky'],
  // Left leg
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['left_ankle', 'left_heel'],
  ['left_ankle', 'left_foot_index'],
  // Right leg
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],
  ['right_ankle', 'right_heel'],
  ['right_ankle', 'right_foot_index'],
];

// Joints to highlight with filled dots (skip low-information face inner points)
const HIGHLIGHTED_JOINTS = new Set([
  'nose',
  'left_shoulder', 'right_shoulder',
  'left_elbow', 'right_elbow',
  'left_wrist', 'right_wrist',
  'left_hip', 'right_hip',
  'left_knee', 'right_knee',
  'left_ankle', 'right_ankle',
]);

// Drawing constants
const SKELETON_LINE_COLOR = 'rgba(59, 130, 246, 0.85)';  // blue primary
const MAJOR_JOINT_COLOR   = 'rgba(239, 68, 68, 0.9)';    // red for key joints
const MINOR_JOINT_COLOR   = 'rgba(148, 163, 184, 0.6)';  // slate for minor landmarks

const MIN_CONFIDENCE = 0.4;

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

    // Skeleton lines
    ctx.strokeStyle = SKELETON_LINE_COLOR;
    ctx.lineWidth = 2;
    SKELETON_CONNECTIONS.forEach(([a, b]) => {
      const kpA = kpMap.get(a);
      const kpB = kpMap.get(b);
      if (!kpA || !kpB) return;
      if (kpA.confidence < MIN_CONFIDENCE || kpB.confidence < MIN_CONFIDENCE) return;
      ctx.beginPath();
      ctx.moveTo(kpA.x * width, kpA.y * height);
      ctx.lineTo(kpB.x * width, kpB.y * height);
      ctx.stroke();
    });

    // Joint dots
    keypoints.forEach(kp => {
      if (kp.confidence < MIN_CONFIDENCE) return;
      const isHighlighted = HIGHLIGHTED_JOINTS.has(kp.name);
      ctx.fillStyle = isHighlighted ? MAJOR_JOINT_COLOR : MINOR_JOINT_COLOR;
      const radius = isHighlighted ? 5 : 3;
      ctx.beginPath();
      ctx.arc(kp.x * width, kp.y * height, radius, 0, Math.PI * 2);
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
