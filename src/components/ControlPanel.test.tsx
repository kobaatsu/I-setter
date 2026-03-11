import { render } from '@testing-library/react';
import { ControlPanel } from './ControlPanel';
import { MantineProvider } from '@mantine/core';

describe('ControlPanel Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <MantineProvider>
        <ControlPanel onImageUpload={() => {}} opacity={0.8} onOpacityChange={() => {}} />
      </MantineProvider>
    );
    expect(getByText('オーバーレイ画像')).toBeInTheDocument();
    expect(getByText('透明度')).toBeInTheDocument();
  });
});
