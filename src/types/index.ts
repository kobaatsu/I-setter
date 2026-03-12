import React from 'react';

export interface ControlPanelProps {
  // Image Props
  imageVisible: boolean;
  onImageVisibleChange: (v: boolean) => void;
  onImageUpload: (src: string | null) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  onRotationChange: React.Dispatch<React.SetStateAction<number>>;

  // Camera Props
  cameras: MediaDeviceInfo[];
  selectedCameraId: string | null;
  onCameraChange: (deviceId: string | null) => void;

  // Grid Props
  gridVisible: boolean;
  onGridVisibleChange: (v: boolean) => void;
  gridOpacity: number;
  onGridOpacityChange: (v: number) => void;
  gridSpacing: number;
  onGridSpacingChange: (v: number) => void;
  gridThickness: 'sm' | 'md' | 'lg';
  onGridThicknessChange: (v: 'sm' | 'md' | 'lg') => void;
  gridBaseColor: string;
  onGridBaseColorChange: (v: string) => void;
  gridMainColor: string;
  onGridMainColorChange: (v: string) => void;
  gridOffset: { x: number; y: number };
  onGridOffsetChange: (v: { x: number; y: number }) => void;
}
