import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/clientApp"

function SignUp() {
    const router = useRouter();

    const registerUser = async (event: any) => {
        event.preventDefault()
        const { name, email, password } = event.target.elements;
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.push('/');
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }
    return (
        <main>
            <h1>what?</h1>
            <form onSubmit={registerUser} >
                <label htmlFor="name" > Name </label>
                <input id="name" name="name" type="text" autoComplete="name" required />
                <label htmlFor="email" > Email </label>
                <input id="email" name="email" type="text" autoComplete="email" required />
                <label htmlFor="password" > Name </label>
                <input id="password" name="password" type="text" autoComplete="password" required />
                <button type="submit" > Sign Up </button>
            </form>
        </main>
    )
}

export default SignUp;