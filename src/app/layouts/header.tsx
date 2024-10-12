import Navbar from "@/app/components/nav/nav-bar";
import ThemeSwitch from "@/app/misc/themes/switcher";

const Header = () => {
  return (
    <header className="flex">
      <Navbar />
      <div className="ml-auto">
        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
