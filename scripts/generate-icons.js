const fs = require('fs');
const path = require('path');

console.log('Icon Generation Script for DriveWise');
console.log('====================================');
console.log('');
console.log('To generate PNG icons from the SVG, you can use:');
console.log('');
console.log('1. Online tools:');
console.log('   - https://convertio.co/svg-png/');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('   - https://www.svgviewer.dev/');
console.log('');
console.log('2. Command line tools:');
console.log('   - Install sharp: npm install sharp');
console.log('   - Install svg2png: npm install svg2png');
console.log('');
console.log('3. Required sizes for mobile apps:');
console.log('   - icon.png: 1024x1024 (main app icon)');
console.log('   - adaptive-icon.png: 1024x1024 (Android adaptive icon)');
console.log('   - splash-icon.png: 1024x1024 (splash screen)');
console.log('   - favicon.png: 32x32 (web favicon)');
console.log('');
console.log('4. The SVG file is located at: DriveWise/assets/icon.svg');
console.log('   Convert this to the required PNG sizes above.');
console.log('');
console.log('5. For web app, the favicon.svg is already created at: webapp/public/favicon.svg');
console.log('');

const svgPath = path.join(__dirname, '../assets/icon.svg');
if (fs.existsSync(svgPath)) {
  console.log('✅ SVG icon found at:', svgPath);
} else {
  console.log('❌ SVG icon not found at:', svgPath);
}

const webFaviconPath = path.join(__dirname, '../webapp/public/favicon.svg');
if (fs.existsSync(webFaviconPath)) {
  console.log('✅ Web favicon found at:', webFaviconPath);
} else {
  console.log('❌ Web favicon not found at:', webFaviconPath);
}
