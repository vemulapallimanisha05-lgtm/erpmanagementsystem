let profileUser =
JSON.parse(
    localStorage.getItem("loggedInUser")
);
if(profileUser){
    const profileName =
    document.getElementById(
        "profileName"
    );
    const profileRole =
    document.getElementById(
        "profileRole"
    );
    if(profileName){
        profileName.innerText =
        profileUser.username;
    }
    if(profileRole){
        profileRole.innerText =
        profileUser.role;
    }
}
function logout(){
    const confirmLogout =
    confirm(
        "Are you sure you want to log out from the ERP Management System?"
    );
    if(confirmLogout){
        localStorage.removeItem(
            "loggedInUser"
        );
        window.location.href =
        "../../modules/users/login.html";
    }
}
