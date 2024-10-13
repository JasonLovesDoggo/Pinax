import Navbar from "@/components/nav/nav-bar";
import ThemeSwitch from "@/components/themes/switcher";

const Header = () => {
  return (
    <header className="flex pb-32">
      <Navbar />
      <div className="ml-auto">
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
