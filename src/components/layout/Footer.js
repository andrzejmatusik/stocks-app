import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const Footer = (props) => {
    const { auth } = props;
    const handleClick = (e) => {
        e.preventDefault();
        props.signOut();
    }
    const links = auth.uid ? (
        <ul>
            <li><NavLink to="/settings">Settings</NavLink></li>
            <li><NavLink to="/" className="icon" onClick={handleClick}>Sign Out</NavLink></li>
        </ul>
    ) : (
        <ul>
            <li><NavLink to="/signup" className="anchor">Sign Up</NavLink></li>
            <li><NavLink to="/signin" className="anchor">Sign In</NavLink></li>
        </ul>
    );
    return (
        <footer>
            <section className="links">
                <div className="container">
                    <h3>Menu</h3>
                    { auth.isLoaded && links }
                </div>
            </section>
            <section className="copyrights">
                <div className="container">
                    <p><strong>Stocks Processing</strong>. Great market because we put your wallet first.</p>
                </div>
            </section>
        </footer>
    );
}
 
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Footer);