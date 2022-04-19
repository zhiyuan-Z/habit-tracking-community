// auth.tsx
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth, googleProvider } from "../firebase/clientApp";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// // Configure FirebaseUI.
// const uiConfig = {
//   // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//   signInSuccessUrl: "/why",
//   // GitHub as the only included Auth Provider.
//   // You could add and configure more here!
//   signInOptions: [GoogleAuthProvider.PROVIDER_ID],
// };

// function SignInScreen() {
//   return (
//     <div>
//       <h1>Pineapple Login</h1>
//       <p>Please sign-in:</p>
//       <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
//     </div>
//   );
// }

const googleHandler =async () => {
    signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

export default SignInScreen;