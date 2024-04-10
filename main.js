document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitButton").addEventListener("click", function() {
        submitForm();
    });
});

function submitForm() {
    var fname = document.getElementById("fname").value;
    var gai = parseFloat(document.getElementById("gai").value);
    var ei = parseFloat(document.getElementById("ei").value);
    var age = document.getElementById("age").value;
    var ded = parseFloat(document.getElementById("ded").value);

    // Validation
    var isValid = true;
    var errorMessage = "";

    if (fname.trim() === "" || !isNaN(fname.trim())) {
        isValid = false;
        errorMessage = "Please enter your name in alphabets.";
    } else if (isNaN(gai) || gai < 0) {
        isValid = false;
        errorMessage = "Please enter a valid gross annual income in numeric format.";
    } else if (isNaN(ei) || ei < 0) {
        isValid = false;
        errorMessage = "Please enter a valid extra income in numeric format.";
    } else if (age === "") {
        isValid = false;
        errorMessage = "Please select your age group .";
    } else if (isNaN(ded) || ded < 0) {
        isValid = false;
        errorMessage = "Please enter a valid total applicable deduction in numeric format.";
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    // Calculate tax
    var totalIncome = gai + ei - ded;
    var tax = 0;

    if (totalIncome > 800000) {
        switch (age) {
            case "<40":
                tax = 0.30 * (totalIncome - 800000);
                break;
            case ">=40&<60":
                tax = 0.40 * (totalIncome - 800000);
                break;
            case ">=60":
                tax = 0.10 * (totalIncome - 800000);
                break;
            default:
                break;
        }
    }

    // Calculate overall income after tax deductions
    var overallIncome = totalIncome - tax;

   // Display result in the result box
    displayResult(overallIncome.toFixed(2));
}

function displayResult(result) {
    var fname = document.getElementById("fname").value;
    var resultBox = document.getElementById("resultBox");
    resultBox.textContent = fname+" your overall income after tax deductions is " + result + " Lakhs.";
    // Create a close button
    var closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", closeResultBox);

    // Append the close button to the result box
    resultBox.appendChild(closeButton);

    resultBox.style.display = "block"; // Show the result box
}

function closeResultBox() {
    var resultBox = document.getElementById("resultBox");
    resultBox.style.display = "none"; // Hide the result box
    // Remove the close button when result box is closed
    resultBox.removeChild(resultBox.lastChild);
}
