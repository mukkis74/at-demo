import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter, Rate, Trend } from 'k6/metrics';
import { options } from '../../config/k6.config.js';

// Custom metrics
const errorRate = new Rate('error_rate');
const successRate = new Rate('success_rate');
const requestDuration = new Trend('request_duration');
const requestsPerSecond = new Counter('requests_per_second');

// Base URL for API
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Setup function (runs once per VU)
export function setup() {
  console.log('Setting up performance test');
  // You could create test data here if needed
  return {
    userId: 1,
    postId: 1
  };
}

// Default function (runs for each VU)
export default function(data) {
  // Track request start time
  const startTime = new Date();
  
  // GET request to fetch users
  const usersResponse = http.get(`${BASE_URL}/users`);
  
  // Check if request was successful
  const usersSuccess = check(usersResponse, {
    'users status is 200': (r) => r.status === 200,
    'users response has data': (r) => r.json().length > 0,
  });
  
  // Record metrics
  successRate.add(usersSuccess);
  errorRate.add(!usersSuccess);
  requestDuration.add(new Date() - startTime);
  requestsPerSecond.add(1);
  
  // Add a small delay between requests
  sleep(1);
  
  // GET request to fetch posts for a specific user
  const postsResponse = http.get(`${BASE_URL}/users/${data.userId}/posts`);
  
  // Check if request was successful
  const postsSuccess = check(postsResponse, {
    'posts status is 200': (r) => r.status === 200,
    'posts response has data': (r) => r.json().length > 0,
  });
  
  // Record metrics
  successRate.add(postsSuccess);
  errorRate.add(!postsSuccess);
  requestDuration.add(new Date() - startTime);
  requestsPerSecond.add(1);
  
  // Add a small delay between requests
  sleep(1);
  
  // POST request to create a new post
  const payload = JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: data.userId,
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const createResponse = http.post(`${BASE_URL}/posts`, payload, params);
  
  // Check if request was successful
  const createSuccess = check(createResponse, {
    'create status is 201': (r) => r.status === 201,
    'create response has id': (r) => r.json().id !== undefined,
  });
  
  // Record metrics
  successRate.add(createSuccess);
  errorRate.add(!createSuccess);
  requestDuration.add(new Date() - startTime);
  requestsPerSecond.add(1);
  
  // Add a small delay between requests
  sleep(1);
}

// Teardown function (runs once per test)
export function teardown(data) {
  console.log('Tearing down performance test');
  // You could clean up test data here if needed
}