
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import { Book } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="flex flex-col items-center mb-6">
          <Book className="h-12 w-12 text-book-primary mb-2" />
          <h1 className="text-3xl font-bold font-serif text-center">Create an Account</h1>
          <p className="text-gray-600 text-center mt-1">
            Join our community of book lovers
          </p>
        </div>
        
        <RegisterForm />
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-book-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
