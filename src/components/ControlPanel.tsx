import { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Divider,
  FileButton,
  Grid,
  Group,
  Slider,
  Text,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconCamera,
  IconRotate2,
  IconRotateClockwise,
  IconUpload,
  IconZoomIn,
  IconZoomOut,
  IconChevronDown,
  IconChevronUp,
  IconTrash,
} from '@tabler/icons-react';

interface ControlPanelProps {
  onImageUpload: (src: string | null) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  onRotationChange: React.Dispatch<React.SetStateAction<number>>;
  cameraZoom: number;
  onCameraZoomChange: (zoom: number) => void;
}

export const ControlPanel = ({
  onImageUpload,
  opacity,
  onOpacityChange,
  position,
  onPositionChange,
  scale,
  onScaleChange,
  onRotationChange,
  cameraZoom,
  onCameraZoomChange,
}: ControlPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const ObjectUrl = URL.createObjectURL(file);
      onImageUpload(ObjectUrl);
    }
  };

  const handleClearImage = () => {
    onImageUpload(null);
  };

  const moveStep = 10;
  const handleMove = (dx: number, dy: number) => {
    onPositionChange({ x: position.x + dx, y: position.y + dy });
  };

  const rotateClockwiseInterval = useInterval(() => onRotationChange((r) => r + 5), 500);
  const rotateCounterClockwiseInterval = useInterval(() => onRotationChange((r) => r - 5), 500);

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
    <Box
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 20,
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <Group
        justify="space-between"
        p="sm"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <Text c="white" size="sm" fw={700}>
          操作パネル
        </Text>
        {isOpen ? <IconChevronDown color="white" /> : <IconChevronUp color="white" />}
      </Group>

      <Collapse in={isOpen}>
        <Box
          p="md"
          pt={0}
          style={{
            maxHeight: '50vh',
            overflowY: 'auto',
          }}
        >
          {/* 画像アップロード・クリア */}
          <Group mb="xs">
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
              onClick={handleClearImage}
              leftSection={<IconTrash size={14} />}
            >
              クリア
            </Button>
          </Group>

          <Divider
            my="xs"
            label={
              <Text c="gray.5" size="xs">
                画像の操作
              </Text>
            }
            labelPosition="center"
            color="gray.8"
          />

          {/* 画像操作エリア */}
          <Grid gutter="xs" align="center" mb="sm">
            {/* 移動 */}
            <Grid.Col span={6}>
              <Text c="white" size="xs" mb={8} ta="center">
                移動
              </Text>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
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

            {/* サイズと回転 */}
            <Grid.Col span={6}>
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
                    <IconRotate2 size={16} />
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
          </Grid>

          {/* 画像 透明度 */}
          <Box mb="sm" px="md">
            <Group justify="space-between" mb={4}>
              <Text c="white" size="xs">
                画像透明度
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

          <Divider
            my="xs"
            label={
              <Text c="gray.5" size="xs">
                カメラの操作
              </Text>
            }
            labelPosition="center"
            color="gray.8"
          />

          {/* カメラの操作エリア */}
          <Box pb="xs" px="md">
            <Group justify="space-between" mb={4}>
              <Text c="white" size="xs">
                <IconCamera size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                カメラズーム
              </Text>
              <Text c="dimmed" size="xs">
                {cameraZoom.toFixed(1)}x
              </Text>
            </Group>
            <Slider
              color="teal"
              value={cameraZoom}
              onChange={onCameraZoomChange}
              min={1.0}
              max={3.0}
              step={0.1}
              label={null}
            />
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
