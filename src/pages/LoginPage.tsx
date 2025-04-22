
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Book } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-book-primary/5 via-book-secondary/5 to-book-accent/5">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative w-full max-w-md px-4 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 animate-fade-in">
          <div className="flex flex-col items-center space-y-3">
            <div className="rounded-full bg-gradient-to-br from-book-primary to-book-secondary p-3">
              <Book className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-book-primary to-book-secondary bg-clip-text text-transparent">
              Welcome to PageTurn
            </h1>
            <p className="text-gray-600 text-center">
              Sign in to continue to your account
            </p>
          </div>
          
          <LoginForm />
          
          <div className="pt-4">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="font-medium text-book-primary hover:text-book-secondary transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
