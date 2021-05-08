import {Link} from 'react-router-dom';

const React = require('react');

function Profile() { // FIXME
    return (
        <section className='card'>
            STATIC
            <div className='head'>
                <h2>
                    <Link className='link' to='profile'>
                        My profile
                    </Link>
                </h2>
            </div>

            <div className='row'>
                <p className='field-label'>First name:</p>
                <p className='field'>Danylo</p>
            </div>
            <div className='row'>
                <p className='field-label'>Last name:</p>
                <p className='field'>Melnyk</p>
            </div>
            <div className='row'>
                <p className='field-label'>Email:</p>
                <p className='field'>dan@example.com</p>
            </div>
            <div className='row'>
                <p className='field-label'>Phone:</p>
                <p className='field'>+380-00-123-45-67</p>
            </div>
            <div className='row'>
                <p className='field-label'>Role:</p>
                <p className='field'>User</p>
            </div>
        </section>
    );
}

export default Profile;