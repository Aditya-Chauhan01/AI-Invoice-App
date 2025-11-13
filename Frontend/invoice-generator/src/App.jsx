import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Allinvoices from "./pages/Invoices/Allinvoices"
import CreateInvoice from './pages/Invoices/CreateInvoice'
import InvoiceDetail from './pages/Invoices/InvoiceDetail'
import ProfilePage from "./pages/Profile/ProfilePage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (

   <AuthProvider>
    <Router>
       <Routes>

        {/* Public Routes */}
        <Route path="/"  element={<LandingPage />} />
        <Route path="/signup"  element={<SignUp />} />
        <Route path="/login"  element={<Login />} />

        {/* protected Routes */}
        <Route path="/"  element={<ProtectedRoute />} >
          <Route path="dashboard"  element={<Dashboard />} />
          <Route path="invoices" element={<Allinvoices />} />
          <Route path="invoices/new" element={<CreateInvoice />} />
          <Route path="invoices/:id" element={<InvoiceDetail />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />

       </Routes>
    </Router>

    <Toaster
      toastOptions={{
        className: "",
        style: {
          fontSize: "13px",
        },
      }}
     />

   </AuthProvider>
  )
}

export default App