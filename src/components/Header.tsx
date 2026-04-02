import { NavLink } from "react-router";
import { useCart } from "../providers/CartContext";

const LINKS = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Admin", link: "/admin-crud" },
];

const Header = () => {
  const { getCartLength } = useCart();

  return (
    <nav className="bg-base-100 shadow-sm">
      <div className="custom-container flex justify-between items-center py-4">
        <div className="">
          <a className="btn btn-primary text-xl">3zoz Car</a>
        </div>
        <ul className="flex gap-2 items-center">
          {LINKS.map((link, idx) => (
            <li key={idx}>
              <NavLink
                className={({ isActive }) =>
                  `hover:text-primary inline-block capitalize px-2 py-1.5 transition-all duration-300 ${
                    isActive
                      ? "text-primary font-bold bg-primary/20 rounded-xl"
                      : ""
                  }`
                }
                to={link.link}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink
          to={"/cart"}
          className={({ isActive }) =>
            `hover:text-primary transition-all duration-300 relative ${
              isActive ? "text-primary/60 font-bold " : ""
            }`
          }
        >
          {getCartLength() > 0 && (
            <span className="absolute -top-2 -right-1 size-5 rounded-full text-black text-xs font-bold bg-primary flex items-center justify-center">
              {getCartLength()}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
