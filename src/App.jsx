import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Dashboard from "./pages/dashboard";
import MovieDetails from "./pages/detailPage";
import DashboardLayout from "./components/dashboardLayout";
import DashboardFilteredContent from "./pages/dashboardFilteredContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/details/:id" element={<MovieDetails />} />

      {/* Dashboard pages wrapped in layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/category/:type" element={<DashboardFilteredContent />} />
        </Route>
    </Routes>
  );
}

export default App;
