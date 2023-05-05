import { useState, useRef, useMemo } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ search, sort }){
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const previousSearch = useRef(search)

	const getMovies = useMemo(() =>{
		return async ({search}) => {
			if(search === previousSearch.current) return
	
			try{
				setLoading(true)
				setError(null)
				previousSearch.current = search
				const newMovies = await searchMovies({search})
				setMovies(newMovies)
			}catch (e){
				setError(e.message)
			}finally{
				// esto se ejecuta en el try y en el catch
				setLoading(false)
			}
		}
	}, [search])

	// el useMemo se usa para evitar hacer calculos innecesarios, enm este caso aqui podrian haber 1000 PELICULAS RENDERIZANDOSE
	const sortedMovies = useMemo(() => {
		//localCompare es para comprar bien las letras con sus respectivos acentos
		return sort
		? [...movies].sort((a,b) => a.title.localeCompare(b.title))
		: movies
	}, [sort, movies])

	return {movies: sortedMovies, getMovies, loading}
}