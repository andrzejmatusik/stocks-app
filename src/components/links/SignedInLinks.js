import { NavLink } from "react-router-dom";
import { FiSettings, FiPower } from "react-icons/fi";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const SignedInLinks = (props) => {
    const { profile } = props;
    const handleClick = (e) => {
        e.preventDefault();
        props.signOut();
    }
    return (
        <ul className="right">
            <li><p className="hide-on-med-and-down">Logged in as {profile.firstName} {profile.lastName}</p></li>
            <li><NavLink to="/settings" className="icon"><FiSettings /></NavLink></li>
            <li><NavLink to="/" className="icon" onClick={handleClick}><FiPower /></NavLink></li>
        </ul>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);