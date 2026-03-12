import { Box, NativeSelect, Text } from '@mantine/core';
import { IconCamera } from '@tabler/icons-react';

interface CameraTabProps {
  cameras: MediaDeviceInfo[];
  selectedCameraId: string | null;
  onCameraChange: (deviceId: string | null) => void;
}

export const CameraTab = ({ cameras, selectedCameraId, onCameraChange }: CameraTabProps) => {
  if (cameras.length === 0) {
    return (
      <Text c="dimmed" size="xs">
        カメラの取得に失敗したか、利用可能なカメラが検出されませんでした。
      </Text>
    );
  }

  return (
    <Box mb="xs">
      <Text c="white" size="xs" mb={4}>
        <IconCamera size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
        使用するカメラ
      </Text>
      <NativeSelect
        size="sm"
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
      <Text c="dimmed" size="xs" mt="xs">
        複数のレンズを持つ端末で自動切り替えを防ぎたい場合、特定のカメラを指定できます。
      </Text>
    </Box>
  );
};
