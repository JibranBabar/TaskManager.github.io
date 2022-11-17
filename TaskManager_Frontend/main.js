function signIn() {
    fetch("http://localhost:3000/auth/google", {
        method: "GET",
        body: JSON.stringify(),
        
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then((data) => window.location.href = "./auth_profile.html");
}