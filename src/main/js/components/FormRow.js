import PropTypes from 'prop-types';

const React = require('react');

export default function FormRow({
    label, inputId, children, ...rest
}) {
    return (
        <div className='row'>
            <label htmlFor={inputId}>{label}</label>
            {!children
                ? <input id={inputId} {...rest}/>
                : children}
        </div>
    );
}

FormRow.propTypes = {
    label: PropTypes.string,
    inputId: PropTypes.string,
    children: PropTypes.node,
};
