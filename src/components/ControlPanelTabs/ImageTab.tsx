import { Box, Button, Group, FileButton, Divider, Grid, Slider, Text, Switch } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconRotate,
  IconRotateClockwise,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import React from 'react';

interface ImageTabProps {
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
}

export const ImageTab = ({
  imageVisible,
  onImageVisibleChange,
  onImageUpload,
  opacity,
  onOpacityChange,
  position,
  onPositionChange,
  scale,
  onScaleChange,
  onRotationChange,
}: ImageTabProps) => {
  const moveStep = 10;
  const handleMove = (dx: number, dy: number) => {
    onPositionChange({ x: position.x + dx, y: position.y + dy });
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      onImageUpload(objectUrl);
    }
  };

  const rotateClockwiseInterval = useInterval(() => onRotationChange((r) => r + 5), 100);
  const rotateCounterClockwiseInterval = useInterval(() => onRotationChange((r) => r - 5), 100);

  const handleRotatePointerUp = (dir: 'cw' | 'ccw') => {
    if (dir === 'cw') {
      rotateClockwiseInterval.stop();
      onRotationChange((r) => r + 1);
    } else {
      rotateCounterClockwiseInterval.stop();
      onRotationChange((r) => r - 1);
    }
  };

  const handleRotatePointerLeave = () => {
    rotateClockwiseInterval.stop();
    rotateCounterClockwiseInterval.stop();
  };

  return (
    <Box>
      <Group justify="space-between" mb="xs">
        <Text c="white" size="sm" fw={500}>
          画像の表示
        </Text>
        <Switch
          checked={imageVisible}
          onChange={(event) => onImageVisibleChange(event.currentTarget.checked)}
          color="teal"
        />
      </Group>

      <Divider my="sm" color="gray.8" />

      <Box
        style={{ opacity: imageVisible ? 1 : 0.5, pointerEvents: imageVisible ? 'auto' : 'none' }}
      >
        {/* 画像アップロード・クリア */}
        <Group mb="sm" justify="center">
          <FileButton onChange={handleFileChange} accept="image/png,image/jpeg,image/webp">
            {(props) => (
              <Button
                {...props}
                size="xs"
                variant="filled"
                color="blue"
                leftSection={<IconUpload size={14} />}
              >
                画像選択
              </Button>
            )}
          </FileButton>
          <Button
            size="xs"
            variant="outline"
            color="red"
            onClick={() => onImageUpload(null)}
            leftSection={<IconTrash size={14} />}
          >
            クリア
          </Button>
        </Group>

        <Grid gutter="xs" align="start">
          {/* 左カラム: 設定系 */}
          <Grid.Col span={6}>
            {/* 不透明度 */}
            <Box mb="md">
              <Group justify="space-between" mb={4}>
                <Text c="white" size="xs">
                  不透明度
                </Text>
                <Text c="dimmed" size="xs">
                  {Math.round(opacity * 100)}%
                </Text>
              </Group>
              <Slider
                value={opacity}
                onChange={onOpacityChange}
                min={0.1}
                max={1.0}
                step={0.05}
                label={null}
              />
            </Box>

            {/* サイズ */}
            <Box mb="sm">
              <Text c="white" size="xs" mb={4}>
                サイズ
              </Text>
              <Group grow gap="xs">
                <Button
                  size="xs"
                  variant="outline"
                  color="gray"
                  onClick={() => onScaleChange(Math.max(0.1, scale - 0.1))}
                >
                  <IconArrowsMinimize size={16} />
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  color="gray"
                  onClick={() => onScaleChange(scale + 0.1)}
                >
                  <IconArrowsMaximize size={16} />
                </Button>
              </Group>
            </Box>

            {/* 回転 */}
            <Box>
              <Text c="white" size="xs" mb={4}>
                回転
              </Text>
              <Group grow gap="xs">
                <Button
                  size="xs"
                  variant="outline"
                  color="gray"
                  style={{ touchAction: 'manipulation' }}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    rotateCounterClockwiseInterval.start();
                  }}
                  onPointerUp={(e) => {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                    handleRotatePointerUp('ccw');
                  }}
                  onPointerLeave={handleRotatePointerLeave}
                  onPointerCancel={handleRotatePointerLeave}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <IconRotate size={16} />
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  color="gray"
                  style={{ touchAction: 'manipulation' }}
                  onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    rotateClockwiseInterval.start();
                  }}
                  onPointerUp={(e) => {
                    e.currentTarget.releasePointerCapture(e.pointerId);
                    handleRotatePointerUp('cw');
                  }}
                  onPointerLeave={handleRotatePointerLeave}
                  onPointerCancel={handleRotatePointerLeave}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <IconRotateClockwise size={16} />
                </Button>
              </Group>
            </Box>
          </Grid.Col>

          {/* 右カラム: 移動系 */}
          <Grid.Col span={6}>
            <Text c="white" size="xs" mb={8} ta="center">
              移動
            </Text>
            <Box
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
              <Button size="xs" variant="light" onClick={() => handleMove(0, -moveStep)}>
                <IconArrowUp size={16} />
              </Button>
              <Group gap="4px">
                <Button size="xs" variant="light" onClick={() => handleMove(-moveStep, 0)}>
                  <IconArrowLeft size={16} />
                </Button>
                <Button size="xs" variant="light" onClick={() => handleMove(moveStep, 0)}>
                  <IconArrowRight size={16} />
                </Button>
              </Group>
              <Button size="xs" variant="light" onClick={() => handleMove(0, moveStep)}>
                <IconArrowDown size={16} />
              </Button>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};
