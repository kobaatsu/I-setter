import { Box } from '@mantine/core';

interface GridOverlayProps {
  visible: boolean;
  opacity: number;
  spacing: number;
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

  // Create a pattern for the 5x5 sub-grid
  const patternSize = spacing * 5;

  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 15, // between Camera (10) and OverlayImage (20) / ControlPanel
        opacity,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Base Grid (1x1) */}
          <pattern
            id="smallGrid"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${offsetX % spacing}, ${offsetY % spacing})`}
          >
            <path
              d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
              fill="none"
              stroke={baseColor}
              strokeWidth={strokeWidth}
              opacity={0.5}
            />
          </pattern>
          {/* Main Grid (5x5) */}
          <pattern
            id="largeGrid"
            width={patternSize}
            height={patternSize}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${offsetX % patternSize}, ${offsetY % patternSize})`}
          >
            <rect width={patternSize} height={patternSize} fill="url(#smallGrid)" />
            <path
              d={`M ${patternSize} 0 L 0 0 0 ${patternSize}`}
              fill="none"
              stroke={baseColor}
              strokeWidth={strokeWidth * 1.5}
              opacity={1}
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#largeGrid)" />

        {/* Main Axes (Center Lines with offset) */}
        <line
          x1="0"
          y1={`calc(50% + ${offsetY}px)`}
          x2="100%"
          y2={`calc(50% + ${offsetY}px)`}
          stroke={mainColor}
          strokeWidth={strokeWidth * 2}
        />
        <line
          x1={`calc(50% + ${offsetX}px)`}
          y1="0"
          x2={`calc(50% + ${offsetX}px)`}
          y2="100%"
          stroke={mainColor}
          strokeWidth={strokeWidth * 2}
        />
      </svg>
    </Box>
  );
};
