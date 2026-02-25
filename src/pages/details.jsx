import { useParams } from "react-router-dom";
import { getShow } from "../api/tvmaze";
import { useState,useEffect } from "react";

export const ShowDetails = () => {
    const {id} = useParams();
    const [show, setShow] = useState(null);
    useEffect(() => {
    async function fetchShow() {
    const data = await getShow(id);
    setShow(data);
    }
    fetchShow();
    }, [id]);
    if (!show) return <h1>Loading...</h1>;
    const handleAdd=()=>{
        const saved = localStorage.getItem("watchlist");
        const watchlist = saved ? JSON.parse(saved) : [];
        const item = {
            id: show.id,
            name: show.name,
            image: show.image?.medium || "",
        };
        const alreadyExists = watchlist.some((x) => x.id === item.id);
        if (alreadyExists) return;
        
        const updated = [...watchlist, item];
        localStorage.setItem("watchlist", JSON.stringify(updated));
    };
    
    return (
    <div>
        <h1>{show.name}</h1>
        <img src={show.image?.medium} alt={show.name} />
        <p dangerouslySetInnerHTML={{ __html: show.summary }} />
        <button onClick={handleAdd}>Add To WatchList</button>
    </div>
);
};