# DriveWise Icon System

This document explains the icon system used across the DriveWise mobile app and web application.

## Icon Design

The DriveWise icon features:
- **Blue gradient background** (#2563eb to #1d4ed8) representing trust and technology
- **White car silhouette** with metallic gradients for a premium feel
- **Green calculator/chart elements** (#10b981 to #059669) representing TCO optimization
- **Dollar sign** ($) emphasizing cost analysis and financial optimization
- **Optimization arrows** showing the app's goal of improving car buying decisions
- **Glowing headlights** (#fbbf24) adding a modern, dynamic touch

## File Locations

### Mobile App (React Native/Expo)
- **Source SVG**: `DriveWise/assets/icon.svg` (1024x1024)
- **App Icon**: `DriveWise/assets/icon.png` (1024x1024)
- **Adaptive Icon**: `DriveWise/assets/adaptive-icon.png` (1024x1024)
- **Splash Icon**: `DriveWise/assets/splash-icon.png` (1024x1024)
- **Favicon**: `DriveWise/assets/favicon.png` (32x32)

### Web App (Next.js)
- **Favicon SVG**: `webapp/public/favicon.svg` (32x32)
- **Favicon PNG**: `webapp/public/favicon.png` (32x32)

## Configuration

### Mobile App (app.json)
```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash-icon.png",
      "backgroundColor": "#2563eb"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#2563eb"
      }
    }
  }
}
```

### Web App (layout.tsx)
```typescript
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    images: [
      {
        url: '/favicon.svg',
        width: 1024,
        height: 1024,
        alt: 'DriveWise Logo',
      },
    ],
  },
}
```

## Generating PNG Icons

To convert the SVG to PNG format:

### Option 1: Online Tools
1. Visit https://convertio.co/svg-png/
2. Upload `DriveWise/assets/icon.svg`
3. Set output size to 1024x1024
4. Download and save as the required PNG files

### Option 2: Command Line (with Sharp)
```bash
npm install sharp
node -e "
const sharp = require('sharp');
sharp('assets/icon.svg')
  .resize(1024, 1024)
  .png()
  .toFile('assets/icon.png');
"
```

### Option 3: Use the Generation Script
```bash
cd DriveWise
node scripts/generate-icons.js
```

## Icon Sizes Required

| Platform | File | Size | Purpose |
|----------|------|------|---------|
| iOS | icon.png | 1024x1024 | App Store and device icon |
| Android | adaptive-icon.png | 1024x1024 | Adaptive icon foreground |
| Web | favicon.svg | 32x32 | Browser tab icon |
| Web | favicon.png | 32x32 | Fallback favicon |

## Design Principles

1. **Consistency**: Same design across all platforms
2. **Scalability**: SVG source ensures crisp rendering at any size
3. **Brand Recognition**: Car + calculator + dollar sign clearly communicates the app's purpose
4. **Modern Aesthetics**: Gradients, shadows, and glow effects create a premium feel
5. **Accessibility**: High contrast ensures visibility on various backgrounds

## Color Palette

- **Primary Blue**: #2563eb (background gradient start)
- **Secondary Blue**: #1d4ed8 (background gradient end)
- **White**: #ffffff (car body)
- **Green**: #10b981 (chart elements)
- **Dark Green**: #059669 (chart gradient)
- **Yellow**: #fbbf24 (headlights)
- **Dark Gray**: #1e293b (wheels and windows)

## Maintenance

When updating the icon:
1. Modify the source SVG file (`DriveWise/assets/icon.svg`)
2. Regenerate all PNG versions
3. Update both mobile and web configurations
4. Test on different devices and browsers
5. Ensure the icon remains recognizable at small sizes

## Testing Checklist

- [ ] Icon displays correctly on iOS devices
- [ ] Icon displays correctly on Android devices
- [ ] Favicon appears in browser tabs
- [ ] Icon looks good on light and dark backgrounds
- [ ] Icon is recognizable at 16x16 pixels
- [ ] No pixelation at 1024x1024 pixels
- [ ] Colors render correctly across different screens
