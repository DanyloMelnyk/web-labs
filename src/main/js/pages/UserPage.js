import Sidebar from "../sidebar/Sidebar";

const React = require('react');

function UserPage(props) { // FIXME
    return ([
        <main>
            STATIC
            <br/>
            cur user id = {props.match.params.id}
            <section className='card'>
                <div className='head'>
                    <h2>mel2</h2>
                    <div className='actions'>
                        <a className='edit' href='edit-user.html'><i className='fas fa-edit'/></a>
                        <a className='delete' href='/user/ID/delete'><i className='fas fa-trash'/></a>
                    </div>
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
        </main>,
        <Sidebar/>
    ]);
}

export default UserPage;