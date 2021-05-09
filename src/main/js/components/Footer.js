const React = require('react');

function Footer({lab, date}) {
    return (
        <footer>
            <div className="footer-col">
                <p>
                    {lab} lab for Web technology and web design course.
                </p>
            </div>
            <div className="footer-col">
                <p>
                    <a className="link" href="https://github.com/DanyloMelnyk/web_labs">
                        <i className="fab fa-github"/> Sources
                    </a>
                </p>
                <p>
                    <a className="link" href="https://t.me/mel2danylo">
                        <i className="fab fa-telegram-plane"/> Danylo Melnyk&nbsp;
                    </a>
                    ©{date}
                </p>
            </div>
        </footer>
    );
}

export default Footer;