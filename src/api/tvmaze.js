import axios from "axios";
export async function searchShows(query) {
    if (!query.trim()) return [];
    const response = await axios.get(
    "https://api.tvmaze.com/search/shows?q=" + query
    );
    return response.data.map(item => item.show);
}