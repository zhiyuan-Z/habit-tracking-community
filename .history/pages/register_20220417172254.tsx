import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    const registerUser = async (event: any) => {
        event.preventDefault()
        const {email, password} = event.target.elements;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

                const result = await res.json()
                // result.user => 'Ada Lovelace'
            }

    return (
        <form onSubmit={registerUser} >
            <label htmlFor="name" > Name </label>
            < input id="name" name="name" type="text" autoComplete="name" required />
            <button type="submit" > Register </button>
        </form>
    )
}

export default SignUp;