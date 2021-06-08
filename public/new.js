document.addEventListener("DOMContentLoaded", () => {
    let productForm = document.getElementById("creation-form")
    productForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        let name = document.getElementById("inputName").value;
        let brand = document.getElementById("inputBrand").value;
        let stock = document.getElementById("inputStock").value;
        let price = document.getElementById("inputPrice").value;
        console.log("Creating object with: ", {name, brand, stock, price})
        const requestLink = `${location.origin}/products`
        try {
            const response = await axios.post(requestLink, {name, brand, stock, price}, {
                withCredentials: true
              })
            console.log(response)
            window.alert("Product Created")
        }
        catch(error) {
            console.log(error)
        }
    })
})
