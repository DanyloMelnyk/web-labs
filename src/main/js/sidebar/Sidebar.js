import Profile from './Profile';
import UserWallets from './UserWallets';

const React = require('react');

export default function Sidebar() {
    return (
        <aside>
            <Profile/>
            <UserWallets/>
        </aside>
    );
}
