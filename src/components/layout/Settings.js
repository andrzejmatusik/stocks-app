import { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { updateUser } from "../../actions/authActions";

const Settings = (props) => {
    const { auth, profile } = props;
    const [form, setForm] = useState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        money: profile.money
    });
    const history = useHistory();
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateUser(auth, profile, form);
        history.push("/");
    };
    if (!auth.uid) return <Redirect to="/signin" />
    return (
        <form className="container" onSubmit={handleSubmit}>
            <h2>Settings</h2>
            <div className="input-field">
                <label htmlFor="firstName">Change first name</label>
                <input type="text" id="firstName" onChange={handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="lastName">Change last name</label>
                <input type="text" id="lastName" onChange={handleChange} />
            </div>
            <div className="input-field">
                <label htmlFor="money">Add money</label>
                <input type="number" id="money" onChange={handleChange} />
            </div>
            <button>Update</button>
        </form>
    );
}
 
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (auth, profile, form) => dispatch(updateUser(auth, profile, form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);