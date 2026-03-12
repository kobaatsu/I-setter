import { Box } from '@mantine/core';

interface GridOverlayProps {
  visible: boolean;
  opacity: number;
  spacing: number; // 1 to 10
  thickness: 'sm' | 'md' | 'lg';
  baseColor: string;
  mainColor: string;
  offsetX: number;
  offsetY: number;
}

const getStrokeWidth = (thickness: 'sm' | 'md' | 'lg') => {
  switch (thickness) {
    case 'sm':
      return 0.5;
    case 'md':
      return 1;
    case 'lg':
      return 2;
    default:
      return 1;
  }
};

export const GridOverlay = ({
  visible,
  opacity,
  spacing,
  thickness,
  baseColor,
  mainColor,
  offsetX,
  offsetY,
}: GridOverlayProps) => {
  if (!visible) return null;

  const strokeWidth = getStrokeWidth(thickness);

  // 外部からの spacing は 1〜10。 ピクセル単位への変換（1=5px）で最小 5px 〜 最大 50px
  const actualSpacing = spacing * 5;
  const largeSpacing = actualSpacing * 5;
  const largeStroke = strokeWidth * 1.5;

  return (
    <Box
      data-testid="grid-overlay"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 15,
        opacity,
      }}
    >
      {/* Pattern Background */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.5,
          backgroundImage: `
            linear-gradient(${baseColor} ${largeStroke}px, transparent ${largeStroke}px),
            linear-gradient(90deg, ${baseColor} ${largeStroke}px, transparent ${largeStroke}px),
            linear-gradient(${baseColor} ${strokeWidth}px, transparent ${strokeWidth}px),
            linear-gradient(90deg, ${baseColor} ${strokeWidth}px, transparent ${strokeWidth}px)
          `,
          backgroundSize: `${largeSpacing}px ${largeSpacing}px, ${largeSpacing}px ${largeSpacing}px, ${actualSpacing}px ${actualSpacing}px, ${actualSpacing}px ${actualSpacing}px`,
          backgroundPosition: `
            calc(50% + ${offsetX}px - ${largeStroke / 2}px) calc(50% + ${offsetY}px - ${largeStroke / 2}px),
            calc(50% + ${offsetX}px - ${largeStroke / 2}px) calc(50% + ${offsetY}px - ${largeStroke / 2}px),
            calc(50% + ${offsetX}px - ${strokeWidth / 2}px) calc(50% + ${offsetY}px - ${strokeWidth / 2}px),
            calc(50% + ${offsetX}px - ${strokeWidth / 2}px) calc(50% + ${offsetY}px - ${strokeWidth / 2}px)
          `,
        }}
      />

      {/* Main Axes (Center Lines with offset) */}
      <Box
        style={{
          position: 'absolute',
          top: `calc(50% + ${offsetY}px - ${strokeWidth}px)`,
          left: 0,
          width: '100%',
          height: `${strokeWidth * 2}px`,
          backgroundColor: mainColor,
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: `calc(50% + ${offsetX}px - ${strokeWidth}px)`,
          width: `${strokeWidth * 2}px`,
          height: '100%',
          backgroundColor: mainColor,
        }}
      />
    </Box>
  );
};
