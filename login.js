function login() {

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (!user) {
        alert("Incorrect email or password.");
        return;
    }

    // Save the logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");

    // Check this user's pregnancy data
    const userLmp = localStorage.getItem("lmp_" + user.email);

    if (userLmp) {

        localStorage.setItem("lmpDate", userLmp);

        window.location.href = "weekly.html";

    } else {

        window.location.href = "pregnancy.html";
    }
}
function forgotPassword() {

    const email = prompt("Enter your registered email:");

    if (!email) {
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(function(user) {
        return user.email === email.trim().toLowerCase();
    });

    if (userIndex === -1) {
        alert("No account found with this email.");
        return;
    }

    const newPassword = prompt("Enter your new password:");

    if (!newPassword) {
        return;
    }

    users[userIndex].password = newPassword;

    localStorage.setItem("users", JSON.stringify(users));

    alert("Password reset successfully! 🔐");
}