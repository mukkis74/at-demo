import { ApiClient } from '../../src/api/apiClient';

// Interface for User data structure
interface User {
  id: number;
  name: string;
  email: string;
}

// Create API client for testing
const apiClient = new ApiClient('https://jsonplaceholder.typicode.com');

describe('User API Tests', () => {
  // Test for getting all users
  test('should get all users', async () => {
    // Act
    const users = await apiClient.get<User[]>('/users');
    
    // Assert
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  // Test for getting a specific user
  test('should get user by ID', async () => {
    // Arrange
    const userId = 1;
    
    // Act
    const user = await apiClient.get<User>(`/users/${userId}`);
    
    // Assert
    expect(user).toBeDefined();
    expect(user.id).toBe(userId);
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();
  });

  // Test for creating a new user
  test('should create a new user', async () => {
    // Arrange
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
    };
    
    // Act
    const createdUser = await apiClient.post<User>('/users', newUser);
    
    // Assert
    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBeDefined();
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.email).toBe(newUser.email);
  });

  // Test for updating a user
  test('should update an existing user', async () => {
    // Arrange
    const userId = 1;
    const updatedData = {
      name: 'Updated User',
    };
    
    // Act
    const updatedUser = await apiClient.put<User>(`/users/${userId}`, updatedData);
    
    // Assert
    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(userId);
    expect(updatedUser.name).toBe(updatedData.name);
  });

  // Test for deleting a user
  test('should delete a user', async () => {
    // Arrange
    const userId = 1;
    
    // Act & Assert
    await expect(apiClient.delete<{}>(`/users/${userId}`)).resolves.not.toThrow();
  });

  // Test for handling errors
  test('should handle 404 error when user not found', async () => {
    // Arrange
    const nonExistentUserId = 9999;
    
    // Act & Assert
    await expect(apiClient.get<User>(`/users/${nonExistentUserId}`))
      .rejects.toThrow();
  });
});