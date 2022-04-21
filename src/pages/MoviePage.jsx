import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/Card/MovieCard';
import CustomPagination from '../components/Pagination/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "./styles.scss";


function MoviePage() {
  const [page,setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [search,setSearch] = useState('')


  const baseUrl = "https://api.themoviedb.org/3"

  const featchMovies = async (search) => {
    const type = search ? "search" : "discover"
    const {data:{results}} = await axios.get(`${baseUrl}/${type}/movie`,{
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        query: search,
        page: page

      }
    })
    setMovies(results)
		console.log(results)
  }
  useEffect(()=>{
    featchMovies()
  },[page])
  const hendleSearch = (e) => {
    e.preventDefault()
    featchMovies(search)
    
  }
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: '#ffff'
      },
      text: {
        primary: '#ffff'
      },
      divider: '#ffff'
    },
    action: {
      active: '#ffff'
    }
  });
  return (
    <>
    <ThemeProvider theme={outerTheme}>
      <div>
       <TextField
        id="standard-basic" 
        label="Search" 
        variant="standard" 
        onChange={(e)=>setSearch(e.target.value)}
        color='primary'
        />
        <IconButton  
        aria-label="upload picture" 
        component="span"
        onClick={hendleSearch}
        color='primary'
        >
         <SearchIcon color='primary' />
        </IconButton>
    </div>
    </ThemeProvider>
    <div className='content-container'>
   
				{movies && movies.map(movie=> {
        return <MovieCard key={movie.id} value={movie}/>
      })}
  </div>
  <div className='pagination-container'>
      <CustomPagination  setPage={setPage}/>
  </div>
</>
  
  );
}

export default MoviePage;
