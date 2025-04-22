
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getUserBooks, deleteBook, updateBook } from "@/services/bookService";
import { Book, BookFormData } from "@/types";
import BookCard from "@/components/book/BookCard";
import BookForm from "@/components/book/BookForm";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MyBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      loadBooks();
    }
  }, [isAuthenticated]);
  
  const loadBooks = async () => {
    try {
      setLoading(true);
      const bookList = await getUserBooks();
      setBooks(bookList);
    } catch (error) {
      console.error("Error loading user books:", error);
      toast({
        title: "Error",
        description: "There was an error loading your books.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };
  
  const handleUpdate = async (data: BookFormData) => {
    if (!selectedBook) return;
    
    try {
      setIsSubmitting(true);
      await updateBook(selectedBook.id, data);
      toast({
        title: "Book Updated",
        description: "Your book has been updated successfully.",
      });
      setIsEditDialogOpen(false);
      loadBooks();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your book.",
        variant: "destructive",
      });
      console.error("Error updating book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedBook) return;
    
    try {
      setIsSubmitting(true);
      await deleteBook(selectedBook.id);
      toast({
        title: "Book Deleted",
        description: "Your book has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      loadBooks();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting your book.",
        variant: "destructive",
      });
      console.error("Error deleting book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">My Books</h1>
            <p className="text-gray-600 mb-4">
              Manage the books you've shared with the community
            </p>
          </div>
          
          <Button onClick={() => navigate("/add-book")} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Book</span>
          </Button>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-gray-600">Loading your books...</p>
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                showActions={true}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No books found</h3>
            <p className="text-gray-600 mb-6">
              You haven't added any books yet. Start sharing your collection with the community!
            </p>
            
            <Button onClick={() => navigate("/add-book")}>
              Add Your First Book
            </Button>
          </div>
        )}
      </div>
      
      {/* Edit Book Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>
          {selectedBook && (
            <BookForm
              initialData={selectedBook}
              onSubmit={handleUpdate}
              isSubmitting={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Book Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your book from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyBooks;
