class Root extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open : true
        }
    }

    render() {
        return (
            <div className="container">
                { this.props.children && React.cloneElement(this.props.children, {}) }
            </div>
        );
    }
}

export default Root;
