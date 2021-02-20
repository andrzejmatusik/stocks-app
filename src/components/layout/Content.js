import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Prices from "./Prices";
import Wallet from "./Wallet";

const Content = (props) => {
    const { auth } = props;
    if (!auth.uid) return <Redirect to="/signin" />
    return (
        <div className="content container">
            <div className="row">
                <div className="col s12 xl5">
                    <Prices />
                </div>
                <div className="col s12 xl7">
                    <Wallet />
                </div>
            </div>
        </div>
    );
}
 
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default connect(mapStateToProps)(Content);