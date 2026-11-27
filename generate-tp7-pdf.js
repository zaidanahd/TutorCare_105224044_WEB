/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const tempDir = path.resolve(process.env.TEMP || 'C:\\Temp', 'edge_tp7_' + Date.now());
const htmlPath = path.resolve(__dirname, 'docs/praktikum/tugas-pendahuluan-07.html');
const pdfPath = path.resolve(__dirname, 'docs/praktikum/tugas-pendahuluan-07.pdf');
const desktopPath = 'C:\\Users\\Ahmad Zaidan\\OneDrive\\Desktop\\Tugas-Pendahuluan-Modul-07-Ahmad-Zaidan-105224044.pdf';

try {
  execSync(
    `"${edgePath}" --headless=new --disable-gpu --disable-background-networking --disable-extensions --no-pdf-header-footer --user-data-dir="${tempDir}" --print-to-pdf="${pdfPath}" "${htmlPath}"`,
    { stdio: 'inherit' }
  );
  console.log('PDF generated at:', pdfPath);
  fs.copyFileSync(pdfPath, desktopPath);
  console.log('PDF copied to Desktop:', desktopPath);
  console.log('Size:', fs.statSync(pdfPath).size, 'bytes');
} catch (e) {
  console.error('Error:', e);
}
