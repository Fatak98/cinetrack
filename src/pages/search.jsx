import { useState } from "react";
import { searchShows } from "../api/tvmaze";
import { Link } from "react-router-dom";

const Search =()=>{
    const [shows,setShows] = useState([]);
    const [query,setQuery] = useState("");
    const handleChange=(e)=>{
        setQuery(e.target.value)
    };
    const handleSearch = async () => {
        const results = await searchShows(query);
        console.log(results); 
        setShows(results);
    };

    return (
        <div>
            <input value={query} onChange={handleChange} placeholder="search a show"/>
            <button onClick={handleSearch}>click</button>
            <ul>  
                {shows.map((show)=>(
                    <li key={show.id}><Link to={`/show/${show.id}`}>{show.name}</Link>
                    </li>
                ))}   
            </ul>
        </div>
    )
}

export {Search};