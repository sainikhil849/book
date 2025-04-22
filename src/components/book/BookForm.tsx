
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getConditions, getGenres } from "@/services/bookService";
import { Book, BookFormData } from "@/types";

interface BookFormProps {
  initialData?: Book;
  onSubmit: (data: BookFormData) => Promise<void>;
  isSubmitting: boolean;
}

const BookForm = ({ initialData, onSubmit, isSubmitting }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    genre: initialData?.genre || "",
    condition: initialData?.condition || "Good",
    availability: initialData?.availability || "Available",
    imageUrl: initialData?.imageUrl || "",
    description: initialData?.description || ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [genres, setGenres] = useState<string[]>([]);
  const conditions = getConditions();
  
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };
    
    loadGenres();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.author) {
      newErrors.author = "Author is required";
    }
    
    if (!formData.genre) {
      newErrors.genre = "Genre is required";
    }
    
    if (!formData.condition) {
      newErrors.condition = "Condition is required";
    }
    
    if (!formData.availability) {
      newErrors.availability = "Availability is required";
    }
    
    if (!formData.imageUrl) {
      newErrors.imageUrl = "Book cover image URL is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Book form error:", error);
    }
  };
  
  const commonGenres = [
    "Fiction", "Non-fiction", "Mystery", "Science Fiction", 
    "Romance", "Fantasy", "Thriller", "Biography", "History", 
    "Self-help", "Business", "Classic", "Horror", "Young Adult", "Poetry"
  ];
  
  const allGenres = Array.from(new Set([...genres, ...commonGenres])).sort();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter book title"
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          placeholder="Enter author name"
          value={formData.author}
          onChange={handleChange}
          disabled={isSubmitting}
          className={errors.author ? "border-red-500" : ""}
        />
        {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select
            name="genre" 
            value={formData.genre} 
            onValueChange={(value) => handleSelectChange("genre", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className={errors.genre ? "border-red-500" : ""}>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {allGenres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.genre && <p className="text-sm text-red-500">{errors.genre}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="condition">Condition</Label>
          <Select
            name="condition" 
            value={formData.condition} 
            onValueChange={(value) => handleSelectChange("condition", value)}
            disabled={isSubmitting}
          >
            <SelectTrigger className={errors.condition ? "border-red-500" : ""}>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              {conditions.map(condition => (
                <SelectItem key={condition} value={condition}>{condition}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.condition && <p className="text-sm text-red-500">{errors.condition}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Select
          name="availability" 
          value={formData.availability} 
          onValueChange={(value) => handleSelectChange("availability", value)}
          disabled={isSubmitting}
        >
          <SelectTrigger className={errors.availability ? "border-red-500" : ""}>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Not Available">Not Available</SelectItem>
          </SelectContent>
        </Select>
        {errors.availability && <p className="text-sm text-red-500">{errors.availability}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Book Cover Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          placeholder="https://example.com/book-cover.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
          disabled={isSubmitting}
          className={errors.imageUrl ? "border-red-500" : ""}
        />
        {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl}</p>}
        
        {formData.imageUrl && !errors.imageUrl && (
          <div className="mt-2 border rounded-md p-2 w-28">
            <img
              src={formData.imageUrl}
              alt="Book cover preview"
              className="aspect-[2/3] object-cover"
              onError={() => setErrors(prev => ({ ...prev, imageUrl: "Image URL is invalid" }))}
            />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Brief description of the book"
          value={formData.description || ""}
          onChange={handleChange}
          disabled={isSubmitting}
          rows={4}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : initialData ? "Update Book" : "Add Book"}
      </Button>
    </form>
  );
};

export default BookForm;
