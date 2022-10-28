import React from 'react';
import './card-list.css';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card';

const CardList = ({ movieDataFromBase, guestSessionId }) => (
    <div className="card-list">
        <MovieCard movieDataFromBase={movieDataFromBase} guestSessionId={guestSessionId} />
    </div>
);

CardList.defaultProps = {
    movieDataFromBase: [],
    guestSessionId: '',
};

CardList.propTypes = {
    movieDataFromBase: PropTypes.instanceOf(Array),
    guestSessionId: PropTypes.string,
};

export default CardList;