import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';

const React = require('react');

export default function PageWithSidebar({ children }) {
    return (
        <div>
            <main>
                {children}
            </main>
            <Sidebar/>
        </div>
    );
}

PageWithSidebar.propTypes = {
    children: PropTypes.node.isRequired,
};
