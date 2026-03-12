import { render } from '@testing-library/react';
import { OverlayImage } from './OverlayImage';
import { MantineProvider } from '@mantine/core';

describe('OverlayImage Component', () => {
  it('renders image with given src and opacity', () => {
    const { getByRole } = render(
      <MantineProvider>
        <OverlayImage
          visible={true}
          src="test-image.png"
          opacity={0.5}
          position={{ x: 0, y: 0 }}
          onPositionChange={() => {}}
          scale={1.0}
          rotation={0}
        />
      </MantineProvider>
    );
    const imgElement = getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'test-image.png');
    expect(imgElement).toHaveStyle({ opacity: '0.5' });
  });

  it('does not render when hidden', () => {
    const { queryByRole } = render(
      <MantineProvider>
        <OverlayImage
          visible={false}
          src="test-image.png"
          opacity={0.5}
          position={{ x: 0, y: 0 }}
          onPositionChange={() => {}}
          scale={1.0}
          rotation={0}
        />
      </MantineProvider>
    );
    expect(queryByRole('img')).not.toBeInTheDocument();
  });
});
