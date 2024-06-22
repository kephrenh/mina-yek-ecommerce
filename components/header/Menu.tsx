"use client";

import useCartService from "@lib/hooks/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <div>
        <ul className="flex items-stretch">
          <li>
            <Link
              href="/panier"
              className="btn btn-ghost rounded-btn">
              Panier
              {mounted && items.length !== 0 && (
                <div className="badge badge-secondary">{items.reduce((a, c) => a + c.qty, 0)} </div>
              )}
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-ghost rounded-btn">
              Login
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Menu;
