import { render } from '@testing-library/react';
import { CameraView } from './CameraView';
import { MantineProvider } from '@mantine/core';

describe('CameraView Component', () => {
  it('renders video element', () => {
    const { container } = render(
      <MantineProvider>
        <CameraView />
      </MantineProvider>
    );
    expect(container.querySelector('video')).toBeInTheDocument();
  });
});
