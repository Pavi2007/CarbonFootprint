import { Routes, Route } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Recommendations from "./pages/Recommendations";
import Settings from "./pages/Settings";
function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/activity" element={<Activity />} />

      <Route path="/analytics" element={<Analytics />} />

      <Route path="/history" element={<History />} />

      <Route path="/recommendations" element={<Recommendations />} />

      <Route path="/settings" element={<Settings />} />
<Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
    </Routes>
  );
}

export default App;