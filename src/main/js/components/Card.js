import PropTypes from 'prop-types';

const React = require('react');

export default function Card({ title, actions, children }) {
    return (
        <section className='card'>
            <div className='head'>
                <h2>{title}</h2>
                {actions}
            </div>

            {children}
        </section>
    );
}

Card.propTypes = {
    title: PropTypes.node,
    actions: PropTypes.node,
    children: PropTypes.node,
};
