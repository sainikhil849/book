
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Book, Mail, MapPin } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold mb-6">My Profile</h1>
        
        <div className="max-w-3xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-book-primary to-book-secondary text-white rounded-t-lg">
              <CardTitle className="text-2xl font-serif">
                {user?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{user?.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>{user?.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-gray-500" />
                  <span>
                    {user?.bookCount || 0} {(user?.bookCount || 0) === 1 ? "Book" : "Books"} Shared
                  </span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={() => navigate("/my-books")} className="flex-1">
                  View My Books
                </Button>
                <Button onClick={() => navigate("/add-book")} variant="outline" className="flex-1">
                  Add New Book
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
