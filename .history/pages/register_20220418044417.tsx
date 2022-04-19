import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/clientApp"

function SignUp() {
    const router = useRouter();

    const registerUser = async (event: any) => {
        event.preventDefault()
        const { email, password } = event.target.elements;
        // signInWithEmailAndPassword(auth, email.value, password.value)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         router.push('/');
        //     })
        //     .catch((error) => {
        //         console.log(error.code);
        //         console.log(error.message);
        //     });
        createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
  });
    }
    return (
        <main>
            <h1>what?</h1>
            <form onSubmit={registerUser} >
                <label htmlFor="email" > Email </label>
                <input id="email" name="email" type="text" autoComplete="email" required />
                <label htmlFor="password" > Password </label>
                <input id="password" name="password" type="text" autoComplete="password" required />
                <button type="submit" > Sign Up </button>
            </form>
        </main>
    )
}

export default SignUp;