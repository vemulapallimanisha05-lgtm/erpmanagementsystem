const SUPPLIER_API =
    "http://localhost:8080/api/suppliers";
let editSupplierId = null;
const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));
function saveSupplier() {
    const supplier = {
        supplierName:
            document.getElementById(
                "supplierName"
            ).value,
        email:
            document.getElementById(
                "email"
            ).value,
        phone:
            document.getElementById(
                "phone"
            ).value,
        address:
            document.getElementById(
                "address"
            ).value
    };
    let method = "POST";
    let url = SUPPLIER_API;
    if(editSupplierId !== null){
        method = "PUT";
        url =
        `${SUPPLIER_API}/${editSupplierId}`;
    }
    fetch(url,{
        method:method,
        headers:{
            "Content-Type":
            "application/json"
        },
        body:JSON.stringify(supplier)
    })
    .then(() => {
        loadSuppliers();
        clearSupplierForm();
        editSupplierId = null;
        document
            .getElementById("supplierBtn")
            .innerText =
            "Save Supplier";
    });
}
function loadSuppliers(){
    fetch(SUPPLIER_API)
    .then(res => res.json())
    .then(data => {
        let table =
        document.getElementById(
            "supplierTable"
        );
        table.innerHTML = "";
        data.forEach(supplier => {
            table.innerHTML += `
                <tr>
                    <td>
                        ${supplier.supplierId}
                    </td>
                    <td>
                        ${supplier.supplierName}
                    </td>
                    <td>
                        ${supplier.email}
                    </td>
                    <td>
                        ${supplier.phone}
                    </td>
                    <td>
                        ${supplier.address}
                    </td>
                    <td>
                        ${
currentUser &&
currentUser.role.toUpperCase() === "ADMIN"
?
`
<button onclick="editSupplier(${supplier.supplierId})">
Edit
</button>
<button onclick="deleteSupplier(${supplier.supplierId})">
Delete
</button>
`
:
`<span>View Only</span>`
}
                    </td>
                </tr>
            `;
        });
    });
}
if(
loggedInUser &&
loggedInUser.role.toUpperCase() !== "ADMIN"
)
{
document.getElementById(
"supplierForm"
).style.display="none";
}
function editSupplier(id){
    fetch(SUPPLIER_API)
    .then(res => res.json())
    .then(suppliers => {
        const supplier =
        suppliers.find(
            s => s.supplierId === id
        );
        document
        .getElementById(
            "supplierName"
        ).value =
        supplier.supplierName;
        document
        .getElementById(
            "email"
        ).value =
        supplier.email;
        document
        .getElementById(
            "phone"
        ).value =
        supplier.phone;
        document
        .getElementById(
            "address"
        ).value =
        supplier.address;
        editSupplierId = id;
        document
        .getElementById(
            "supplierBtn"
        ).innerText =
        "Update Supplier";
    });
}
function deleteSupplier(id){
    if(confirm(
        "Delete Supplier?"
    )){
        fetch(
            `${SUPPLIER_API}/${id}`,
            {
                method:"DELETE"
            }
        )
        .then(() => {
            loadSuppliers();
        });
    }
}
function clearSupplierForm(){
    document
    .getElementById(
        "supplierName"
    ).value = "";
    document
    .getElementById(
        "email"
    ).value = "";
    document
    .getElementById(
        "phone"
    ).value = "";
    document
    .getElementById(
        "address"
    ).value = "";
}
loadSuppliers();
