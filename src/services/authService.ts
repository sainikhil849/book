
import { LoginFormData, RegisterFormData, User } from "../types";

// Mock authentication service
// In a real app, this would make API calls to your backend

const LOCAL_STORAGE_KEY = "pageturn_user";

// Sample user data for demonstration
const sampleUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    location: "New York, NY",
    bookCount: 5
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    location: "San Francisco, CA",
    bookCount: 3
  }
];

export const login = async (data: LoginFormData): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const user = sampleUsers.find(u => u.email === data.email);
  
  if (!user || user.password !== data.password) {
    throw new Error("Invalid email or password");
  }
  
  const { password, ...userWithoutPassword } = user;
  
  // Save to localStorage to persist the session
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword as User;
};

export const register = async (data: RegisterFormData): Promise<User> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user already exists
  if (sampleUsers.some(u => u.email === data.email)) {
    throw new Error("User with this email already exists");
  }
  
  // Create new user
  const newUser = {
    id: Math.random().toString(36).substr(2, 9),
    name: data.name,
    email: data.email,
    password: data.password, // In a real app, this would be hashed
    location: data.location,
    bookCount: 0
  };
  
  sampleUsers.push(newUser);
  
  const { password, ...userWithoutPassword } = newUser;
  
  // Save to localStorage to persist the session
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword as User;
};

export const logout = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return userData ? JSON.parse(userData) : null;
};
