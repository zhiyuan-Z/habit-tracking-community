import React from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/clientApp";

interface userData {
    email: { value: string };
    password: { value: string };
}

const SignIn = () => {
    const router = useRouter();

    const emailSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { email, password } = event.target as typeof event.target & userData;
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                console.log('Signed In');
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
            <form onSubmit={SignIn} >
                <label htmlFor="email" > Email </label>
                <input id="email" name="email" type="text" autoComplete="email" required />
                <label htmlFor="password" > Password </label>
                <input id="password" name="password" type="text" autoComplete="password" required />
                <button type="submit" > Sign Up </button>
            </form>
        </main>
    )
}

export default SignIn;