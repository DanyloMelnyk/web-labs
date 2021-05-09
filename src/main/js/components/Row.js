const React = require('react');

export default function Row({label, value}) {
    return (
        <div className='row'>
            <p className='field-label'>{label}</p>
            <p className='field'>{value}</p>
        </div>
    )
}