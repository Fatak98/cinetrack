import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const WatchList =()=>{
    const [watchlist, setWatchlist] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem("watchlist");
        const list = saved ? JSON.parse(saved) : [];
        setWatchlist(list);
    }, []);

    const handleRemove = (id) => {
        const updated = watchlist.filter((item) => item.id !== id);

        setWatchlist(updated);

        localStorage.setItem("watchlist", JSON.stringify(updated));
    };
    
    return (
    <div>
        <h1>My Watchlist</h1>

        {watchlist.length === 0 ? (
        <p>No items yet.</p>
        ) : (
        <ul>
            {watchlist.map((item) => (
            <li key={item.id}>
                <Link to={`/show/${item.id}`}>{item.name}</Link>
                <button onClick={() => handleRemove(item.id)}>remove</button>
            </li>
            ))}
        </ul>
        )}
    </div>
    );
}