import { useRef } from 'react';
import { Box } from '@mantine/core';

interface OverlayImageProps {
  visible: boolean;
  src: string;
  opacity: number;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
  scale: number;
  rotation: number;
}

export const OverlayImage = ({
  visible,
  src,
  opacity,
  position,
  onPositionChange,
  scale,
  rotation,
}: OverlayImageProps) => {
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  if (!visible) return null;

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    onPositionChange({ x: position.x + dx, y: position.y + dy });
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    dragging.current = false;
  };

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
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
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
          pointerEvents: 'auto',
          touchAction: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
        draggable={false}
      />
    </Box>
  );
};
