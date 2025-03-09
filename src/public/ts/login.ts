const loginForm = document.getElementById("login-form") as HTMLFormElement;
const errorDiv = document.querySelector(".error") as HTMLDivElement;
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email_phone = formData.get("email_phone") as string;
    const password = formData.get("password") as string;
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email_phone, password }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok && data.user === "admin") {
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
