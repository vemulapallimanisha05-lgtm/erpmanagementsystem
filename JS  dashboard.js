const dashboardUser =
JSON.parse(localStorage.getItem("loggedInUser"));
if(!dashboardUser){
    window.location.href =
    "modules/users/login.html";
}
fetch("http://localhost:8080/api/users")
.then(res => res.json())
.then(data => {
    document.getElementById("userCount")
    .innerText = data.length;
});
fetch("http://localhost:8080/api/products")
.then(res => res.json())
.then(data => {
    document.getElementById("productCount")
    .innerText = data.length;
});
fetch("http://localhost:8080/api/suppliers")
.then(res => res.json())
.then(data => {
    document.getElementById("supplierCount")
    .innerText = data.length;
});
fetch("http://localhost:8080/api/inventory")
.then(res => res.json())
.then(data => {
    document.getElementById("inventoryCount")
    .innerText = data.length;
});
