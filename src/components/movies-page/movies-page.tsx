import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {
  getTopMovies,
  SearchedMovie,
  searchForMovie,
} from '../../services/imdb-api';
import { MovieItem } from '../movie-item';
import { SearchedMovieItem } from '../movie-item/searched-movie-item';
import styles from './movies-page.module.css';

type SetShownMoviesCount = (currentCount: number) => void;

const increaseShownMoviesCount = (
  setShownMoviesCount: SetShownMoviesCount,
  currentCount: number,
  max: number,
) => {
  if (currentCount + 20 > max) {
    setShownMoviesCount(max);
    return;
  }
  setShownMoviesCount(currentCount + 20);
};

export function MoviesPage() {
  const [shownMoviesCount, setShownMoviesCount] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [searchedMovies, setSearchedMovies] = useState<SearchedMovie[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoaderEnabled, setLoader] = useState(true);
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.movies.movies);
  useEffect(() => {
    setLoader(true);
    const func = async () => getTopMovies(dispatch);
    func().then(() => setLoader(false));
  }, [dispatch]);
  useEffect(() => {
    if (shownMoviesCount === 0 && movies.length !== 0) {
      increaseShownMoviesCount(
        setShownMoviesCount,
        shownMoviesCount,
        movies.length,
      );
    }
  }, [movies, shownMoviesCount]);

  const searchMovie = async () => {
    if (search.length < 3) {
      return;
    }
    setLoader(true);
    const foundMovies = await searchForMovie(search);
    setSearchedMovies(foundMovies);
    setSearchParams({ search });
    setShownMoviesCount(20);
    setLoader(false);
  };

  const showLoadMoreButton =
    shownMoviesCount !== movies.length && movies.length !== 0;
  if (isLoaderEnabled) {
    return (
      <Container>
        <div className={styles.spinnerCenter}>
          <Spinner animation="border" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <InputGroup className="mb-3 mt-5">
          <FormControl
            placeholder="Search by name"
            aria-label="search-by-name"
            aria-describedby="search-by-name"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => searchMovie()}
          >
            Search
          </Button>
        </InputGroup>
      </Row>
      {searchParams.get('search')
        ? searchedMovies.map(movie => <SearchedMovieItem movie={movie} />)
        : movies
            .slice(0, shownMoviesCount)
            .map(movie => <MovieItem movie={movie} />)}
      <Row className="mb-5 mt-5 justify-content-center">
        <Col xs="auto">
          {showLoadMoreButton && !searchParams.get('search') && (
            <Button
              variant="outline-dark"
              onClick={() =>
                increaseShownMoviesCount(
                  setShownMoviesCount,
                  shownMoviesCount,
                  movies.length,
                )
              }
            >
              Load More
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
