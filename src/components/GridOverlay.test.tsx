import { render } from '@testing-library/react';
import { GridOverlay } from './GridOverlay';
import { MantineProvider } from '@mantine/core';

describe('GridOverlay Component', () => {
  it('renders correctly when visible', () => {
    const { container } = render(
      <MantineProvider>
        <GridOverlay
          visible={true}
          opacity={0.5}
          spacing={20}
          thickness="md"
          baseColor="#ffffff"
          mainColor="#ff0000"
          offsetX={0}
          offsetY={0}
        />
      </MantineProvider>
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('does not render when hidden', () => {
    const { container } = render(
      <MantineProvider>
        <GridOverlay
          visible={false}
          opacity={0.5}
          spacing={20}
          thickness="md"
          baseColor="#ffffff"
          mainColor="#ff0000"
          offsetX={0}
          offsetY={0}
        />
      </MantineProvider>
    );
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
