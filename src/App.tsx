
import { useLocation } from "react-router-dom";
import { StoreProvider } from "./context/CartContext";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Toast from "./components/common/Toast";
import AppRoutes from "./routes/AppRoutes";

function Shell() {
  const location = useLocation();
  const isAuthPage = ["/login", "/signup", "/checkout"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {!isAuthPage && <Navbar />}
      <AppRoutes />
      {!isAuthPage && <Footer />}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}