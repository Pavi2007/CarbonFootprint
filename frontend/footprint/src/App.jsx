import { Routes, Route } from "react-router-dom";
import Badge from "./pages/Badge";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Recommendations from "./pages/Recommendations";
import Settings from "./pages/Settings";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserManagement from "./admin/pages/UserManagement";
import ActivityMonitoring from "./admin/pages/ActivityMonitoring";
import EmissionFactors from "./admin/pages/EmissionFactors";
import Organization from "./admin/pages/Organization";
import BadgeManagement from "./admin/pages/BadgeManagement";
import Reports from "./admin/pages/Reports";
import AdminAnalytics from "./admin/pages/AdminAnalytics";
import Goal from "./pages/Goal";
function App() {
  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Main Application */}
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/activity" element={<Activity />} />

      <Route path="/analytics" element={<Analytics />} />

      <Route path="/history" element={<History />} />
       <Route path="/goal" element={<Goal />} />
       <Route path="/badges" element={<Badge />} />
      <Route
        path="/recommendations"
        element={<Recommendations />}
      />

      <Route path="/settings" element={<Settings />} />
     <Route
    path="/admin/dashboard"
    element={<AdminDashboard />}
/>


<Route
    path="/admin/users"
    element={<UserManagement />}
/>

<Route
    path="/admin/activity"
    element={<ActivityMonitoring />}
/>

<Route
    path="/admin/emission"
    element={<EmissionFactors />}
/>

<Route
    path="/admin/organization"
    element={<Organization />}
/>

<Route
    path="/admin/badges"
    element={<BadgeManagement />}
/>

<Route
    path="/admin/reports"
    element={<Reports />}
/>

<Route
    path="/admin/analytics"
    element={<AdminAnalytics />}
/>

    </Routes>
  );
}

export default App;