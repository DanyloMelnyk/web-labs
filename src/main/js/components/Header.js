import PropTypes from 'prop-types';

const React = require('react');

export default function Header({ text }) {
    return (
        <header>
            <h1>{text}</h1>
        </header>
    );
}

Header.propTypes = {
    text: PropTypes.string.isRequired,

};
