const currentUser =
JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location.href =
    "../../modules/users/login.html";
}
