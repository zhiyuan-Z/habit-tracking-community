// import { useRouter } from "next/router";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// function SignUp() {
//     const router = useRouter();

//     const registerUser = async (event: any) => {
//         event.preventDefault()
//         const { name, email, password } = event.target.elements;
//         const auth = getAuth();
//         signInWithEmailAndPassword(auth, email.value, password.value)
//             .then((userCredential) => {
//                 // Signed in 
//                 const user = userCredential.user;
//                 router.push('/');
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//             });

//         return (
//             <form onSubmit={registerUser} >
//                 <label htmlFor="name" > Name </label>
//                 <input id="name" name="name" type="text" autoComplete="name" required />
//                 <label htmlFor="email" > Email </label>
//                 <input id="email" name="email" type="text" autoComplete="email" required />
//                 <label htmlFor="password" > Name </label>
//                 <input id="password" name="password" type="text" autoComplete="password" required />
//                 <button type="submit" > Sign Up </button>
//             </form>
//         )
//     }
// }

// export default SignUp;
export {}