import axios from "axios";
export async function searchShows(query) {
    if (!query.trim()) return [];
    const response = await axios.get(
    "https://api.tvmaze.com/search/shows?q=" + query
    );
    return response.data.map(item => item.show);
}

export async function getShow(id) {
const response = await axios.get(
    "https://api.tvmaze.com/shows/" + id
);

return response.data;
}