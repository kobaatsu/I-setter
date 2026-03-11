import { useState } from 'react';
import { Box } from '@mantine/core';
import { CameraView } from './components/CameraView';
import { OverlayImage } from './components/OverlayImage';
import { ControlPanel } from './components/ControlPanel';
import './App.css';

function App() {
  const [overlayImageSrc, setOverlayImageSrc] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(0.8);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CameraView />
      {overlayImageSrc && (
        <OverlayImage
          src={overlayImageSrc}
          opacity={opacity}
          position={position}
          scale={scale}
          rotation={rotation}
        />
      )}
      <ControlPanel
        onImageUpload={setOverlayImageSrc}
        opacity={opacity}
        onOpacityChange={setOpacity}
        position={position}
        onPositionChange={setPosition}
        scale={scale}
        onScaleChange={setScale}
        rotation={rotation}
        onRotationChange={setRotation}
      />
    </Box>
  );
}

export default App;
