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
    
    return (
    <div>
        <h1>{show.name}</h1>
        <img src={show.image?.medium} alt={show.name} />
        <p dangerouslySetInnerHTML={{ __html: show.summary }} />
    </div>
);
};