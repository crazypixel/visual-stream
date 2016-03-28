import { connect } from 'react-redux';
import cx from 'classnames';
import io from 'socket.io-client';
import { addTweet } from 'actions/twitterActions';

import TWEEN from 'Tween';
import DAT from 'globe';


const socket = io();

class Globe extends React.Component {

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
            socket,
            data: [["",[] ]]
        };
    }

    globe() {
        const globe = DAT.Globe(this.refs.placeholder, {
            colorFn: function(label) {
                return new THREE.Color([
                    0xff0000,0xff0000][label]);
            }
        });

        this.setState({
            globe
        });

        TWEEN.start();
        globe.animate();
    }

    addPoint(long, lat) {

        this.state.data[0][1].push(long, lat,Math.random()*1)

        for (let i = 0; i < this.state.data.length; i++) {
            this.state.globe.addData(this.state.data[i][1], {format: 'magnitude', name: this.state.data[i][0]})
        }

        this.state.globe.createPoints();

    }

    componentDidMount() {
        // PREP EXAMPLE
        this.globe();

        this.state.socket.on('tweet', (data) => {
            // SYNC REDUX
            // this.props.addTweet(data);

            // SYNC THREE.js scene
            // this.state.globe.populateCord(data);
            //if (data.geo !== null) {
            //    this.addPoint(data.geo.coordinates[0], data.geo.coordinates[1]);
            //}
            if (data.geo !== null) {
                console.log(data);
                this.addPoint(data.geo.coordinates[0], data.geo.coordinates[1]);
                console.log(data.place.full_name);
            }

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

export default connect(mapStateToProps, { addTweet })(Globe);
