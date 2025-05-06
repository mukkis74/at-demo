#!/usr/bin/env node

const { execSync } = require('child_process');
const os = require('os');

console.log('Detecting operating system...');
const platform = os.platform();

try {
  // Check if k6 is already installed
  try {
    execSync('k6 version', { stdio: 'ignore' });
    console.log('\x1b[32m%s\x1b[0m', 'k6 is already installed!');
    console.log('You can now run performance tests with:');
    console.log('\x1b[36m%s\x1b[0m', '  npm run test:performance');
    process.exit(0);
  } catch (error) {
    // k6 is not installed, continue with installation
    console.log('k6 is not installed. Proceeding with installation...');
  }

  // Install k6 based on the platform
  if (platform === 'darwin') {
    // macOS
    console.log('Installing k6 for macOS using Homebrew...');
    console.log('This may take a few minutes...');
    
    // Check if Homebrew is installed
    try {
      execSync('brew --version', { stdio: 'ignore' });
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', 'Error: Homebrew is not installed.');
      console.log('Please install Homebrew first:');
      console.log('\x1b[36m%s\x1b[0m', '  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"');
      console.log('Then run this script again.');
      process.exit(1);
    }
    
    // Install k6 using Homebrew
    execSync('brew install k6', { stdio: 'inherit' });
  } else if (platform === 'win32') {
    // Windows
    console.log('Installing k6 for Windows...');
    console.log('This may take a few minutes...');
    
    // Check if Chocolatey is installed
    try {
      execSync('choco --version', { stdio: 'ignore' });
    } catch (error) {
      console.error('\x1b[31m%s\x1b[0m', 'Error: Chocolatey is not installed.');
      console.log('Please install Chocolatey first:');
      console.log('\x1b[36m%s\x1b[0m', '  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))');
      console.log('Then run this script again.');
      process.exit(1);
    }
    
    // Install k6 using Chocolatey
    execSync('choco install k6 -y', { stdio: 'inherit' });
  } else if (platform === 'linux') {
    // Linux
    console.log('Installing k6 for Linux...');
    console.log('This may take a few minutes...');
    
    // Add k6 repository and install
    execSync(`
      sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69 &&
      echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list &&
      sudo apt-get update &&
      sudo apt-get install k6 -y
    `, { stdio: 'inherit' });
  } else {
    console.error('\x1b[31m%s\x1b[0m', `Error: Unsupported platform: ${platform}`);
    console.log('Please install k6 manually following the instructions at:');
    console.log('\x1b[36m%s\x1b[0m', '  https://k6.io/docs/getting-started/installation/');
    process.exit(1);
  }

  // Verify installation
  try {
    const version = execSync('k6 version').toString().trim();
    console.log('\x1b[32m%s\x1b[0m', `k6 installed successfully! ${version}`);
    console.log('You can now run performance tests with:');
    console.log('\x1b[36m%s\x1b[0m', '  npm run test:performance');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: k6 installation verification failed.');
    console.log('Please try installing k6 manually following the instructions at:');
    console.log('\x1b[36m%s\x1b[0m', '  https://k6.io/docs/getting-started/installation/');
    process.exit(1);
  }
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', `Error during k6 installation: ${error.message}`);
  console.log('Please try installing k6 manually following the instructions at:');
  console.log('\x1b[36m%s\x1b[0m', '  https://k6.io/docs/getting-started/installation/');
  process.exit(1);
}