import { Box, Collapse, Group, Tabs, Text } from '@mantine/core';
import {
  IconAdjustmentsHorizontal,
  IconCamera,
  IconChevronDown,
  IconChevronUp,
  IconGridDots,
  IconPhoto,
} from '@tabler/icons-react';
import { useState } from 'react';
import type { ControlPanelProps } from '../types';
import { CameraTab } from './ControlPanelTabs/CameraTab';
import { GridTab } from './ControlPanelTabs/GridTab';
import { ImageTab } from './ControlPanelTabs/ImageTab';

export const ControlPanel = (props: ControlPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

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
        <Group>
          <IconAdjustmentsHorizontal color="white" size={18} />
          <Text c="white" size="sm" fw={700}>
            設定
          </Text>
        </Group>
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
          <Tabs variant="pills" defaultValue="image" color="dark">
            <Tabs.List grow p="xs">
              <Tabs.Tab value="image" c="white" leftSection={<IconPhoto size={14} />}>
                画像設定
              </Tabs.Tab>
              <Tabs.Tab value="grid" c="white" leftSection={<IconGridDots size={14} />}>
                グリッド
              </Tabs.Tab>
              <Tabs.Tab value="camera" c="white" leftSection={<IconCamera size={14} />}>
                カメラ設定
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="image" p="md">
              <ImageTab
                imageVisible={props.imageVisible}
                onImageVisibleChange={props.onImageVisibleChange}
                onImageUpload={props.onImageUpload}
                opacity={props.opacity}
                onOpacityChange={props.onOpacityChange}
                position={props.position}
                onPositionChange={props.onPositionChange}
                scale={props.scale}
                onScaleChange={props.onScaleChange}
                onRotationChange={props.onRotationChange}
              />
            </Tabs.Panel>
            <Tabs.Panel value="grid" p="md">
              <GridTab
                gridVisible={props.gridVisible}
                onGridVisibleChange={props.onGridVisibleChange}
                gridOpacity={props.gridOpacity}
                onGridOpacityChange={props.onGridOpacityChange}
                gridSpacing={props.gridSpacing}
                onGridSpacingChange={props.onGridSpacingChange}
                gridThickness={props.gridThickness}
                onGridThicknessChange={props.onGridThicknessChange}
                gridBaseColor={props.gridBaseColor}
                onGridBaseColorChange={props.onGridBaseColorChange}
                gridMainColor={props.gridMainColor}
                onGridMainColorChange={props.onGridMainColorChange}
                gridOffset={props.gridOffset}
                onGridOffsetChange={props.onGridOffsetChange}
              />
            </Tabs.Panel>
            <Tabs.Panel value="camera" p="md">
              <CameraTab
                cameras={props.cameras}
                selectedCameraId={props.selectedCameraId}
                onCameraChange={props.onCameraChange}
              />
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Collapse>
    </Box>
  );
};
