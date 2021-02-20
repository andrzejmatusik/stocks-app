import { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { updateMoney } from "../../actions/authActions";

const Prices = (props) => {
    const { auth, profile } = props;
    const [stocks, setStocks] = useState([]);
    const [date, setDate] = useState();
    const handleClick = (e) => {
        const index = e.target.attributes.index.value;
        const amount = e.target.parentNode.parentNode.childNodes[1].childNodes[0].value;
        const value = e.target.parentNode.parentNode.childNodes[2].textContent;
        if (amount > 0 && amount <= stocks[index].unit - profile.stocks[index].unit) {
            if (window.confirm(`Are you sure you want to buy ${amount > 1 ? `${amount} stocks` : `${amount} stock`} of ${stocks[index].name}?`)) {
                profile.stocks[index].unit = Number(profile.stocks[index].unit) + Number(amount);
                profile.money = (Number(profile.money) - (Number(value)) * Number(amount)).toFixed(2);
                props.updateMoney(auth, profile);
            }
        } else if (amount > 0 && amount >= stocks[index].unit - profile.stocks[index].unit) {
            alert(`Hold on! The limit of ${stocks[index].code}'s stocks is ${stocks[index].unit} and you already have ${profile.stocks[index].unit}. You can buy ${stocks[index].unit - profile.stocks[index].unit == 0 ? "no" : stocks[index].unit - profile.stocks[index].unit} more.`);
        } else {
            alert("Are you serious? You can't buy 0 stocks.");
        }
    };
    useEffect(() => {
        setInterval(function refreshStocks() { 
            fetch("/stocks")
            .then(res => res.json())
            .then(data => {
                setStocks([...data.items]);
                setDate(data.publicationDate);
            })
            .catch(err => console.log(err));
            return refreshStocks; 
        }(), 30000);
    }, []);
    return (
        <div className="prices">
            <h2>Stock prices <span>{moment(date).format("MMM Do YYYY, h:mm:ss a")}</span></h2>
            {stocks.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Amount</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stocks.map((stock, index) => (
                            <tr key={Math.random()}>
                                <td title={stock.name}>{stock.code}</td>
                                <td><input type="number" className="unit" placeholder={0} onChange={(e) => {
                                    if (e.target.value >= 0 && e.target.value <= stock.unit) {  
                                        return e.target.value;
                                    } else {
                                        e.target.value = 0;
                                    }
                                }} /> / {stock.unit}</td>
                                <td>{stock.price.toFixed(2)}</td>
                                <td><button onClick={handleClick} index={index}>Buy</button></td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Prices);
