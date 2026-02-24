import { useParams } from "react-router-dom";

export const ShowDetails = () => {
    const {id} = useParams();
    return(
        <div>
            <h1>SHOW ID : {id} </h1>
        </div>
    )
};