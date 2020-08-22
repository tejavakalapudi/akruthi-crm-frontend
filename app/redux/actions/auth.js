import * as types from '../../constants/actionTypes';
import copyToClipboard from '../../utils/copyToClipboard';
import firebaseAuth from "../../firebase";

const setAuth = (isAuthorized, user) => ({
    type: types.SET_AUTH,
    isAuthorized,
    user
});

// example of a thunk using the redux-thunk middleware
const initAuth = userName => dispatch =>
    firebaseAuth
    .signInWithEmailAndPassword(`${userName}@example.com`, "secretPassword")
        .then(async () => {
            // TODO: Delete below copy logic later in the time
            const token = await firebaseAuth.currentUser.getIdToken();
            copyToClipboard(token);
            dispatch(setAuth(true));
        }).catch((e) => {
            dispatch(setAuth(false));
            console.log("Auth Failed", e);
        });

export default { initAuth };