import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../actions/authActions";

const SignUp = (props) => {
    const { auth } = props;
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        money: "",
        email: "",
        password: "",
        stocks: {
            0: { code: "FP", name: "Future Processing", price: "", unit: 0 },
            1: { code: "FPL", name: "FP Lab", price: "", unit: 0 },
            2: { code: "PGB", name: "Progress Bar", price: "", unit: 0 },
            3: { code: "FPC", name: "FP Coin", price: "", unit: 0 },
            4: { code: "FPA", name: "FP Adventure", price: "", unit: 0 },
            5: { code: "DL24", name: "Deadline 24", price: "", unit: 0 },
        }
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.signUp(form);
    };
    useEffect(() => {
        fetch("http://webtask.future-processing.com:8068/stocks")
            .then(res => res.json())
            .then(data => {
                Object.keys(data.items).map((index) => data.items[index].unit = 0);
                setForm({...form, stocks: data.items});
            })
            .catch(err => console.log(err));
    }, []);
    if (auth.uid) return <Redirect to="/" />;
    return (
        <form className="container" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="input-field">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" onChange={handleChange} required />
            </div>
            <div className="input-field">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" onChange={handleChange} required />
            </div>
            <div className="input-field">
                <label htmlFor="money">Available money</label>
                <input type="number" id="money" onChange={handleChange} required />
            </div>
            <div className="input-field">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" onChange={handleChange} required/>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handleChange} required />
            </div>
            <button>Sign Up</button>
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
        signUp: (newUser) => dispatch(signUp(newUser))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);