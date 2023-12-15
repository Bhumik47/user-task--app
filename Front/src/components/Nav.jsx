import AuthService from "../services/auth.service";

const Nav = ({ user, setIsAuthenticated,navigate }) => {
  const handleLogout = async () => {
    await AuthService.logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  const username = JSON.parse(localStorage.getItem("username"));

  return (
    <nav className="flex justify-between items-center bg-gray-300 p-4 h-[5vh] w-[100vw]">
      <h3 className="text-lg text-black font-semibold">{`Welcome, ${username}`}</h3>
      <button
        onClick={handleLogout}
        className="border-none bg-transparent text-black hover:text-blue-700 font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Nav;
