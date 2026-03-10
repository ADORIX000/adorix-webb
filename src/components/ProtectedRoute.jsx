import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Show a simple spinner while checking auth state
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-adorix-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to signup and remember where they were trying to go
        return <Navigate to="/signup" state={{ from: location, error: 'Please create an account to access this page.' }} replace />;
    }

    return children;
};

export default ProtectedRoute;
