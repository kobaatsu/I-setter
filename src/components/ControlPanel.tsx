import { Box, FileInput, Slider, Text, Grid, Button, Group } from '@mantine/core';
import {
  IconUpload,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconRotateClockwise,
  IconRotate2,
  IconZoomIn,
  IconZoomOut,
} from '@tabler/icons-react';

interface ControlPanelProps {
  onImageUpload: (src: string | null) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  rotation: number;
  onRotationChange: (rot: number) => void;
}

export const ControlPanel = ({
  onImageUpload,
  opacity,
  onOpacityChange,
  position,
  onPositionChange,
  scale,
  onScaleChange,
  rotation,
  onRotationChange,
}: ControlPanelProps) => {
  const handleFileChange = (file: File | null) => {
    if (file) {
      const ObjectUrl = URL.createObjectURL(file);
      onImageUpload(ObjectUrl);
    } else {
      onImageUpload(null);
    }
  };

  const moveStep = 10;
  const handleMove = (dx: number, dy: number) => {
    onPositionChange({ x: position.x + dx, y: position.y + dy });
  };

  return (
    <Box
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 20,
        borderTopRadius: '16px',
        maxHeight: '40vh',
        overflowY: 'auto',
      }}
    >
      <FileInput
        accept="image/png,image/jpeg,image/webp"
        label={
          <Text c="white" size="xs" mb={4}>
            画像
          </Text>
        }
        placeholder="ここをタップしてアップロード"
        leftSection={<IconUpload size={14} />}
        onChange={handleFileChange}
        clearable
        mb="xs"
      />

      <Grid gutter="xs" align="center">
        {/* 移動 */}
        <Grid.Col span={6}>
          <Text c="white" size="xs" mb={4} ta="center">
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

        <Grid.Col span={6}>
          {/* サイズ */}
          <Box mb="xs">
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
                <IconZoomOut size={16} />
              </Button>
              <Button
                size="xs"
                variant="outline"
                color="gray"
                onClick={() => onScaleChange(scale + 0.1)}
              >
                <IconZoomIn size={16} />
              </Button>
            </Group>
          </Box>
          {/* 回転 */}
          <Box mb="xs">
            <Text c="white" size="xs" mb={4}>
              回転
            </Text>
            <Group grow gap="xs">
              <Button
                size="xs"
                variant="outline"
                color="gray"
                onClick={() => onRotationChange(rotation - 5)}
              >
                <IconRotate2 size={16} />
              </Button>
              <Button
                size="xs"
                variant="outline"
                color="gray"
                onClick={() => onRotationChange(rotation + 5)}
              >
                <IconRotateClockwise size={16} />
              </Button>
            </Group>
          </Box>
          {/* 透明度 */}
          <Box>
            <Text c="white" size="xs" mb={0}>
              透明度
            </Text>
            <Slider
              value={opacity}
              onChange={onOpacityChange}
              min={0.1}
              max={1.0}
              step={0.05}
              label={(val) => `${Math.round(val * 100)}%`}
            />
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
