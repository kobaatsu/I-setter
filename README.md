# I-setter

A mobile-friendly, web-based AR camera application that lets you overlay images on your camera view, perfect for precise positioning or comparing scenes.

## Features

- **Live Camera Feed**: Accesses the device's camera to display the live feed.
- **Image Overlay**: Upload your custom images (e.g., PNG, JPEG, WebP) to overlay on the camera feed.
- **Precise Image Manipulation**: Easily move, zoom, and rotate the overlaid image using a convenient bottom control panel or direct drag-and-drop on the screen.
- **Opacity Control**: Adjust the transparency of the overlaid image to blend it with the real-world view.
- **Camera Digital Zoom**: Zoom the camera feed from 1x to 3x directly in the app.
- **Mobile First UI**: Built cleanly to work efficiently and responsively on smartphones.

## Local Development

If you want to run this application locally and access the camera from a smartphone via the local network, you will need to start the HTTPS development server.

```bash
# Install dependencies
pnpm install

# Start the dev server with HTTPS (required for camera access on mobile)
pnpm dev:network
```

## Technologies

- React 19
- Vite
- Mantine UI
- TypeScript
- Tabler Icons

## License

MIT License
