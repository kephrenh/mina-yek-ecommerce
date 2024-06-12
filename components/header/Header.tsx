import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link
            href="/"
            className="btn btn-ghost text-lg">
            MinaYek.
          </Link>
          <ul className="flex">
            <li>
              <Link
                href="/panier"
                className="btn btn-ghost rounded-btn">
                Panier
              </Link>
            </li>
            <li>
              <Link
                href="/signin"
                className="btn btn-ghost rounded-btn">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
