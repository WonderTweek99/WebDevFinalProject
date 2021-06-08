document.addEventListener("DOMContentLoaded", () => {
    let creationForm = document.getElementById("creation-form")
    let inputName = document.getElementById("inputName")
    let inputBrand = document.getElementById("inputBrand")
    let inputStock = document.getElementById("inputStock")
    let inputPrice = document.getElementById("inputPrice")
    const URLParams = new URLSearchParams(location.search);
    const id = URLParams.get('id')
    if (!id) {
        location.assign("/")
    }
    let product = {}
    async function getProductByID(id) {
        try {
            const requestLink = `${location.origin}/products/${id}`
            const response = await axios.get(requestLink)
            product = response.data
            console.log("Got dis product", product)
            inputName.value = product.name
            inputBrand.value = product.brand ?? ""
            inputStock.value = product.stock
            inputPrice.value = product.price
        }
        catch {
            location.assign("/")
        }
    }

    creationForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        let name = inputName.value;
        let brand = inputBrand.value;
        let stock = inputStock.value;
        let price = inputPrice.value;
        console.log("Editing object with: ", { name, brand, stock, price })
        const requestLink = `${location.origin}/products/${id}`
        try {
            const response = await axios.patch(requestLink, { name, brand, stock, price }, {
                withCredentials: true
              })
            console.log(response)
            window.alert("Product Edited")
        }
        catch (error) {
            console.log(error)
        }
    })

    getProductByID(id);

})
