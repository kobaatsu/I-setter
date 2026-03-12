import {
  ActionIcon,
  Box,
  Button,
  ColorSwatch,
  Divider,
  Grid,
  Group,
  SegmentedControl,
  Slider,
  Switch,
  Text,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconMinus,
  IconPlus,
  IconKeyframeAlignCenter,
} from '@tabler/icons-react';
import { PRESET_COLORS } from '../../constants';

interface GridTabProps {
  gridVisible: boolean;
  onGridVisibleChange: (v: boolean) => void;
  gridOpacity: number;
  onGridOpacityChange: (v: number) => void;
  gridSpacing: number;
  onGridSpacingChange: (v: number) => void;
  gridThickness: 'sm' | 'md' | 'lg';
  onGridThicknessChange: (v: 'sm' | 'md' | 'lg') => void;
  gridBaseColor: string;
  onGridBaseColorChange: (v: string) => void;
  gridMainColor: string;
  onGridMainColorChange: (v: string) => void;
  gridOffset: { x: number; y: number };
  onGridOffsetChange: (v: { x: number; y: number }) => void;
}

export const GridTab = ({
  gridVisible,
  onGridVisibleChange,
  gridOpacity,
  onGridOpacityChange,
  gridSpacing,
  onGridSpacingChange,
  gridThickness,
  onGridThicknessChange,
  gridBaseColor,
  onGridBaseColorChange,
  gridMainColor,
  onGridMainColorChange,
  gridOffset,
  onGridOffsetChange,
}: GridTabProps) => {
  const gridOffsetStep = 5;

  const moveUpInterval = useInterval(
    () => onGridOffsetChange({ x: gridOffset.x, y: gridOffset.y - gridOffsetStep }),
    100
  );
  const moveDownInterval = useInterval(
    () => onGridOffsetChange({ x: gridOffset.x, y: gridOffset.y + gridOffsetStep }),
    100
  );
  const moveLeftInterval = useInterval(
    () => onGridOffsetChange({ x: gridOffset.x - gridOffsetStep, y: gridOffset.y }),
    100
  );
  const moveRightInterval = useInterval(
    () => onGridOffsetChange({ x: gridOffset.x + gridOffsetStep, y: gridOffset.y }),
    100
  );

  const handlePointerUp = (dir: 'up' | 'down' | 'left' | 'right') => {
    switch (dir) {
      case 'up':
        moveUpInterval.stop();
        onGridOffsetChange({ x: gridOffset.x, y: gridOffset.y - 1 });
        break;
      case 'down':
        moveDownInterval.stop();
        onGridOffsetChange({ x: gridOffset.x, y: gridOffset.y + 1 });
        break;
      case 'left':
        moveLeftInterval.stop();
        onGridOffsetChange({ x: gridOffset.x - 1, y: gridOffset.y });
        break;
      case 'right':
        moveRightInterval.stop();
        onGridOffsetChange({ x: gridOffset.x + 1, y: gridOffset.y });
        break;
    }
  };

  const handlePointerLeave = () => {
    moveUpInterval.stop();
    moveDownInterval.stop();
    moveLeftInterval.stop();
    moveRightInterval.stop();
  };

  const createMoveProps = (
    dir: 'up' | 'down' | 'left' | 'right',
    intervalObj: ReturnType<typeof useInterval>
  ) => ({
    style: { touchAction: 'manipulation' as const },
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      intervalObj.start();
    },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      handlePointerUp(dir);
    },
    onPointerLeave: handlePointerLeave,
    onPointerCancel: handlePointerLeave,
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  return (
    <Box>
      <Group justify="space-between" mb="xs">
        <Text c="white" size="sm" fw={500}>
          グリッドの表示
        </Text>
        <Switch
          checked={gridVisible}
          onChange={(event) => onGridVisibleChange(event.currentTarget.checked)}
          color="teal"
        />
      </Group>

      <Divider my="sm" color="gray.8" />

      <Box style={{ opacity: gridVisible ? 1 : 0.5, pointerEvents: gridVisible ? 'auto' : 'none' }}>
        <Grid gutter="xs">
          {/* 左カラム: 設定系 */}
          <Grid.Col span={6}>
            {/* 不透明度 */}
            <Box mb="md">
              <Group justify="space-between" mb={4}>
                <Text c="white" size="xs">
                  不透明度
                </Text>
                <Text c="dimmed" size="xs">
                  {Math.round(gridOpacity * 100)}%
                </Text>
              </Group>
              <Slider
                value={gridOpacity}
                onChange={onGridOpacityChange}
                min={0.1}
                max={1.0}
                step={0.05}
                label={null}
              />
            </Box>

            {/* 間隔 (相対値 1-10) */}
            <Box mb="sm">
              <Text c="white" size="xs" mb={4}>
                間隔
              </Text>
              <Group gap="xs" align="center" justify="space-between" wrap="nowrap">
                <ActionIcon
                  size="md"
                  variant="outline"
                  color="gray"
                  onClick={() => onGridSpacingChange(Math.max(1, gridSpacing - 1))}
                  disabled={gridSpacing <= 1}
                >
                  <IconMinus size={16} />
                </ActionIcon>
                <Text c="white" size="sm" style={{ width: '20px', textAlign: 'center' }}>
                  {gridSpacing}
                </Text>
                <ActionIcon
                  size="md"
                  variant="outline"
                  color="gray"
                  onClick={() => onGridSpacingChange(Math.min(10, gridSpacing + 1))}
                  disabled={gridSpacing >= 10}
                >
                  <IconPlus size={16} />
                </ActionIcon>
              </Group>
            </Box>

            {/* 太さ */}
            <Box mb="sm">
              <Text c="white" size="xs" mb={4}>
                太さ
              </Text>
              <SegmentedControl
                fullWidth
                size="xs"
                data={[
                  { label: '小', value: 'sm' },
                  { label: '中', value: 'md' },
                  { label: '大', value: 'lg' },
                ]}
                value={gridThickness}
                onChange={(value) => onGridThicknessChange(value as 'sm' | 'md' | 'lg')}
              />
            </Box>
          </Grid.Col>

          {/* 右カラム: 移動系 */}
          <Grid.Col span={6}>
            {/* 中心線の位置移動 */}
            <Text c="white" size="xs" mb={8} ta="center">
              中心線の移動
            </Text>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '16px',
              }}
            >
              <Button size="xs" variant="light" {...createMoveProps('up', moveUpInterval)}>
                <IconArrowUp size={16} />
              </Button>
              <Group gap="4px">
                <Button size="xs" variant="light" {...createMoveProps('left', moveLeftInterval)}>
                  <IconArrowLeft size={16} />
                </Button>
                <Button size="xs" variant="light" {...createMoveProps('right', moveRightInterval)}>
                  <IconArrowRight size={16} />
                </Button>
              </Group>
              <Button size="xs" variant="light" {...createMoveProps('down', moveDownInterval)}>
                <IconArrowDown size={16} />
              </Button>
            </Box>
            <Group justify="center">
              <Button
                size="compact-xs"
                variant="subtle"
                color="gray"
                onClick={() => onGridOffsetChange({ x: 0, y: 0 })}
                leftSection={<IconKeyframeAlignCenter size={14} />}
              >
                リセット
              </Button>
            </Group>
          </Grid.Col>
        </Grid>

        {/* カラー選択 (下部) */}
        <Box mb="sm" mt="xs">
          <Text c="white" size="xs" mb={4}>
            グリッドの線色
          </Text>
          <Group gap={8}>
            {PRESET_COLORS.map((c) => (
              <ColorSwatch
                key={`base-${c}`}
                color={c}
                size={24}
                radius="md"
                style={{
                  cursor: 'pointer',
                  border: gridBaseColor === c ? '2px solid white' : 'none',
                }}
                onClick={() => onGridBaseColorChange(c)}
              />
            ))}
          </Group>
        </Box>

        <Box mb="xs">
          <Text c="white" size="xs" mb={4}>
            中心線の色
          </Text>
          <Group gap={8}>
            {PRESET_COLORS.map((c) => (
              <ColorSwatch
                key={`main-${c}`}
                color={c}
                size={24}
                radius="md"
                style={{
                  cursor: 'pointer',
                  border: gridMainColor === c ? '2px solid white' : 'none',
                }}
                onClick={() => onGridMainColorChange(c)}
              />
            ))}
          </Group>
        </Box>
      </Box>
    </Box>
  );
};
