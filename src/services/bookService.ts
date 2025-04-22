
import { BookFilters, Book, BookFormData } from "@/types";

// Mock data for book listings
const books: Book[] = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    condition: "Good",
    availability: "Available",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
    description: "A classic of modern American literature.",
    owner: {
      id: "1",
      name: "John Doe",
      location: "New York",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    condition: "Very Good",
    availability: "Available",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781256i/61439040.jpg",
    description: "A dystopian novel set in a totalitarian regime.",
    owner: {
      id: "2",
      name: "Jane Smith",
      location: "Los Angeles",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    condition: "Like New",
    availability: "Not Available",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
    description: "A romantic novel of manners.",
    owner: {
      id: "1",
      name: "John Doe",
      location: "New York",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    condition: "Good",
    availability: "Available",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
    description: "A tale of wealth, love and the American Dream.",
    owner: {
      id: "3",
      name: "Bob Johnson",
      location: "Chicago",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Update the filtering function to handle the new "all-genres" and "all-books" values
export const getBooks = async (filters?: BookFilters): Promise<Book[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredBooks = [...books];
  
  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchLower) || 
        book.author.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.genre && filters.genre !== "all-genres") {
      filteredBooks = filteredBooks.filter(book => book.genre === filters.genre);
    }
    
    if (filters.author) {
      filteredBooks = filteredBooks.filter(book => book.author === filters.author);
    }
    
    if (filters.availability && filters.availability !== "all-books") {
      filteredBooks = filteredBooks.filter(book => book.availability === filters.availability);
    }
    
    if (filters.location) {
      filteredBooks = filteredBooks.filter(book => 
        book.owner.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
  }
  
  return filteredBooks;
};

// Get books for the current user (mock implementation)
export const getUserBooks = async (): Promise<Book[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For now, let's assume user ID 1 is logged in
  const userId = "1";
  
  return books.filter(book => book.owner.id === userId);
};

// Add a new book (mock implementation)
export const addBook = async (bookData: BookFormData): Promise<Book> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newBook: Book = {
    id: String(books.length + 1),
    ...bookData,
    // Cast condition to the correct type
    condition: bookData.condition as Book['condition'],
    availability: bookData.availability as 'Available' | 'Not Available',
    owner: {
      id: "1", // Assume user ID 1 is logged in
      name: "John Doe",
      location: "New York",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  books.push(newBook);
  
  return newBook;
};

// Update a book (mock implementation)
export const updateBook = async (id: string, bookData: BookFormData): Promise<Book> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    throw new Error("Book not found");
  }
  
  const updatedBook: Book = {
    ...books[bookIndex],
    ...bookData,
    // Cast condition to the correct type
    condition: bookData.condition as Book['condition'],
    availability: bookData.availability as 'Available' | 'Not Available',
    updatedAt: new Date().toISOString(),
  };
  
  books[bookIndex] = updatedBook;
  
  return updatedBook;
};

// Delete a book (mock implementation)
export const deleteBook = async (id: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    throw new Error("Book not found");
  }
  
  books.splice(bookIndex, 1);
};

// Get available conditions for books
export const getConditions = (): string[] => {
  return [
    "New",
    "Like New",
    "Very Good",
    "Good",
    "Acceptable",
    "Poor"
  ];
};

// Get list of book genres
export const getGenres = async (): Promise<string[]> => {
  // In a real app, this might come from the backend
  // For now, we'll return a static list
  return [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Science Fiction",
    "Romance",
    "Fantasy",
    "Thriller",
    "Biography",
    "History",
    "Self-help",
    "Business",
    "Classic",
    "Horror",
    "Young Adult",
    "Poetry"
  ];
};
