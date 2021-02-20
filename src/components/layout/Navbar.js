import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import SignedInLinks from "../links/SignedInLinks";
import SignedOutLinks from "../links/SignedOutLinks";
import { connect } from "react-redux";

const Navbar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    return (
        <nav className="nav-wrapper">
            <div className="container">
                <Link to="/"><h1><img src={Logo} alt="" />Stocks Processing<span><strong>Great market</strong> because we put your wallet first</span></h1></Link>
                { auth.isLoaded && links }
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};
 
export default connect(mapStateToProps)(Navbar);