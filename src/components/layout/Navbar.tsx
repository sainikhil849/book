
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Book, LogIn, LogOut, Plus, User } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <div className="bg-gradient-to-r from-book-primary to-book-secondary p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Book className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold ml-2 bg-gradient-to-r from-book-primary to-book-secondary bg-clip-text text-transparent">
              PageTurn
            </span>
          </Link>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-book-primary px-3 py-2 rounded-lg transition-colors hover:bg-gray-50"
                  >
                    Browse Books
                  </Link>
                  <Link 
                    to="/my-books" 
                    className="text-gray-700 hover:text-book-primary px-3 py-2 rounded-lg transition-colors hover:bg-gray-50"
                  >
                    My Books
                  </Link>
                </>
              ) : (
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-book-primary px-3 py-2 rounded-lg transition-colors hover:bg-gray-50"
                >
                  Browse Books
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Button asChild variant="secondary" size="sm" className="hidden md:flex bg-gradient-to-r from-book-primary to-book-secondary text-white hover:opacity-90">
                  <Link to="/add-book">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Book
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="glass-effect">
                  <Link to="/profile" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {user?.name.split(' ')[0]}
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="glass-effect">
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="sm"
                  className="bg-gradient-to-r from-book-primary to-book-secondary text-white hover:opacity-90"
                >
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
