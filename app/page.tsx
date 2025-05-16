"use client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../app/dashboard/page";
import Login from "../app/(auth)/login/page";
import CodeEditor from "../app/editor/page";
import { useAuth } from "@/context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/code-editor"
          element={user ? <CodeEditor /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
