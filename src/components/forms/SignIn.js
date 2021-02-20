import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../actions/authActions";

const SignIn = (props) => {
    const { auth } = props;
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signIn(form);
    };
    if (auth.uid) return <Redirect to="/" />;
    return (
        <form className="container" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <div className="input-field">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" onChange={handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange} />
            </div>
            <button>Sign In</button>
        </form>
    );
}
 
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);