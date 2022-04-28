import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/Card/MovieCard';
import YouTube from 'react-youtube';
// import ReactPlayer from 'react-player/youtube'
import CustomPagination from '../components/Pagination/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {TextField, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "./styles.scss";


function MoviePage() {
  const [page,setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState({});
  const [search,setSearch] = useState('');


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
		setSelectedMovie(results[0])
    console.log(results)
  }

  const featchMovie = async (id) => {
    const {data} = await axios.get(`${baseUrl}/movie/${id}`,{
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: "videos"
      }
    })
  //   if (data.videos && data.videos.results) {
  //     const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
  //     setTrailer(trailer ? trailer : data.videos.results[0])
  // }
    return data
  }
  useEffect(()=>{
    featchMovies()
  },[page])
  const hendleSearch = (e) => {
    e.preventDefault()
    featchMovies(search)
    
  }

  const selectMovie = async (value) => {
    const data = await featchMovie(value.id)
    console.log("value",data)
    setSelectedMovie(data)
  }
  
  // const renderTrailer = () => {

  //   const trailer = selectedMovie.videos.results.find(vid => vid.name === "Official Trailer")
  //   return (
  //     <YouTube 
  //     videoId={trailer.key}
  //     />
  //   )
  // }

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
    <header>
      Hedear
     
      <YouTube
      
      />
      {/* <ReactPlayer /> */}
    </header>
    <div className='banner'style={{backgroundImage:`url(${process.env.REACT_APP_IMG_PATH_ORIGINAL}${selectedMovie.backdrop_path})`}} >
      <div >
        {/* {selectedMovie ? renderTrailer() : null} */}
      <Button variant="text">Play Trailer</Button>
        <h1>{selectedMovie.title}</h1>
        {selectedMovie.overview ? <p> {selectedMovie.overview}</p> : null }
      </div>
    </div>
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
        return <MovieCard key={movie.id} value={movie} changeMovie={selectMovie}/>
      })}
  </div>
  <div className='pagination-container'>
      <CustomPagination  setPage={setPage}/>
  </div>
</>
  
  );
}

export default MoviePage;
