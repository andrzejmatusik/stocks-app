import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/signup" className="anchor">Sign Up</NavLink></li>
            <li><NavLink to="/signin" className="anchor">Sign In</NavLink></li>
        </ul>
    );
}
 
export default SignedOutLinks;