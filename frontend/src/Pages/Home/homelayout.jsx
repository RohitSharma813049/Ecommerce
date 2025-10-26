import { AdminNavbar } from "@/Admin/navbar/adminnavbar";
import { UserNavbar } from "../navbar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/footer/footer";
import { useSelector } from "react-redux";

function HomeLayout() {
  const role = useSelector((state) => state.auth.role);

  return (
    <div>
      {/* Render Navbar based on role */}
      {role === "admin" ? <AdminNavbar /> : <UserNavbar />}

      {/* Main page content */}
      <div><Outlet /></div>

      {/* Footer always displayed */}
      <div><Footer /></div>
    </div>
  );
}

export default HomeLayout;
