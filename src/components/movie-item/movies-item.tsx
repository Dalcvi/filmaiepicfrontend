import React, { useEffect } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Movie } from '../../services/imdb-api';

export function MovieItem({ movie }: { movie: Movie }) {
  return (
    <>
      <Row className="mt-5 mb-2">
        <Col xs={9} sm={10}>
          <h2 className="text-left">{movie.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={3} sm={3} md={3} lg={2}>
          <Image src={movie.image} height={200} width={150} />
        </Col>
        <Col xs={9} sm={9} md={9} lg={10}>
          <p>{`Rating: ${movie.imDbRating} / 10`}</p>
          <p>{`Total votes on IMDb: ${movie.imDbRatingCount}`}</p>
          <p>{`Year made: ${movie.year}`}</p>
          <p>{`Crew: ${movie.crew}`}</p>
        </Col>
      </Row>
    </>
  );
}
