import { Box } from '@mantine/core';

interface OverlayImageProps {
  src: string;
  opacity: number;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export const OverlayImage = ({ src, opacity, position, scale, rotation }: OverlayImageProps) => {
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <img
        src={src}
        alt="overlay"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity,
          transformOrigin: 'center center',
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale}) rotate(${rotation}deg)`,
          maxWidth: '80vw',
          maxHeight: '80vh',
          objectFit: 'contain',
        }}
        draggable={false}
      />
    </Box>
  );
};
