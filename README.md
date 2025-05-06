# Test Automation Framework

A complete test automation framework using JavaScript/TypeScript with Playwright for browser testing. This framework supports multiple types of testing including unit, API, smoke, regression, E2E, and performance testing.

## Features

- **Multiple Test Types**: Unit, API, Smoke, Regression, E2E, and Performance tests
- **Playwright Integration**: For browser-based testing across Chromium, Firefox, and WebKit
- **Page Object Model**: For maintainable and reusable UI test components
- **Allure Reporting**: For comprehensive test reporting and visualization
- **K6 Integration**: For performance and load testing
- **GitHub Actions**: CI/CD pipeline for automated test execution
- **TypeScript Support**: For type safety and better developer experience

## Project Structure

```
├── .github/workflows      # GitHub Actions workflow configurations
├── config                 # Configuration files
├── src                    # Source code
│   ├── api                # API clients and utilities
│   ├── pages              # Page Object Models
│   └── utils              # Utility functions
├── tests                  # Test files
│   ├── api                # API tests
│   ├── e2e                # End-to-end tests
│   ├── performance        # Performance tests
│   ├── regression         # Regression tests
│   ├── smoke              # Smoke tests
│   └── unit               # Unit tests
├── allure-results         # Allure test results (generated)
├── allure-report          # Allure HTML report (generated)
├── test-results           # Playwright test results (generated)
├── package.json           # Project dependencies and scripts
├── playwright.config.ts   # Playwright configuration
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/test-automation-framework.git
   cd test-automation-framework
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

4. Install K6 for performance testing:
   ```bash
   # Automatic installation (recommended)
   npm run install:k6

   # Or manual installation
   # For macOS
   brew install k6

   # For Windows (using Chocolatey)
   choco install k6

   # For Linux
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
   echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
   sudo apt-get update
   sudo apt-get install k6
   ```

   > Note: If k6 is not installed, the performance tests will automatically detect this and provide installation instructions.

### Running Tests

#### Running All Tests

```bash
npm test
```

#### Running Specific Test Types

```bash
# Unit tests
npm run test:unit

# API tests
npm run test:api

# Smoke tests
npm run test:smoke

# Regression tests
npm run test:regression

# E2E tests
npm run test:e2e

# Performance tests
npm run test:performance
```

#### Generating Reports

```bash
npm run report
```

This will generate an Allure report and open it in your default browser.

## Writing Tests

### Unit Tests

Unit tests are written using Jest and located in the `tests/unit` directory.

Example:
```typescript
import { add } from '../../src/utils/calculator';

test('should add two numbers correctly', () => {
  expect(add(2, 3)).toBe(5);
});
```

### API Tests

API tests use Jest with our custom API client and are located in the `tests/api` directory.

Example:
```typescript
import { ApiClient } from '../../src/api/apiClient';

const apiClient = new ApiClient('https://api.example.com');

test('should get user data', async () => {
  const user = await apiClient.get('/users/1');
  expect(user.id).toBe(1);
});
```

### E2E Tests

E2E tests use Playwright and the Page Object Model pattern. They are located in the `tests/e2e` directory.

Example:
```typescript
import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('username', 'password');
  await loginPage.expectSuccessfulLogin('/dashboard');
});
```

### Performance Tests

Performance tests use K6 and are located in the `tests/performance` directory.

Example:
```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const res = http.get('https://api.example.com/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
```

## CI/CD Integration

This framework includes GitHub Actions workflows for continuous integration. The workflow:

1. Runs on pushes to main/master and on pull requests
2. Installs dependencies and Playwright browsers
3. Runs all test types in sequence
4. Generates and publishes Allure reports
5. Uploads test artifacts

## Extending the Framework

### Adding New Page Objects

1. Create a new file in `src/pages` directory
2. Implement the page object using Playwright's Page and Locator APIs
3. Export the page object class

### Adding New Tests

1. Create a new test file in the appropriate test directory
2. Import the necessary page objects or utilities
3. Write your test using the appropriate testing framework (Jest or Playwright)
4. Add tags for categorization (@smoke, @regression, @e2e)

## Best Practices

- Use the Page Object Model for UI tests
- Keep tests independent and isolated
- Use descriptive test and function names
- Add appropriate tags to tests for categorization
- Write tests that are resilient to minor UI changes
- Use explicit waits instead of timeouts

## License

This project is licensed under the MIT License - see the LICENSE file for details.
