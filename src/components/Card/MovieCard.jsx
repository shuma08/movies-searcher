import React from "react";
import { Badge } from "@mui/material";
import "./styles.scss";

const MovieCard = ({value,changeMovie}) => {
	const selectMovie = () => {
		changeMovie(value)
		window.scroll(0,0)
	}

   return (
        <div className="card-container" onClick={selectMovie}>
            <div className="img-container">
							<Badge badgeContent={value.vote_average}  color={value.vote_average > 6 ? "primary" : "error"}/>
             	<img src={`${process.env.REACT_APP_IMG_PATH_300}${value.poster_path}`} alt="img"/>
            </div>
						<div className="title-container">
							<span className="title">{value.title}</span>
							<span>{value.release_date}</span>
						</div>
        </div>
   )  
}

export default MovieCard;