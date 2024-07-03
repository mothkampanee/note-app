import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };
  return (
    <section className="bg-white flex justify-between items-baseline px-6 py-6">
      <div className="font-bold text-3xl">Notetify</div>

      <SearchBar
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo onLogout={onLogout} />
    </section>
  );
}

export default Navbar;
