import { render } from '@testing-library/react';
import { ControlPanel } from './ControlPanel';
import { MantineProvider } from '@mantine/core';

describe('ControlPanel Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <MantineProvider>
        <ControlPanel
          onImageUpload={() => {}}
          opacity={0.8}
          onOpacityChange={() => {}}
          position={{ x: 0, y: 0 }}
          onPositionChange={() => {}}
          scale={1.0}
          onScaleChange={() => {}}
          onRotationChange={() => {}}
          cameraZoom={1.0}
          onCameraZoomChange={() => {}}
        />
      </MantineProvider>
    );
    expect(getByText('画像選択')).toBeInTheDocument();
    expect(getByText('画像透明度')).toBeInTheDocument();
  });
});
