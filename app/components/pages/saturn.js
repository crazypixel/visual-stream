import { connect } from 'react-redux';
import cx from 'classnames';
import io from 'socket.io-client';
import { addTweet } from 'actions/twitterActions';
import Scene from 'scene';
import SaturnExample from 'saturn';

const socket = io();

class Saturn extends React.Component {

    static get propTypes() {
        return {
            addTweet: React.PropTypes.func.isRequired
        };
    }

    constructor(props) {
        super(props);

        // SOCKET.IO
        let socket = io.connect('http://localhost:9000');
        this.state = {
          socket
        };
    }

    componentDidMount() {
        Scene.init(this.refs.placeholder);
        const saturnExample = new SaturnExample(Scene);
        saturnExample.prepScene();

        this.setState({
            scene: Scene,
            saturn: saturnExample
        });

        this.state.socket.on('tweet', (data) => {
            // SYNC REDUX
            this.props.addTweet(data);

            // SYNC THREE.js scene
            this.state.saturn.populateBox(data);
        });
    }

    render() {

        return (
            <div>
                <div className="three-container" ref="placeholder"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ tweets: state.toJS().twitter });

export default connect(mapStateToProps, { addTweet })(Saturn);
