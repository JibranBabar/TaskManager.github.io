function signIn() {
    fetch("http://localhost:3000/auth/google")
    .then(res=>res.json())
    .then(json=>console.log(json))
}