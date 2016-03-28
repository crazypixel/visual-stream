class Content extends React.Component {

    static get propTypes() {
        return {
            children: React.PropTypes.object
        };
    }

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="content">
                { this.props.children && React.cloneElement(this.props.children, {})
                }
            </div>
        );
    }
}

export default Content;
