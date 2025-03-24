const deleteBtns = document.querySelectorAll(".deleteBtn");

deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const collection = e.target.dataset.collection;
        console.log(id);
        console.log(collection);
        const response = await removeProduct(id, collection);
        console.log(response);
        location.reload();

        console.error(error);
    });
});
const removeProduct = async (id, collection) => {
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
};
