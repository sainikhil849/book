import { useState, useEffect } from "react";
import { getBooks } from "@/services/bookService";
import { Book, BookFilters } from "@/types";
import BookCard from "@/components/book/BookCard";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, BookOpen } from "lucide-react";
import { PageContainer } from "@/components/ui/page-container";

const Dashboard = () => {
  const [filters, setFilters] = useState<BookFilters>({
    search: "",
    genre: "all-genres",
    availability: "all-books",
    location: ""
  });
  
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState<string[]>([]);
  
  useEffect(() => {
    fetchBooks();
  }, [filters]);
  
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks(filters);
      setBooks(data);
      
      const uniqueAuthors = Array.from(
        new Set(data.map(book => book.author))
      );
      setAuthors(uniqueAuthors);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const clearFilters = () => {
    setFilters({
      search: "",
      genre: "all-genres",
      availability: "all-books",
      location: ""
    });
  };
  
  const genres = [
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
  
  return (
    <PageContainer>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-book-primary to-book-secondary p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-book-primary to-book-secondary bg-clip-text text-transparent">
                Browse Books
              </h1>
            </div>
            <p className="text-gray-600">
              Discover amazing books shared by the community
            </p>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-100 p-6 mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                placeholder="Search books or authors..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-10 bg-white/50 hover:bg-white focus:bg-white transition-colors"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
            
            <Select
              value={filters.genre}
              onValueChange={(value) => handleFilterChange("genre", value)}
            >
              <SelectTrigger className="bg-white/50 hover:bg-white focus:bg-white transition-colors">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-genres">All Genres</SelectItem>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.availability}
              onValueChange={(value) => handleFilterChange("availability", value)}
            >
              <SelectTrigger className="bg-white/50 hover:bg-white focus:bg-white transition-colors">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-books">All Books</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Not Available">Not Available</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative">
              <Input
                placeholder="Location..."
                value={filters.location || ""}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full bg-white/50 hover:bg-white focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 bg-white/50 hover:bg-white"
            >
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-book-primary border-t-transparent animate-spin" />
            </div>
            <p className="mt-4 text-gray-600 animate-pulse">Finding books for you...</p>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-fade-in">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-100 animate-fade-in">
            <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-book-primary to-book-secondary flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No books found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new additions.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Dashboard;
