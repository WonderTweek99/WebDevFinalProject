document.addEventListener("DOMContentLoaded", () => {
    const txtName = document.getElementById('txtName');
    const txtPassword = document.getElementById('txtPassword');
    const avatarImage = document.getElementById('avatarImage');

    const btnSubmit = document.getElementById('submit');
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        let name = txtName.value.trim();
        let password = txtPassword.value;

        if (name === '') { alert('Input your name'); return; }
        if (password === '') { alert('Input your password'); return; }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        const files = avatarImage.files;
        formData.append('avatar', files[0])

        const data = {name, password, avatar: files[0]}

        const userId = localStorage.getItem("userId")
        if (!userId) {
            window.location.replace("login.html")
        }
        axios.patch(`http://localhost:8080/users/${userId}`, formData)
            .then(response => {
                console.log(response);
                console.log(formData)
                alert(`User updated successfully`);
            })
            .catch(error => {
                console.log("error:", error)
                alert(`Problem when updating user ${error}`);
            });
    });
})