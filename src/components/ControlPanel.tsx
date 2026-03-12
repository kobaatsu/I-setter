import {
  Box,
  Button,
  Collapse,
  ColorSwatch,
  Divider,
  FileButton,
  Grid,
  Group,
  NativeSelect,
  SegmentedControl,
  Slider,
  Switch,
  Tabs,
  Text,
} from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconCamera,
  IconChevronDown,
  IconChevronUp,
  IconGridDots,
  IconPhoto,
  IconRotate2,
  IconRotateClockwise,
  IconTrash,
  IconUpload,
  IconZoomIn,
  IconZoomOut,
} from '@tabler/icons-react';
import { useState } from 'react';

interface ControlPanelProps {
  onImageUpload: (src: string | null) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  scale: number;
  onScaleChange: (scale: number) => void;
  onRotationChange: React.Dispatch<React.SetStateAction<number>>;
  cameras: MediaDeviceInfo[];
  selectedCameraId: string | null;
  onCameraChange: (deviceId: string | null) => void;
  // Grid Props
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

const PRESET_COLORS = [
  '#ffffff',
  '#000000',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
];

export const ControlPanel = ({
  onImageUpload,
  opacity,
  onOpacityChange,
  position,
  onPositionChange,
  scale,
  onScaleChange,
  onRotationChange,
  cameras,
  selectedCameraId,
  onCameraChange,
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
}: ControlPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Overlay move
  const moveStep = 10;
  const handleMove = (dx: number, dy: number) => {
    onPositionChange({ x: position.x + dx, y: position.y + dy });
  };

  // Grid offset move
  const gridOffsetStep = 5;
  const handleGridMove = (dx: number, dy: number) => {
    onGridOffsetChange({ x: gridOffset.x + dx, y: gridOffset.y + dy });
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const ObjectUrl = URL.createObjectURL(file);
      onImageUpload(ObjectUrl);
    }
  };

  const handleClearImage = () => {
    onImageUpload(null);
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
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 30px)',
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
          style={{
            maxHeight: '50vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Tabs defaultValue="image" variant="default" color="teal">
            <Tabs.List grow>
              <Tabs.Tab value="image" leftSection={<IconPhoto size={14} />}>
                画像とカメラ
              </Tabs.Tab>
              <Tabs.Tab value="grid" leftSection={<IconGridDots size={14} />}>
                グリッド
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="image" p="md">
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
              <Box mb="sm">
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
              {cameras.length > 0 && (
                <Box mb="xs">
                  <Text c="white" size="xs" mb={4}>
                    <IconCamera size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    使用するカメラ
                  </Text>
                  <NativeSelect
                    size="xs"
                    data={[
                      { value: '', label: 'スマートフォンにおまかせ' },
                      ...cameras.map((c) => ({
                        value: c.deviceId,
                        label: c.label || 'Unknown Camera',
                      })),
                    ]}
                    value={selectedCameraId || ''}
                    onChange={(e) => onCameraChange(e.currentTarget.value || null)}
                  />
                </Box>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="grid" p="md">
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

              <Box
                style={{
                  opacity: gridVisible ? 1 : 0.5,
                  pointerEvents: gridVisible ? 'auto' : 'none',
                }}
              >
                <Grid gutter="md">
                  <Grid.Col span={6}>
                    {/* 不透明度 */}
                    <Box mb="sm">
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

                    {/* 間隔 */}
                    <Box mb="sm">
                      <Group justify="space-between" mb={4}>
                        <Text c="white" size="xs">
                          間隔
                        </Text>
                        <Text c="dimmed" size="xs">
                          {gridSpacing}px
                        </Text>
                      </Group>
                      <Slider
                        value={gridSpacing}
                        onChange={onGridSpacingChange}
                        min={10}
                        max={100}
                        step={5}
                        label={null}
                      />
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

                  <Grid.Col span={6}>
                    {/* 主線(中心)の位置移動 */}
                    <Text c="white" size="xs" mb={8} ta="center">
                      主線（中心）の移動
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
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() => handleGridMove(0, -gridOffsetStep)}
                      >
                        <IconArrowUp size={16} />
                      </Button>
                      <Group gap="4px">
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() => handleGridMove(-gridOffsetStep, 0)}
                        >
                          <IconArrowLeft size={16} />
                        </Button>
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() => handleGridMove(gridOffsetStep, 0)}
                        >
                          <IconArrowRight size={16} />
                        </Button>
                      </Group>
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() => handleGridMove(0, gridOffsetStep)}
                      >
                        <IconArrowDown size={16} />
                      </Button>
                    </Box>
                    <Group justify="center">
                      <Button
                        size="compact-xs"
                        variant="subtle"
                        color="gray"
                        onClick={() => onGridOffsetChange({ x: 0, y: 0 })}
                      >
                        リセット
                      </Button>
                    </Group>
                  </Grid.Col>
                </Grid>

                {/* カラー選択 */}
                <Box mb="sm" mt="md">
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
                    主線（中心線）の色
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
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Collapse>
    </Box>
  );
};
