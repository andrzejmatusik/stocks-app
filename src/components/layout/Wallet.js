import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateMoney } from "../../actions/authActions";

const Wallet = (props) => {
    const { auth, profile } = props;
    const [wallet, setWallet] = useState([]);
    const handleClick = (e) => {
        const index = e.target.attributes.index.value;
        const amount = e.target.parentNode.parentNode.childNodes[2].childNodes[0].value;
        const value = e.target.parentNode.parentNode.childNodes[1].textContent;
        if (amount > 0) {
            if (window.confirm(`Are you sure you want to sell ${amount > 1 ? `${amount} stocks` : `${amount} stock`} of ${profile.stocks[index].name}?`)) {
                profile.stocks[index].unit = Number(profile.stocks[index].unit) - Number(amount);
                profile.money = (Number(profile.money) + (Number(value)) * Number(amount)).toFixed(2);
                props.updateMoney(auth, profile);
            }
        } else {
            alert("You are not allowed to perfom this action.");
        }
    };
    useEffect(() => {
        setInterval(function refreshStocks() { 
            fetch("/stocks")
            .then(res => res.json())
            .then(data => {
                setWallet([...data.items]);
            })
            .catch(err => console.log(err));
            return refreshStocks; 
        }(), 30000); 
    }, []);
    return (
        <div className="wallet">
            <h2>My wallet</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Unit price</th>
                        <th>Amount</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {wallet.length && profile.stocks ? (
                    Object.keys(profile.stocks).map((stock, index) => (
                        profile.stocks[stock].unit > 0 ? (
                            <tr key={Math.random()}>
                                <td title={profile.stocks[stock].name}>{profile.stocks[stock].code}</td>
                                <td>{wallet[stock].price.toFixed(2)}</td>
                                <td><input type="number" className="unit" placeholder={0} onChange={(e) => {
                                    if (e.target.value >= 0 && e.target.value <= profile.stocks[stock].unit) {  
                                        return e.target.value;
                                    } else {
                                        e.target.value = 0;
                                    }
                                }} /> / {profile.stocks[stock].unit}</td>
                                <td>{(wallet[stock].price * profile.stocks[stock].unit).toFixed(2)}</td>
                                <td><button onClick={handleClick} index={index}>Sell</button></td>
                            </tr>
                        ) : (
                            null
                        )
                    ))
                ) : (
                    null
                )}
                </tbody>
            </table>
            <table className="wallet__money">
                <thead>
                    <tr>
                        <th>Available money</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{profile.money} PLN</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
        updateMoney: (auth, profile) => dispatch(updateMoney(auth, profile))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
