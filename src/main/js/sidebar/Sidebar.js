import Profile from "./Profile";
import UserWallets from "./UserWallets";

const React = require('react');

function Sidebar() {
    return (
        <aside>
            <Profile/>
            <UserWallets/>
        </aside>
    );
}

export default Sidebar;