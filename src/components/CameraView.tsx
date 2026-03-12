import { useEffect, useRef, useState } from 'react';
import { Box, Text } from '@mantine/core';

interface CameraViewProps {
  zoom?: number;
  deviceId?: string | null;
  onDevicesFetched?: (devices: MediaDeviceInfo[]) => void;
}

export const CameraView = ({ zoom = 1.0, deviceId, onDevicesFetched }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let isActive = true;

    const startCamera = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: 'environment' },
          audio: false,
        };
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (!isActive) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (onDevicesFetched) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoInputs = devices.filter((d) => d.kind === 'videoinput');
          onDevicesFetched(videoInputs);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('カメラへのアクセスに失敗しました。権限を確認してください。');
      }
    };

    startCamera();

    return () => {
      isActive = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [deviceId, onDevicesFetched]);

  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#000',
      }}
    >
      {error && (
        <Text c="red" p="md">
          {error}
        </Text>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
        }}
      />
    </Box>
  );
};
