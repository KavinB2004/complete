import { useLocation } from "react-router-dom";
import Landing from "../pages/Landing";
import RetroLogin from "../pages/RetroLogin";
import RetroRegister from "../pages/RetroRegister";

export default function AuthLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {/* Landing page always mounted */}
      <div style={{ display: isAuthPage ? 'block' : 'block' }}>
        <Landing />
      </div>
      
      {/* Auth pages overlay on top */}
      {location.pathname === "/login" && <RetroLogin />}
      {location.pathname === "/register" && <RetroRegister />}
    </>
  );
}
