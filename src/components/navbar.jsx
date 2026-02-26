import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
return (
    <nav className="navbar">
        <Link to="/" className="nav-logo">
        CineTrack
        </Link>
        <div className="nav-links">
            <Link to="/search">Search</Link>
            <Link to="/watchlist">WatchList</Link>
        </div>
    </nav>
);
};