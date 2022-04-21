import React from "react";
import { Badge } from "@mui/material";
import "./styles.scss";

const MovieCard = ({value}) => {

   return(
		 <>
        <div className="card-container">
            <div className="img-container">
						<Badge badgeContent={value.vote_average}  color={value.vote_average > 6 ? "primary" : "error"}/>

             <img src={`${process.env.REACT_APP_IMG_PATH_300}${value.poster_path}`} alt="img"/>
            </div>
						<div className="title-container">
							<span className="title">{value.title}</span>
							<span>{value.release_date}</span>
						</div>
        </div>
				{/* <Badge anchorOrigin={{vertical:"top", horizontal: "right"}} badgeContent={value.vote_average}  color={value.vote_average > 6 ? "primary" : "error"}/> */}
			</>
   )       
    
}

export default MovieCard;