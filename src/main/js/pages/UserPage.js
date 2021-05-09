import Sidebar from "../sidebar/Sidebar";
import {deleteRequest, getRequest} from "../common";
import {UserContext} from "../UserContext";
import User from "../components/User";

const React = require('react');

export default class UserPage extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            user: null
        };
    }

    componentDidMount() {
        const {token} = this.context;
        getRequest(`user/${this.props.match.params.id}`, (data) => {
            this.setState({
                isLoaded: true,
                user: data
            });
        }, (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }, token);
    }

    render() {
        const deleteUser = (id) => {
            const {userId, logout, token} = this.context;

            deleteRequest(`user/${id}`, () => {
                if (id === userId) {
                    logout();
                } else {
                    history.push("/");
                }
            }, () => null, token);
        }

        const {error, isLoaded, user} = this.state;

        if (error) {
            return (
                <div>
                    <main>
                        <div className="row error">
                            {error}
                        </div>
                    </main>
                    <Sidebar/>
                </div>
            )
        } else if (!isLoaded) {
            return (
                <div>
                    <main>
                        <div className="row error">
                            Loading...
                        </div>
                    </main>
                    <Sidebar/>
                </div>
            )
        } else {
            return (
                <div>
                    <main>
                        <User user={user} deleteUser={deleteUser}/>
                    </main>
                    <Sidebar/>
                </div>
            );
        }
    }
}