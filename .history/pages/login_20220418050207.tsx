import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/clientApp";

const SignIn = () => {
    const router = useRouter();

    const emailSignIn = async (event: any) => {
        event.preventDefault()
        const { email, password } = event.target.elements;
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.back();
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
            <h1>Log In</h1>
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

