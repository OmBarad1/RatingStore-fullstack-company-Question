import React, { useContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./AuthContext";
import StoreList from "./pages/StoreList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashBoard";
import UserDashboard from "./pages/UserDashboard";

// ---------------- NAVBAR COMPONENT ----------------
function Nav() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <Link to="/" className="text-xl font-bold text-blue-600">
        StoreRatings
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              {user.name} ({user.role})
            </span>
            <Link to="/profile" className="text-sm underline">
              Profile
            </Link>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="px-3 py-1 border rounded">
              Login
            </Link>
            <Link to="/signup" className="px-3 py-1 bg-blue-500 text-white rounded">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// ---------------- PROTECTED ROUTE ----------------
function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}

// ---------------- MAIN APP COMPONENT ----------------
export default function App() {
  return (
    <AuthProvider>
      <Nav />
      <div className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route
            path="/profile"
            element={
                <Profile />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <StoreOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/stores" element={<StoreList />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
