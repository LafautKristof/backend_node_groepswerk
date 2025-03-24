const deleteBtns = document.querySelectorAll("#deleteBtn");

deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const collection = e.target.dataset.collection;
        try {
            const response = await removeProduct(id, collection);
            location.reload();
        } catch (error) {
            console.error(error);
        }
    });
    const removeProduct = async (id, collection) => {
        try {
            console.log("id", id);
            console.log("collection", collection);
            const response = await fetch(
                `https://backend-node-groepswerk.onrender.com/${collection}/${id}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
});
