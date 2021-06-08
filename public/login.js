document.addEventListener("DOMContentLoaded", () => {
    const txtName = document.getElementById('txtName');
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const avatarImage = document.getElementById('avatarImage');

    const btnSubmit = document.getElementById('submit');
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        let email = txtEmail.value.trim();
        let password = txtPassword.value;

        if (email === '') { alert('Input your email'); return; }
        if (password === '') { alert('Input your password'); return; }

        const data = { email, password }

        axios.post('http://localhost:8080/auth/login', data, {
            withCredentials: true
          })
            .then(response => {
                console.log(response);
                window.localStorage.setItem("userId", response.data.userId)
                alert("User logged in successfully!")
                window.location.replace("/user.html");
            })
            .catch(error => {
                console.log("error:", error)
                alert(`Problem when login in ${error}`);
            });
    });
})
