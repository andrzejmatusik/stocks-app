import firebase from "firebase";

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((res) => {
            return firestore.collection("users").doc(res.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                money: parseFloat(newUser.money),
                stocks: newUser.stocks
            });
        }).then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" });
        }).catch((err) => {
            dispatch({ type: "SIGNUP_ERROR", err });
        });
    };
};

export const signIn = (credentials) => {
    return (dispatch, getState) => {
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: "LOGIN_SUCCESS" });
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err });
        });
    };
};

export const signOut = () => {
    return (dispatch, getState) => {
        firebase.auth().signOut().then(() => {
            dispatch({ type: "LOGOUT_SUCCESS" });
        });
    };
};

export const updateMoney = (auth, profile) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firebase.auth().currentUser.updateProfile({
            ...profile
        })
        .then(() => {
            return firestore.collection("users").doc(auth.uid).set({
                ...profile,
                money: parseFloat(profile.money)
            });
        }).then(() => {
            dispatch({ type: "UPDATE_SUCCESS" });
        }).catch((err) => {
            dispatch({ type: "UPDATE_ERROR", err });
        });
    };
};
export const updateUser = (auth, profile, form) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        firebase.auth().currentUser.updateProfile({
            ...profile
        })
        .then(() => {
            return firestore.collection("users").doc(auth.uid).set({
                ...profile,
                firstName: form.firstName,
                lastName: form.lastName,
                money: Number(parseFloat(profile.money + Number(form.money)).toFixed(2)),
            });
        }).then(() => {
            dispatch({ type: "UPDATE_SUCCESS" });
        }).catch((err) => {
            dispatch({ type: "UPDATE_ERROR", err });
        });
    };
};
