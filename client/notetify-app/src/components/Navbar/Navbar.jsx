import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";

function Navbar() {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <section className="bg-white flex justify-between items-center px-6 py-2">
      <div className="font-bold text-3xl">Notetify</div>
      <ProfileInfo onLogout={onLogout} />
    </section>
  );
}

export default Navbar;
