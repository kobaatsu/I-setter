import { useState } from 'react';
import { Box } from '@mantine/core';
import { CameraView } from './components/CameraView';
import { OverlayImage } from './components/OverlayImage';
import { ControlPanel } from './components/ControlPanel';
import './App.css';

function App() {
  const [overlayImageSrc, setOverlayImageSrc] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(0.8);

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <CameraView />
      {overlayImageSrc && <OverlayImage src={overlayImageSrc} opacity={opacity} />}
      <ControlPanel
        onImageUpload={setOverlayImageSrc}
        opacity={opacity}
        onOpacityChange={setOpacity}
      />
    </Box>
  );
}

export default App;
