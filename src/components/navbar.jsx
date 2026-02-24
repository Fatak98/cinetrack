import { Link } from "react-router-dom";

export const Navbar = () => {
return (
    <div style={{ display: "flex", gap: "20px" }}>
    <Link to="/">Home</Link>
    <Link to="/research">Search</Link>
    <Link to="/details">ShowDetails</Link>
    <Link to="/watchlist">WatchList</Link>
    </div>
);
};