const form = document.getElementById("pregnancyForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const lmpInput = document.getElementById("lmpDate");
    const result = document.getElementById("result");

    if (lmpInput.value === "") {
        result.textContent = "Please enter your LMP date.";
        return;
    }

    const lmpDate = new Date(lmpInput.value);

    // Calculate due date
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);

    // Calculate current pregnancy week
    const today = new Date();
    const difference = today - lmpDate;
    const daysPassed = Math.floor(difference / (1000 * 60 * 60 * 24));

    const currentWeek = Math.floor(daysPassed / 7) + 1;

    // Save LMP date
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));

localStorage.setItem("lmp_" + savedUser.email, lmpDate);
localStorage.setItem("lmpDate" , lmpDate);

    // Save current week
    localStorage.setItem("currentWeek", currentWeek);

    // Show result
    result.textContent =
        "Your estimated due date is " +
        dueDate.toLocaleDateString();

    // Go to weekly page
    setTimeout(function() {
        window.location.href = "weekly.html";
    }, 1000);
});