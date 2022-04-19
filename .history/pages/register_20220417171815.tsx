function SignUp() {
    const registerUser = async (event: any) => {
        event.preventDefault()

        const res = await fetch(
            'https://hooks.zapier.com/hooks/catch/123456/abcde',
            {
                body: JSON.stringify({
                    name: event.target.name.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json()
        // result.user => 'Ada Lovelace'
    }

    return (
        <form onSubmit= { registerUser } >
            <label htmlFor="name" > Name </label>
            < input id = "name" name = "name" type = "text" autoComplete = "name" required />
            <button type="submit" > Register </button>
        </form>
    )
}

export default SignUp;