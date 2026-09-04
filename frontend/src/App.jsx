import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DonorDashboard from "./pages/donor/DonorDashboard";
import RecipientDashboard from "./pages/recipient/RecipientDashboard";
import NotFound from "./pages/public/NotFound";

import DashboardHome from "./pages/donor/DashboardHome";
import AddDonation from "./pages/donor/AddDonation";
import MyDonations from "./pages/donor/MyDonations";
import IncomingRequests from "./pages/donor/IncomingRequests";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import AvailableDonations from "./pages/recipient/AvailableDonations";
import RecipientDashboardHome from "./pages/recipient/RecipientDashboardHome";

import MyRequests from "./pages/recipient/MyRequests";
import Profile from "./pages/profile/Profile";

import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/donor" element={<DonorDashboard />}>
            <Route index element={<DashboardHome />} />

            <Route
              path="add"
              element={<AddDonation />}
            />

            <Route
              path="donations"
              element={<MyDonations />}
            />

            <Route
              path="requests"
              element={<IncomingRequests />}
            />
          </Route>

          <Route
            path="/recipient"
            element={<RecipientDashboard />}
          >
            <Route
              index
              element={<RecipientDashboardHome />}
            />

            <Route
              path="donations"
              element={<AvailableDonations />}
            />

            <Route
              path="requests"
              element={<MyRequests />}
            />

          </Route>

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;