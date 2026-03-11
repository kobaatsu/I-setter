import { render } from '@testing-library/react';
import App from './App';
import { MantineProvider } from '@mantine/core';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    expect(container.querySelector('video')).toBeInTheDocument(); // App 内の CameraView の存在をチェック
  });
});
