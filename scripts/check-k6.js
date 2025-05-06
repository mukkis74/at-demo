#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Checking if k6 is installed...');

try {
  // Try to execute k6 version command
  execSync('k6 version', { stdio: 'ignore' });
  console.log('k6 is installed. Proceeding with performance tests.');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: k6 is not installed or not in PATH.');
  console.log('\nTo run performance tests, you need to install k6 first.');
  console.log('\nYou can install k6 using one of the following methods:');
  console.log('\n1. Run the following command:');
  console.log('\x1b[36m%s\x1b[0m', '   npm run install:k6');
  console.log('\n2. Or install manually following the instructions in the README.md:');
  console.log('\x1b[36m%s\x1b[0m', '   # For macOS');
  console.log('\x1b[36m%s\x1b[0m', '   brew install k6');
  console.log('\x1b[36m%s\x1b[0m', '   # For Windows (using Chocolatey)');
  console.log('\x1b[36m%s\x1b[0m', '   choco install k6');
  console.log('\x1b[36m%s\x1b[0m', '   # For Linux');
  console.log('\x1b[36m%s\x1b[0m', '   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69');
  console.log('\x1b[36m%s\x1b[0m', '   echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list');
  console.log('\x1b[36m%s\x1b[0m', '   sudo apt-get update');
  console.log('\x1b[36m%s\x1b[0m', '   sudo apt-get install k6');
  console.log('\nFor more information, visit: https://k6.io/docs/getting-started/installation/');
  
  // Exit with error code to prevent the performance tests from running
  process.exit(1);
}