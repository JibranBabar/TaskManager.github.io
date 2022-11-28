function signIn() {
    fetch("http://localhost:3000/auth/google")
    .then(res=>res.json())
    .then((data) => window.location.href = "./index.html")
    .catch(err => console.log(err));
}

