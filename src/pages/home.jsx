import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
    const navigate = useNavigate();

    const [suggestions, setSuggestions] = useState([]);
    const [featured, setFeatured] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const randomPage = useMemo(() => Math.floor(Math.random() * 10), []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(`https://api.tvmaze.com/shows?page=${randomPage}`);
                if (!res.ok) throw new Error("Failed to fetch shows.");

                const data = await res.json();

                // shuffle & pick 10
                const shuffled = [...data].sort(() => Math.random() - 0.5);
                const picks = shuffled.slice(0, 10);

                const withImage = picks.find((s) => s?.image?.original || s?.image?.medium);
                const featuredPick = withImage || picks[0] || null;

                setSuggestions(picks);
                setFeatured(featuredPick);
            } catch (err) {
                console.error(err);
                setError("Something went wrong while loading suggestions.");
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [randomPage]);

    const featuredBg =
        featured?.image?.original ||
        featured?.image?.medium ||
        "";

    const featuredSummary = truncate(stripHtml(featured?.summary), 180);

    const goToShow = (id) => navigate(`/show/${id}`);

    return (
        <div className="home">
            <div className="container">
                <header className="homeHeader">
                    <h1 className="pageTitle">CineTrack</h1>
                    <p className="pageSubtitle">Suggestions for you</p>
                </header>

                {loading && (
                    <>
                        <section className="hero heroSkeleton">
                            <div className="heroOverlay" />
                            <div className="heroContent">
                                <div className="skelLine skelTitle" />
                                <div className="skelLine" />
                                <div className="skelLine" />
                                <div className="skelButtons">
                                    <div className="skelBtn" />
                                    <div className="skelBtn" />
                                </div>
                            </div>
                        </section>

                        <section className="rowSection">
                            <h2 className="rowTitle">More like this</h2>
                            <div className="row">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="card">
                                        <div className="skelPoster" />
                                        <div className="skelLine skelSmall" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}

                {!loading && error && (
                    <div className="errorBox">
                        <p>{error}</p>
                        <button
                            className="btn ghost"
                            onClick={() => window.location.reload()}
                        >
                            Reload
                        </button>
                    </div>
                )}

                {!loading && !error && featured && (
                    <>
                        <section
                            className="hero"
                            style={{
                                backgroundImage: featuredBg ? `url(${featuredBg})` : "none",
                            }}
                        >
                            <div className="heroOverlay" />
                            <div className="heroContent">
                                <p className="heroKicker">Featured</p>
                                <h2 className="heroTitle">{featured.name}</h2>

                                {featuredSummary && (
                                    <p className="heroSummary">{featuredSummary}</p>
                                )}

                                <div className="heroActions">
                                    <button
                                        className="btn primary"
                                        onClick={() => goToShow(featured.id)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="btn ghost"
                                        onClick={() => goToShow(featured.id)}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="rowSection">
                            <h2 className="rowTitle">More like this</h2>

                            <div className="row">
                                {suggestions
                                    .filter((s) => s?.id && s.id !== featured.id)
                                    .slice(0, 9)
                                    .map((show) => (
                                        <button
                                            key={show.id}
                                            className="card"
                                            onClick={() => goToShow(show.id)}
                                            aria-label={`Open ${show.name}`}
                                        >
                                            <img
                                                src={show.image?.medium || ""}
                                                alt={show.name}
                                                loading="lazy"
                                                className="poster"
                                            />
                                            <p className="cardTitle">{show.name}</p>
                                        </button>
                                    ))}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
};

function stripHtml(html = "") {
    return String(html).replace(/<[^>]*>/g, "").trim();
}

function truncate(text = "", max = 180) {
    if (!text) return "";
    return text.length > max ? text.slice(0, max).trim() + "…" : text;
}