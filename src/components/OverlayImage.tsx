import { useRef } from 'react';
import { Box } from '@mantine/core';
import Moveable from 'react-moveable';

interface OverlayImageProps {
  src: string;
  opacity: number;
}

export const OverlayImage = ({ src, opacity }: OverlayImageProps) => {
  const targetRef = useRef<HTMLImageElement>(null);

  // 初期の配置は translate(0px, 0px) として扱い、中心等にオフセットで配置する
  // 今回は親Box内で絶対配置させ、Moveableで自由に動かせるようにする。
  return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Box自体は触れないようにする
        zIndex: 10,
      }}
    >
      <img
        ref={targetRef}
        src={src}
        alt="overlay"
        style={{
          position: 'absolute',
          top: '30%',
          left: '30%',
          width: '200px', // デフォルトサイズ
          opacity,
          pointerEvents: 'auto', // 画像自体は触れるようにする
          transformOrigin: '50% 50%',
        }}
        // react-moveable 用に user-select none などを付与するとよい
        draggable={false}
      />

      <Moveable
        target={targetRef}
        draggable={true}
        scalable={true}
        rotatable={true}
        keepRatio={true} // アスペクト比を維持
        renderDirections={['nw', 'ne', 'sw', 'se']}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
        }}
        onScale={(e) => {
          e.target.style.transform = e.drag.transform;
        }}
        onRotate={(e) => {
          e.target.style.transform = e.drag.transform;
        }}
      />
    </Box>
  );
};
