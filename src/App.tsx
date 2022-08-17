import React, { useEffect, useState } from 'react';
import './App.css';
import omdbAPI from './utils/omdbAPI';
import { Movie, MovieDetail } from './utils/MovieInterface';
import Modal from './components/Modal';
import Detail from './components/Detail';
import Card from './components/Card';
import SnackBar from './components/SnackBar';


function App() {
  const [inputValue, setInputValue] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail>()
  const [Msg, setMsg] = useState('')
  const [showDetail, setShowDetail] = useState(false)
  const [page, setPage] = useState(1)
  const [secs, setSecs] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(-1)

  useEffect(() => {
    const timer = setInterval(() => {
      setSecs(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setPage(1)
    setMovies([])
    if (inputValue.trim()) {
      getMovieList(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  const getMovieList = async (page: number) => {
    try {
      setMsg("Loading...") // Set loading before sending API request
      const res = await omdbAPI.search(inputValue, page);
      setMsg("")
      setMovies(res)
    } catch (error) {
      let msg = 'something went wrong :('
      setMsg("") // Stop loading in case of error
      if (error instanceof Error) {
        msg = (error.message);
      } else if (typeof (error) === 'string') {
        msg = (error)
      }
      setMsg(msg)
    }
  };

  const nextPage = async () => {
    if (inputValue) {
      try {
        setMsg("Loading...") // Set loading before sending API request
        const res = await omdbAPI.search(inputValue, page + 1);
        setMovies([...movies, ...res])
        setMsg("")
        setPage(page + 1)
      } catch (error) {
        let msg = 'something went wrong :('
        if (error instanceof Error) {
          msg = (error.message);
        } else if (typeof (error) === 'string') {
          msg = (error)
        }
        setMsg(msg)
      }
    }
  }


  const handleSeachbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const closeDetail = () => setShowDetail(false)

  const selectMovie = async (idx: number) => {
    if (idx >= 0 && idx < movies.length) {
      try {
        setMsg("Loading...")
        const res = await omdbAPI.get(movies[idx].imdbID);
        setSelectedIdx(idx)
        setSelectedMovie(res)
        setShowDetail(true)
        setMsg("")
      } catch (error) {
        let msg = 'something went wrong :('
        if (error instanceof Error) {
          msg = (error.message);
        } else if (typeof (error) === 'string') {
          msg = (error)
        }
        setMsg(msg)
      }
    }
  }

  return (
    <div className="App">
      <SnackBar
        show={!!Msg}>
        <p>{Msg}</p>
      </SnackBar>
      <h3 className="timer">Time you have spent: {secs}s</h3>
      <div className="container">

        {selectedMovie && <Modal
          show={showDetail}
          onClose={closeDetail}>

          <button className="btn btn__small"
            onClick={closeDetail}
          >
            X Close
          </button>
          <button className="btn btn__small"
            onClick={() => selectMovie(selectedIdx - 1)}
            disabled={selectedIdx <= 0}
          >
            &lt; Previous
          </button>
          <button className="btn btn__small"
            onClick={() => selectMovie(selectedIdx + 1)}
            disabled={selectedIdx >= movies.length - 1}
          >
            Next &gt;
          </button>

          <Detail
            movie={selectedMovie} />
        </Modal>}

        <h1>OMDB</h1>

        <div className="searchbar">
          <input type="text"
            className="input"
            onChange={handleSeachbarChange}
            value={inputValue}
            autoFocus
          />
        </div>

        <div className="results">
          {/* {movies.map((movie, i) =>
            <div key={movie.imdbID}>
              <Card movie={movie}
                selectedIdx={i}
                selectMovie={selectMovie} />
            </div>
          )} */}
          <table>
            {movies.map((movie, i) =>
              <tr>
                <th>{movie.Title}</th>
                <th>{movie.Type}</th>
                <th>{movie.Year}</th>
              </tr>
            )}
          </table>
        </div>

        {movies.length > 9 && <button className="btn"
          onClick={nextPage}>
          More
        </button>}

        {inputValue === "" && <p>📽Start by typing a movie title...</p>}
      </div>
      <footer>
      </footer>
    </div >
  );
}

export default App;
