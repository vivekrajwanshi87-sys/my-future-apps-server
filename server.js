const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Password check
    if (password !== confirmPassword) {
        alert("Password और Confirm Password अलग हैं!");
        return;
    }

    // Name से पहले 3 letters
    let namePart = fullName
        .replace(/\s+/g, "")
        .substring(0, 3)
        .toUpperCase();

    // अगर नाम 3 letters से छोटा है
    while (namePart.length < 3) {
        namePart += "X";
    }

    // Random 5 digit number
    const randomNumber =
        Math.floor(10000 + Math.random() * 90000);

    // Automatic User ID
    const userId = namePart + randomNumber;

    try {

        // Server को user data भेजना
        const response = await fetch(
            "https://my-future-apps-server.onrender.com/api/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    fullName: fullName,
                    mobile: mobile,
                    email: email
                })
            }
        );

        const result = await response.json();

        if (!result.success) {
            alert(result.message || "Signup failed!");
            return;
        }

        // User data save
        localStorage.setItem("userId", userId);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        // Login status
        localStorage.setItem("isLoggedIn", "true");

        alert(
            "Account successfully created!\n\nYour User ID: " +
            userId
        );

        // Home page पर भेजें
        window.location.href = "home.html";

    } catch (error) {

        console.error(error);

        alert(
            "Server से connection नहीं हो पाया।\n" +
            "Internet connection check करें।"
        );
    }
});
