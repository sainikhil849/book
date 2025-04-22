
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { addBook } from "@/services/bookService";
import { BookFormData } from "@/types";
import BookForm from "@/components/book/BookForm";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const AddBook = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleSubmit = async (data: BookFormData) => {
    try {
      setIsSubmitting(true);
      await addBook(data);
      toast({
        title: "Book Added",
        description: "Your book has been added successfully.",
      });
      navigate("/my-books");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding your book.",
        variant: "destructive",
      });
      console.error("Error adding book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-2">Add a New Book</h1>
          <p className="text-gray-600 mb-6">
            Share a book from your collection with the community
          </p>
          
          <div className="bg-white rounded-lg shadow p-6">
            <BookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
