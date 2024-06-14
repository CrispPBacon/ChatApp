import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";

// Lazy load components
const Login = lazy(() => import("./components/auth/Login"));
const Signup = lazy(() => import("./components/auth/Signup"));
const PublicRoute = lazy(() => import("./api/PublicRoute"));
const PrivateRoute = lazy(() => import("./api/PrivateRoute"));
const ChatApp = lazy(() => import("./components/chat/ChatApp"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ChatProvider>
                    <ChatApp />
                  </ChatProvider>
                </PrivateRoute>
              }
            />
            <Route
              path="/m/:id"
              element={
                <PrivateRoute>
                  <ChatProvider>
                    <ChatApp />
                  </ChatProvider>
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
