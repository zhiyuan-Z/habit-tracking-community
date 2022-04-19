import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/clientApp'; // update path to your firestore config

const googleHandler = async () => {
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            // redux action? --> dispatch({ type: SET_USER, user });
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
};



// To sign out 
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/clientApp';

// signOut(auth)
//     .then(() => {
//         console.log('logged out');
//         navigate('/');
//     })
//     .catch((error) => {
//         console.log(error);
//     });

export default googleHandler;