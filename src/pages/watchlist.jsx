import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./watchlist.css";

export const WatchList = () => {
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
        <div className="watchlist-page">
            <div className="watchlist-header">
                <h1 className="watchlist-title">My Watchlist</h1>
                <div className="watchlist-count">{watchlist.length} items</div>
            </div>

            {watchlist.length === 0 ? (
                <div className="empty-watchlist">
                    <h2>Your watchlist is empty 🎬</h2>
                    <p>Start adding shows to see them here.</p>
                    <Link to="/" className="empty-btn">Browse shows</Link>
                </div>
            ) : (
                <div className="watchlist-grid">
                    {watchlist.map((item) => (
                        <div key={item.id} className="watch-card">
                            <Link to={`/show/${item.id}`} className="watch-card-link">
                                <img
                                    src={item.image || "https://via.placeholder.com/300x450?text=No+Image"}
                                    alt={item.name}
                                />
                            </Link>

                            <div className="watch-card-footer">
                                <p className="watch-card-title" title={item.name}>{item.name}</p>
                                <button className="remove-btn" onClick={() => handleRemove(item.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}