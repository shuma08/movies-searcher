import { useEffect, useState } from 'react';
import axios from 'axios';
import MoviePage from './pages/MoviePage';
import './App.scss';

function App() {

  return (
    <div className="App">
     <MoviePage />
    </div>
  );
}

export default App;
