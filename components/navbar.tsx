import Link from "next/link";
import { Home, Tv2, Tag, List, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

const NavBar = () => {
  const navitems = [
    {
      id: "dashboard",
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      name: "Products",
      href: "/products",
      icon: <Tv2 />,
    },
    {
      id: "categories",
      name: "Categories",
      href: "/categories",
      icon: <Tag />,
    },
    {
      id: "orders",
      name: "Orders",
      href: "/orders",
      icon: <List />,
    },
  ];

  return (
    <nav className="w-full flex flex-1 border-b-2 items-center gap-10 p-2">
      <Link href="/" className="flex items-center gap-2 mr-auto">
        <Home />
        <span className="hidden md:block">Cartopia</span>
      </Link>
      {navitems.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className="flex items-center gap-2"
        >
          {item.icon}
          <span className="hidden md:block">{item.name}</span>
        </Link>
      ))}
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
