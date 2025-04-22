
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/types";
import { useState } from "react";

interface BookCardProps {
  book: Book;
  showActions?: boolean;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

const BookCard = ({ book, showActions = false, onEdit, onDelete }: BookCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const fallbackImage = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop";
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="book-card animate-fade-in">
      <div className="relative">
        <img
          src={imageError ? fallbackImage : book.imageUrl}
          alt={`Cover of ${book.title}`}
          className="book-cover"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2">
          <Badge variant={book.availability === "Available" ? "default" : "secondary"}>
            {book.availability}
          </Badge>
        </div>
      </div>
      <div className="book-info">
        <h3 className="text-lg font-bold line-clamp-1 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline">{book.genre}</Badge>
          <span className="text-xs text-gray-500">{book.condition}</span>
        </div>
        
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
          <span>{book.owner.location}</span>
        </div>
        
        {showActions && onEdit && onDelete && (
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="flex-1 bg-book-primary/10 text-book-primary rounded-md px-3 py-1 text-xs font-medium transition hover:bg-book-primary/20"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book)}
              className="flex-1 bg-red-100 text-red-600 rounded-md px-3 py-1 text-xs font-medium transition hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
