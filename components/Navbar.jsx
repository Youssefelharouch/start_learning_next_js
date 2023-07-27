import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Link className="text-orange-800 hover:underline" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-orange-800 hover:underline" href="/reviews">
            Reviews
          </Link>
        </li>
        <li>
          <Link className="text-orange-800 hover:underline" href="/about" prefetch={false}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
