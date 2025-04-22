
export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  bookCount?: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Acceptable' | 'Poor';
  availability: 'Available' | 'Not Available';
  imageUrl: string;
  description?: string;
  owner: {
    id: string;
    name: string;
    location: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  location: string;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability: string;
  imageUrl: string;
  description?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => void;
}

export interface BookFilters {
  search?: string;
  genre?: string;
  author?: string;
  availability?: string;
  location?: string;
}
