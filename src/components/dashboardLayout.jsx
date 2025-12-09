import { Outlet } from "react-router-dom";
import Navbar from "./navBar";     
import "../pages/dashboard.css"; 

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <Navbar /> 
      <div className="dashboard-content">
         {/* Renders dashboard content */}
        <Outlet />
      </div>
    </div>
  );
}


