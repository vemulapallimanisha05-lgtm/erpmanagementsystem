const loggedInUser =
JSON.parse(
    localStorage.getItem("loggedInUser")
);
if(!loggedInUser){
    window.location.href =
    "../../modules/users/login.html";
}
