import './App.css'
import responseMovies from './mocks/with-results.json'
import noResults from './mocks/no-results.json'
import {Movies} from './components/Movies'

function App() {
  const movies = responseMovies.Search

  return (
    <div className='page'>
      <header>
        <div>
          <form action="">
            <input placeholder='Avengers' />
            <button>buscar</button>
          </form>
        </div>
      </header>

      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
