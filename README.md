# DriveWise Web App

A professional web application for DriveWise, a smart car recommendation and Total Cost of Ownership (TCO) optimization platform.

## Overview

DriveWise Web App serves as the official website for the DriveWise mobile application, providing users with information about the app's features, support resources, and privacy policies. This web app is designed to complement the mobile app and provide a professional online presence for App Store listings and marketing purposes.

## Features

- **Professional Homepage**: Showcases DriveWise features, benefits, and download links
- **Support Page**: Comprehensive FAQ, contact information, and help resources
- **Privacy Policy**: Detailed privacy information compliant with app store requirements
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design using Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DriveWiseAdmin
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
DriveWiseAdmin/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── support/           # Support page
│   └── privacy/           # Privacy policy page
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Site footer
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## Pages

### Homepage (`/`)
- Hero section with app download links
- Feature showcase
- Statistics and social proof
- Call-to-action sections

### Support (`/support`)
- FAQ section with expandable answers
- Contact options (email, live chat, documentation)
- Additional help resources
- Technical support information

### Privacy (`/privacy`)
- Comprehensive privacy policy
- Data collection and usage information
- User rights and choices
- Contact information for privacy concerns

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`. The primary colors are:
- Primary: Blue shades (`#2563eb` as primary-600)
- Gray: Neutral grays for text and backgrounds

### Content
- Update app store links in the homepage
- Modify contact email addresses in support and privacy pages
- Customize FAQ content in the support page
- Update company information in the footer

### Styling
- All styling is done with Tailwind CSS classes
- Custom styles can be added to `app/globals.css`
- Component-specific styles are included in each component file

## Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Custom domain can be configured in Vercel dashboard

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify
3. Configure build settings in Netlify dashboard

### Other Platforms
The app can be deployed to any static hosting platform by building and serving the static files.

## SEO and Performance

- Optimized meta tags and Open Graph data
- Semantic HTML structure
- Fast loading with Next.js optimizations
- Mobile-first responsive design
- Accessibility considerations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Contact

For questions about this web app, contact the DriveWise development team.

---

**Note**: This web app is designed to complement the DriveWise mobile application and provide a professional online presence for marketing and support purposes.
