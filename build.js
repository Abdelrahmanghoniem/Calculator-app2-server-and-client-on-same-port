const pkg = require('pkg');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function buildApp() {
  try {
    console.log('Cleaning directories...');
    await fs.emptyDir(path.join(__dirname, 'backend/public'));
    await fs.emptyDir(path.join(__dirname, 'dist'));

    console.log('Building frontend...');
    execSync('npm run build', {
      cwd: path.join(__dirname, 'frontend'),
      stdio: 'inherit'
    });

    console.log('Creating package configuration...');
    const assets = [
      'backend/public/**/*',
      'backend/package.json'
    ];

    await fs.writeFile(
      path.join(__dirname, 'pkg-config.json'),
      JSON.stringify({ assets })
    );

    console.log('Packaging executable...');
    await pkg.exec([
      'backend/server.js',  // Main entry file
      '--config', 'pkg-config.json',
      '--target', 'node16-win-x64',
      '--output', 'dist/Calculator.exe',
      '--public'
    ]);

    console.log('✅ Success! EXE created in dist/Calculator.exe');
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
}

buildApp();