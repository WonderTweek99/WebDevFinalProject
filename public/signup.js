document.addEventListener("DOMContentLoaded", () => {
    const txtName = document.getElementById('txtName');
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const avatarImage = document.getElementById('avatarImage');

    const btnSubmit = document.getElementById('submit');
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        let name = txtName.value.trim();
        let email = txtEmail.value.trim();
        let password = txtPassword.value;

        if (name === '') { alert('Input your name'); return; }
        if (email === '') { alert('Input your email'); return; }
        if (password === '') { alert('Input your password'); return; }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        const files = avatarImage.files;
        formData.append('avatar', files[0])


        axios.post('http://localhost:8080/auth/create-account', formData)
            .then(response => {
                console.log(response);
                alert(`User registered successfully`);
            })
            .catch(error => {
                console.log("error:", error)
                alert(`Problem when inserting user ${error}`);
            });
    });
})
