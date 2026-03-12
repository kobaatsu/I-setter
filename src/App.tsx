import { useCallback, useState } from 'react';
import { Box, Button, Stack, Text } from '@mantine/core';
import { IconZoomIn, IconZoomOut } from '@tabler/icons-react';
import { CameraView } from './components/CameraView';
import { OverlayImage } from './components/OverlayImage';
import { ControlPanel } from './components/ControlPanel';
import { GridOverlay } from './components/GridOverlay';

function App() {
  const [imageVisible, setImageVisible] = useState(true);
  const [overlayImageSrc, setOverlayImageSrc] = useState<string | null>(null);
  const [opacity, setOpacity] = useState<number>(0.8);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [cameraZoom, setCameraZoom] = useState<number>(1.0);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);

  // Grid states
  const [gridVisible, setGridVisible] = useState(false);
  const [gridOpacity, setGridOpacity] = useState(0.5);
  const [gridSpacing, setGridSpacing] = useState(2); // 1 to 10 scale
  const [gridThickness, setGridThickness] = useState<'sm' | 'md' | 'lg'>('md');
  const [gridBaseColor, setGridBaseColor] = useState('#ffffff');
  const [gridMainColor, setGridMainColor] = useState('#ff0000');
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });

  const handleDevicesFetched = useCallback((devices: MediaDeviceInfo[]) => {
    setCameras(devices);
  }, []);

  const handleZoomChange = (delta: number) => {
    setCameraZoom((prev) => Math.min(Math.max(1.0, prev + delta), 15.0));
  };

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <CameraView
        zoom={cameraZoom}
        deviceId={selectedCameraId}
        onDevicesFetched={handleDevicesFetched}
      />

      <GridOverlay
        visible={gridVisible}
        opacity={gridOpacity}
        spacing={gridSpacing}
        thickness={gridThickness}
        baseColor={gridBaseColor}
        mainColor={gridMainColor}
        offsetX={gridOffset.x}
        offsetY={gridOffset.y}
      />

      {/* 独立したカメラズームUI */}
      <Box
        style={{
          position: 'absolute',
          top: 'env(safe-area-inset-top, 16px)',
          right: '16px',
          zIndex: 30,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
          padding: '8px',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'manipulation',
        }}
      >
        <Stack gap="xs" align="center">
          <Text c="white" size="xs" fw={700}>
            {cameraZoom.toFixed(1)}x
          </Text>
          <Button
            size="compact-md"
            variant="filled"
            color="dark"
            onClick={() => handleZoomChange(0.5)}
          >
            <IconZoomIn size={18} />
          </Button>
          <Button
            size="compact-md"
            variant="filled"
            color="dark"
            onClick={() => handleZoomChange(-0.5)}
          >
            <IconZoomOut size={18} />
          </Button>
        </Stack>
      </Box>
      {overlayImageSrc && (
        <OverlayImage
          visible={imageVisible}
          src={overlayImageSrc}
          opacity={opacity}
          position={position}
          onPositionChange={setPosition}
          scale={scale}
          rotation={rotation}
        />
      )}
      <ControlPanel
        imageVisible={imageVisible}
        onImageVisibleChange={setImageVisible}
        onImageUpload={setOverlayImageSrc}
        opacity={opacity}
        onOpacityChange={setOpacity}
        position={position}
        onPositionChange={setPosition}
        scale={scale}
        onScaleChange={setScale}
        onRotationChange={setRotation}
        cameras={cameras}
        selectedCameraId={selectedCameraId}
        onCameraChange={setSelectedCameraId}
        gridVisible={gridVisible}
        onGridVisibleChange={setGridVisible}
        gridOpacity={gridOpacity}
        onGridOpacityChange={setGridOpacity}
        gridSpacing={gridSpacing}
        onGridSpacingChange={setGridSpacing}
        gridThickness={gridThickness}
        onGridThicknessChange={setGridThickness}
        gridBaseColor={gridBaseColor}
        onGridBaseColorChange={setGridBaseColor}
        gridMainColor={gridMainColor}
        onGridMainColorChange={setGridMainColor}
        gridOffset={gridOffset}
        onGridOffsetChange={setGridOffset}
      />
    </Box>
  );
}

export default App;
