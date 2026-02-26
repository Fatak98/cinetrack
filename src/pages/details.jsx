import { useParams, useNavigate } from "react-router-dom";
import { getShow } from "../api/tvmaze";
import { useState, useEffect, useMemo } from "react";
import "./details.css";

export const ShowDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [show, setShow] = useState(null);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        async function fetchShow() {
            const data = await getShow(id);
            setShow(data);
            setAdded(false);
        }
        fetchShow();
    }, [id]);

    const poster = useMemo(() => {
        return (
            show?.image?.original ||
            show?.image?.medium ||
            "https://via.placeholder.com/600x900?text=No+Poster"
        );
    }, [show]);

    const backdrop = useMemo(() => {
        // Use original poster as backdrop if nothing else exists
        return (
            show?.image?.original ||
            show?.image?.medium ||
            ""
        );
    }, [show]);

    if (!show) return <h1 style={{ paddingTop: 20 }}>Loading...</h1>;

    const handleAdd = () => {
        const saved = localStorage.getItem("watchlist");
        const watchlist = saved ? JSON.parse(saved) : [];

        const item = {
            id: show.id,
            name: show.name,
            image: show.image?.medium || show.image?.original || "",
        };

        const alreadyExists = watchlist.some((x) => x.id === item.id);
        if (alreadyExists) {
            setAdded(true);
            return;
        }

        const updated = [...watchlist, item];
        localStorage.setItem("watchlist", JSON.stringify(updated));
        setAdded(true);
    };

    return (
        <div className="detailsPage">
            {/* Backdrop Header */}
            <section
                className="detailsHero"
                style={backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
            >
                <div className="detailsHeroOverlay" />
                <div className="detailsHeroInner">
                    <button className="backLink" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                    <div className="detailsHeroTitleWrap">
                        <h1 className="detailsTitle">{show.name}</h1>
                        <div className="detailsMeta">
                            {show.rating?.average && (
                                <span className="badge">⭐ {show.rating.average}</span>
                            )}
                            {show.genres?.length > 0 && (
                                <span className="badge">{show.genres.join(" • ")}</span>
                            )}
                            {show.premiered && (
                                <span className="badge">{String(show.premiered).slice(0, 4)}</span>
                            )}
                            {show.runtime && <span className="badge">{show.runtime} min</span>}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="detailsContainer">
                <div className="detailsGrid">
                    {/* Fixed-size poster */}
                    <div className="posterWrap">
                        <img className="posterImg" src={poster} alt={show.name} />
                    </div>

                    <div className="detailsInfo">
                        <div className="actions">
                            <button className="btn btnPrimary" onClick={handleAdd}>
                                {added ? "Added ✓" : "Add to Watchlist"}
                            </button>

                            <button className="btn btnSecondary" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>

                        <div
                            className="summary"
                            dangerouslySetInnerHTML={{ __html: show.summary || "" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};