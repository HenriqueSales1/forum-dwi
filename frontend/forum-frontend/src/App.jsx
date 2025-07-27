import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/NavBar";
import PermissionsPage from "./pages/PermissionsPage.jsx";
import AdminRoute from "./components/AdminRoutes.jsx";
import UserListPage from './pages/UserPage.jsx';
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/permissions" element={<PermissionsPage />} />
            <Route path="/admin/users" element={<UserListPage />}/>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
