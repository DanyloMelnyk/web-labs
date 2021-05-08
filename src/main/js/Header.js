const React = require('react');

function Header({text}) {
    return (
        <header>
            <h1>{text}</h1>
        </header>
    );
}

export default Header;