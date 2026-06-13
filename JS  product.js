const PRODUCT_API = "http://localhost:8080/api/products";
let editProductId = null;
const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));
function saveProduct() {
    const product = {
        productName: document.getElementById("productName").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        reorderLevel: document.getElementById("reorderLevel").value
    };
    let method = "POST";
    let url = PRODUCT_API;
    if (editProductId !== null) {
        method = "PUT";
        url = `${PRODUCT_API}/${editProductId}`;
    }
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(() => {
        loadProducts();
        clearProductForm();
        editProductId = null;
        document.getElementById("productBtn").innerText = "Save Product";
    });
}
function loadProducts() {
    fetch(PRODUCT_API)
        .then(res => res.json())
        .then(products => {
            let table = document.getElementById("productTable");
            table.innerHTML = "";
            products.forEach(product => {
                table.innerHTML += `
                    <tr>
                        <td>${product.productId}</td>
                        <td>${product.productName}</td>
                        <td>${product.category}</td>
                        <td>${product.price}</td>
                        <td>${product.reorderLevel}</td>
                        <td>
                            ${
currentUser &&
currentUser.role.toUpperCase() === "ADMIN"
?
`
<button onclick="editProduct(${product.productId})">
Edit
</button>
<button onclick="deleteProduct(${product.productId})">
Delete
</button>`:`<span>View Only</span>`
}
                        </td>
                    </tr>`;
            });
        });
}
function editProduct(id) {
    fetch(PRODUCT_API)
        .then(res => res.json())
        .then(products => {
            const product = products.find(
                p => p.productId === id
            );
            document.getElementById("productName").value = product.productName;
            document.getElementById("category").value = product.category;
            document.getElementById("description").value = product.description;
            document.getElementById("price").value = product.price;
            document.getElementById("reorderLevel").value = product.reorderLevel;
            editProductId = id;
            document.getElementById("productBtn").innerText =
                "Update Product";
        });
}
function deleteProduct(id) {
    if (confirm("Delete Product ?")) {
        fetch(`${PRODUCT_API}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            loadProducts();
        });
    }
}
if(
loggedInUser &&
loggedInUser.role !== "Admin"
){
document.getElementById(
"productForm"
).style.display="none";
}
function clearProductForm() {
    document.getElementById("productName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("reorderLevel").value = "";
}
loadProducts();
