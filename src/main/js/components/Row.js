import PropTypes from 'prop-types';

const React = require('react');

export default function Row({ label, value }) {
    return (
        <div className='row'>
            <p className='field-label'>{label}</p>
            <p className='field'>{value}</p>
        </div>
    );
}

Row.propTypes = {
    label: PropTypes.node,
    value: PropTypes.node,
};
