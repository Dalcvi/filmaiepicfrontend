import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  FloatingLabel,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Movie } from '../../services/imdb-api';
import { getMovie, getMovieLists, ListMovies } from '../../services/movie-list-service';
import { getMoviesInList } from '../../services/movie-list-service';
import styles from './movie-list-page.module.css';

function MovieListPage() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const state = useAppSelector(state => state);
  const moviesInList = state.movieLists.moviesInList;
  const params = useParams();
  const navigate = useNavigate();
  const movieList = state.movieLists.movieLists.find(movieList => movieList.id === Number(params.movieListId));
  console.log(movies, 'movies');

  useEffect(() => {
    if (movies.length > 0) return;
    // @ts-ignore
    const list = moviesInList[params.movieListId] as any[];
    if (list == undefined) return;
    // @ts-ignore
    list.listMovies.forEach(async (movieId) => {
      const movie = await getMovie(movieId.fkMovies);
      setMovies(movies => [...movies, movie]);
    });
  }, [state.movieLists.moviesInList]);
  
  useEffect(() => { 
    if (Object.keys(moviesInList).length === 0) {
      setShowLoader(true);
      const gettingMovieList = async () => {
        await getMoviesInList(dispatch, params.movieListId ?? '');
        setShowLoader(false);
      };
      gettingMovieList();
    }
  }, [dispatch, moviesInList]);

  if (!moviesInList && showLoader === false) {
    navigate('/movielists');
  }

  if (showLoader)
    return (
      <Container className={styles.spinnerCenter}>
        <Spinner animation={'border'} />
      </Container>
    );

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
  };

  return (
    <Container className="mt-5" onSubmit={e => onSubmit(e)}>
      <Button variant="dark" onClick={() => navigate('/movielists')}>
        Back
      </Button>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{movieList?.text}</span>
              <span>{movieList?.description}</span>
              <span>{movieList?.fkUsersName}</span>
            </div>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {new Date(movieList?.createdAt ?? '').toLocaleDateString()}
          </Card.Subtitle>
          {movies.map(movie => (
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              {/* @ts-ignore */}
              <Card.Title>{movie.name}</Card.Title>
              <Card.Text>
                {/* @ts-ignore */}
                {movie.description}
              </Card.Text>
            </Card.Body>
          </Card>
          ))}

        </Card.Body>

      </Card>
    </Container>
  );
}

export default MovieListPage;
