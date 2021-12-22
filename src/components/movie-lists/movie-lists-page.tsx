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
import { getMovieLists } from '../../services/movie-list-service';
import { getMoviesInList } from '../../services/movie-list-service';
import styles from './movie-lists-page.module.css';

function MovieListsPage() {
  const dispatch = useAppDispatch();
  const [showLoader, setShowLoader] = useState(false);
  const state = useAppSelector(state => state);
  const movieLists = state.movieLists.movieLists;
  const moviesInList = state.movieLists.moviesInList;
  const user = state.user.user;
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);
  // const movie = moviesInList.map;

  useEffect(() => {
    if (movieLists.length === 0) {
      setShowLoader(true);
      const gettingPosts = async () => {
        await getMovieLists(dispatch);
        setShowLoader(false);
      };
      gettingPosts();
    }
  }, [dispatch, movieLists]);

  if (!movieLists && showLoader === false) {
    navigate('/movielists');
  }

  if (showLoader)
    return (
      <Container className={styles.spinnerCenter}>
        <Spinner animation={'border'} />
      </Container>
    );

  return (
    <Container className="mt-5">
      {movieLists.map(movieList => (
        <Card className='mt-5' style={{ width: '100%' }} onClick={() => navigate('/movielists/'+movieList.id)}>
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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>
        </Card.Body>
      </Card>
      ))}
    </Container>
  );
}

export default MovieListsPage;
