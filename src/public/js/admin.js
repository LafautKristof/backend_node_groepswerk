const deleteBtns = document.querySelectorAll("#deleteBtn");
const removeProduct = async (id) => {
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                await removeProduct(e.target.dataset.id);
                location.reload();
            });
        });
    } catch (error) {
        console.error(error);
    }
};
