import {Link} from "react-router-dom";
import Row from "./Row";

const React = require('react');

export default function User({user, deleteUser}) {
    return (
        <section className="card">
            <div className="head">
                <h2><Link to={"/user/" + user.id} className="link">{user.username}</Link></h2>
                <div className="actions">
                    <Link to={'/user/' + user.id + "/edit"} className='edit'>
                        <i className='fas fa-edit'/>
                    </Link>
                    <a onClick={() => deleteUser(user.id)} className="delete"><i className="fas fa-trash"/></a>
                </div>
            </div>

            <Row label='First name:' value={user.firstName}/>
            <Row label='Last name:' value={user.lastName}/>
            <Row label='Email:' value={user.email}/>
            <Row label='Phone:' value={user.phone}/>
            <Row label='Role:' value={user.role}/>
        </section>
    )
}