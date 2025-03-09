const loginForm = document.getElementById("login-form");
const errorDiv = document.querySelector(".error");
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email_phone = formData.get("email_phone");
    const password = formData.get("password");
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email_phone, password }),
        });
        const data = await response.json();
        console.log("1", data);
        console.log("2", data.user.role);
        console.log("3", data.token);
        if (response.ok && data.user.role === "admin") {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/admin";
        }
        if (!response.ok) {
            errorDiv.textContent = data.message;
        }
    } catch (error) {
        console.error(error);
    }
});
