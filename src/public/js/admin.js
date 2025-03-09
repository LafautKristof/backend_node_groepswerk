document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("#buttons-container button");
    const overviewDiv = document.getElementById("overview");
    const errorDiv = document.getElementById("error");

    function handleButtonClick(event) {
        const category = event.target.getAttribute("data-category");
        overviewDiv.innerHTML = "";
        errorDiv.textContent = "";

        let url;
        if (category === "Users") {
            url = "/api/users";
        } else {
            url = "/api/products/" + encodeURIComponent(category);
        }

        overviewDiv.textContent = "Loading...";

        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message || "Something went wrong");
                    });
                }
                return response.json();
            })
            .then((data) => {
                overviewDiv.innerHTML = "";
                if (Array.isArray(data) && data.length > 0) {
                    const ul = document.createElement("ul");
                    data.forEach((item) => {
                        const li = document.createElement("li");
                        li.textContent = item.name;
                        ul.appendChild(li);
                    });
                    overviewDiv.appendChild(ul);
                } else {
                    overviewDiv.textContent = "Geen data gevonden.";
                }
            })
            .catch((error) => {
                overviewDiv.innerHTML = "";
                errorDiv.textContent = error.message;
            });
    }

    buttons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });
});
