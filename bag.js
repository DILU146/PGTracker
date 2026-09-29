const checkboxes = document.querySelectorAll(
    ".hospital-item input[type='checkbox']"
);

checkboxes.forEach(function(checkbox, index) {

    const saved = localStorage.getItem("hospitalItem" + index);

    if (saved === "true") {
        checkbox.checked = true;
    }

    checkbox.addEventListener("change", function() {
        localStorage.setItem(
            "hospitalItem" + index,
            checkbox.checked
        );
    });

});
function clearChecklist() {

    const checkboxes = document.querySelectorAll(
        ".hospital-item input[type='checkbox']"
    );

    checkboxes.forEach(function(checkbox, index) {
        checkbox.checked = false;
        localStorage.removeItem("hospitalItem" + index);
    });
}