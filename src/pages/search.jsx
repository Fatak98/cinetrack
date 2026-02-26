import { useState } from "react";
import { searchShows } from "../api/tvmaze";
import { Link } from "react-router-dom";
import "./search.css";

const Search = () => {
    const [shows, setShows] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const results = await searchShows(query);

            const mapped = (results || [])
                .map((item) => item?.show ?? item)
                .filter((s) => s && s.id);   // remove undefined

            setShows(mapped);
        } catch (err) {
            console.error(err);
            setShows([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="searchPage">

            {/* SEARCH BAR */}
            <div className="searchBar">
                <input
                    value={query}
                    onChange={handleChange}
                    placeholder="Search movies or shows..."
                />

                <button onClick={handleSearch}>
                    🔎
                </button>
            </div>

            {/* LOADING */}
            {loading && <p className="infoText">Searching...</p>}

            {/* RESULTS */}
            <div className="searchGrid">
                {shows.map((show) => (
                    <Link
                        key={show.id}
                        to={`/show/${show.id}`}
                        className="movieCard"
                    >
                        <div className="posterWrap">
                            <img
                                src={
                                    show.image?.medium ||
                                    "https://via.placeholder.com/300x450?text=No+Image"
                                }
                                alt={show.name}
                            />
                        </div>

                        <p className="movieTitle">{show.name}</p>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export { Search };