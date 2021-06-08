document.addEventListener("DOMContentLoaded", () => {
    const txtName = document.getElementById('name');
    const txtEmail = document.getElementById('email');
    const avatarImage = document.getElementById('avatar');
    const deleteUserButton = document.getElementById("deleteUserButton")

    console.log("Getting the user tee hee xdxd wow")
    const userId = localStorage.getItem("userId")
    let user
    if (!userId) {
        window.location.replace("login.html")
    }
    async function getUser() {
        console.log("Getting the user tee hee xdxd wow")
        const { data } = await axios.get(`/users/${userId}`, {
            withCredentials: true
        })
        user = data
        console.log("Got dis user", user)
        updateUI();
    }
    async function deleteUser(id){
        await axios.delete(`/users/${id}`, {
            withCredentials: true
          })
        window.alert("User Deleted")
        window.location.replace("/login.html")
    }


    function updateUI() {
        txtName.innerText = user.name
        txtEmail.innerText = user.email
        let base64Image = btoa(String.fromCharCode(...user.avatar.data.data))
        avatarImage.src = `data:${user.avatar.contentType};base64,${base64Image}`
    }
    getUser()
    deleteUserButton.onclick = () => deleteUser(user._id)

})
