import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Auth, Orders } from "./pages";
import Header from "./components/shared/Header";
import CreateOrder from "./pages/CreateOrder";

// Importo komponentët e menaxherëve dhe roleve të tjera
import AuthProvider from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";

// Komponentët për dashboard-in e çdo roli
import ManagerDashboard from "./pages/manager/DashboardManager";
import ChefDashboard from "./pages/chef/DashboarChef";
import ClientDashboard from "./pages/client/DashboardClient";
import WaiterDashboard from "./pages/waiter/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Header për aplikimin e saj */}
        <Header />
        <Routes>
          {/* Routes për aplikimin tuaj */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/CreateOrder" element={<CreateOrder />} />

          {/* Routes për regjistrim dhe login */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Routes për menaxherët dhe role të tjera */}
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute allowedRoles={["manager"]}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/waiter/dashboard"
            element={
              <ProtectedRoute allowedRoles={["waiter"]}>
                <WaiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chef/dashboard"
            element={
              <ProtectedRoute allowedRoles={["chef"]}>
                <ChefDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/dashboard"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
