import { Box, FileInput, Slider, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

interface ControlPanelProps {
  onImageUpload: (src: string | null) => void;
  opacity: number;
  onOpacityChange: (value: number) => void;
}

export const ControlPanel = ({ onImageUpload, opacity, onOpacityChange }: ControlPanelProps) => {
  const handleFileChange = (file: File | null) => {
    if (file) {
      const ObjectUrl = URL.createObjectURL(file);
      onImageUpload(ObjectUrl);
    } else {
      onImageUpload(null);
    }
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
      }}
    >
      <FileInput
        accept="image/png,image/jpeg,image/webp"
        label={
          <Text c="white" size="sm" mb={4}>
            オーバーレイ画像
          </Text>
        }
        placeholder="ここをタップしてアップロード"
        icon={<IconUpload size={14} />}
        onChange={handleFileChange}
        clearable
        mb="md"
      />
      <Box>
        <Text c="white" size="sm" mb={4}>
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
    </Box>
  );
};
