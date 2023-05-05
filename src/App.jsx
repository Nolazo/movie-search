import './App.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import {Movies} from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch(){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if (search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar con un numero')
      return
    }

    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return {search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, sort})

  //useCallback es igual que useMemo pero para funciones
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({search})
    }, 350)
    ,[]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) =>{
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
          <form className='form' onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} name='query' placeholder='Avengers'/>
            <input type="checkbox" onChange={handleSort} checked={sort}/>
            <button>buscar</button>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies}/>
        }
      </main>
    </div>
  )
}

export default App
