document.addEventListener("DOMContentLoaded", () => {
    let products = []
    const productContainer = document.getElementById("product-container")
    async function getAllProducts() {
        console.log("Getting all products tee hee xdxd wow")
        const { data } = await axios.get("/products", {
            withCredentials: true
          })
        products = data
        console.log("Got dis products", products)
        updateUI();
    }
    async function updateUI() {
        let userId = localStorage.getItem("userId")
        if (!userId) {
            window.location.replace("login.html")
        }
        else {
            console.log("Getting the user tee hee xdxd wow")
            const { data } = await axios.get(`/users/${userId}`)
            user = data
            console.log("Got dis user", user)
            if (user.role == "admin") {
                productContainer.textContent = ""
                products.forEach((product) => {
                    const card = document.createElement("div")
                    card.className = "card"
                    const cardHeader = document.createElement("div")
                    cardHeader.className = "card-header"
                    cardHeader.innerText = product.name
                    const cardBody = document.createElement("div")
                    cardBody.className = "card-body"
                    const cardBrand = document.createElement("p")
                    cardBrand.className = "card-text"
                    if (!product.brand) {
                        cardBrand.innerText = "Brand: Generic/None"
                    }
                    else { cardBrand.innerText = "Brand: " + product.brand }
                    const cardStock = document.createElement("p")
                    cardStock.className = "card-text"
                    cardStock.innerText = "Stock: " + product.stock
                    const cardPrice = document.createElement("p")
                    cardPrice.className = "card-text"
                    cardPrice.innerText = "$" + product.price
                    const cardEditButton = document.createElement("a")
                    cardEditButton.className = "btn btn-primary m-2"
                    cardEditButton.innerText = "Edit"
                    cardEditButton.href = `/edit.html?id=${product._id}`
                    const cardDeleteButton = document.createElement("a")
                    cardDeleteButton.className = "btn btn-danger m-2"
                    cardDeleteButton.innerText = "Delete"
                    cardDeleteButton.onclick = () => deleteProduct(product._id)
                    card.appendChild(cardHeader)
                    cardBody.appendChild(cardBrand)
                    cardBody.appendChild(cardStock)
                    cardBody.appendChild(cardPrice)
                    cardBody.appendChild(cardEditButton)
                    cardBody.appendChild(cardDeleteButton)
                    card.appendChild(cardBody)
                    productContainer.appendChild(card)
                })
            }
            else {
                productContainer.textContent = ""
                /* IT WILL WORK YOU FUCK
                let createButton = document.getElementById("newProduct")
                createButton.remove()*/
                products.forEach((product) => {
                    const card = document.createElement("div")
                    card.className = "card"
                    const cardHeader = document.createElement("div")
                    cardHeader.className = "card-header"
                    cardHeader.innerText = product.name
                    const cardBody = document.createElement("div")
                    cardBody.className = "card-body"
                    const cardBrand = document.createElement("p")
                    cardBrand.className = "card-text"
                    if (!product.brand) {
                        cardBrand.innerText = "Brand: Generic/None"
                    }
                    else { cardBrand.innerText = "Brand: " + product.brand }
                    const cardStock = document.createElement("p")
                    cardStock.className = "card-text"
                    cardStock.innerText = "Stock: " + product.stock
                    const cardPrice = document.createElement("p")
                    cardPrice.className = "card-text"
                    cardPrice.innerText = "$" + product.price
                    const cardBuyButton = document.createElement("a")
                    cardBuyButton.className = "btn btn-danger m-2"
                    cardBuyButton.innerText = "Buy"
                    cardBuyButton.onclick = () => buyProduct(product)
                    card.appendChild(cardHeader)
                    cardBody.appendChild(cardBrand)
                    cardBody.appendChild(cardStock)
                    cardBody.appendChild(cardPrice)
                    cardBody.appendChild(cardBuyButton)
                    card.appendChild(cardBody)
                    productContainer.appendChild(card)
                })
            }
        }

    }
    async function buyProduct(product) {
        let name = product.name
        let brand = product.brand
        let price = product.price
        let stock = String(Number(product.stock) - 1)

        console.log("Editing object with: ", { name, brand, stock, price })
        const requestLink = `${location.origin}/products/${product._id}`
        try {
            const response = await axios.patch(requestLink, { name, brand, stock, price }, {
                withCredentials: true
              })
            console.log(response)
            window.alert("Product Bought")
        }
        catch (error) {
            console.log(error)
        }
        getAllProducts();
    }
    async function deleteProduct(id) {
        await axios.delete(`/products/${id}`, {
            withCredentials: true
          })
        window.alert("Product Deleted")
        getAllProducts();
    }
    getAllProducts();

})

