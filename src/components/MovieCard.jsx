import React from "react";
import "./styles.scss";

const MovieCard = ({value}) => {

   return(
        <div className="card-container">
            <div className="img-container">
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