import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import {TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "./styles.scss";


function MoviePage() {
  const [movies, setMovies] = useState([])
  const [search,setSearch] = useState('')


  const baseUrl = "https://api.themoviedb.org/3"

  const featchMovies = async (search) => {
    const type = search ? "search" : "discover"
    const {data:{results}} = await axios.get(`${baseUrl}/${type}/movie`,{
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: search,
        pages: 30

      }
    })
    setMovies(results)
		console.log(results)
  }
  useEffect(()=>{
    featchMovies()
  },[])
  const hendleSearch = (e) => {
    e.preventDefault()
    featchMovies(search)
    
  }
  return (
    <>
      <div>
       <TextField
        id="standard-basic" 
        label="Standard" 
        variant="standard" 
        onChange={(e)=>setSearch(e.target.value)}
        />
        <IconButton  
        aria-label="upload picture" 
        component="span"
        onClick={hendleSearch}
        >
         <SearchIcon color='primary' />
        </IconButton>
    </div>
    <div className='content-container'>
   
				{movies && movies.map(movie=> {
        return <MovieCard key={movie.id} value={movie}/>
      })}
  </div>
     
</>
  
  );
}

export default MoviePage;
