import { updateUser } from "../API/api.js";
import { deleteproduct, productapi } from "../API/productapi.js";
import { Logout } from "../components/helper.js";
import navbar from "../components/navbar.js";

document.getElementById("navbar").innerHTML = navbar();

const isLogin = localStorage.getItem("isLogin") || false;

if (!isLogin) {
    alert("Please login first");
    window.location.href = "pages/login.html";
}

const productary = await productapi.get();

const displayproduct = async(data) => {
    document.getElementById("display").innerHTML = "";
    data.forEach((e) => {
        const div = document.createElement("div");
        const productName = document.createElement("p");
        const price = document.createElement("p");
        const image = document.createElement("img");
        const remove = document.createElement("button");
        const change = document.createElement("button");
        const addcart = document.createElement("button");

        remove.addEventListener("click", () => deleteproduct(e.id));
        addcart.addEventListener("click", () => addtocart(e));

        productName.innerText = e.productName;
        price.innerText = `Price: $${e.price}`;
        image.src = e.image;
        remove.innerText = "Delete";
        change.innerText = "Update";
        addcart.innerText = "Add to Cart";

        div.append(image, productName, price, remove, addcart);
        document.getElementById("display").append(div);
    });
};

const addtocart = async (elem) => {
    let userId = JSON.parse(localStorage.getItem("userId"));
    await productapi.get(`/user/${userId}`);
    

    let existproduct = false;

    data.cart.map((e) => {
        if (e.id === elem.id) {
            e.qty++;
            existproduct = true;
        }
    });

    if (!existproduct) {
        data.cart.push({ ...elem, qty: 1 });
    }

    await  updateUser.PATCH(`/user/${userId}`);
};
const filterCategory = () => {
    const categoryValue = document.getElementById("category").value.toLowerCase();
  
    const resultCategory = productData.filter(
      (product) => product.category.toLowerCase() === categoryValue
    );
  
    displayproduct(resultCategory);
  };
  
  document.getElementById("Filter").addEventListener("click", filterCategory);
  
  const sortProduct = () => {
    const sortValue = document.getElementById("sort").value;

    if (sortValue === "LTH") {
        productary.sort((a, b) => a.price - b.price);
    } else if (sortValue === "HTL") {
        productary.sort((a, b) => b.price - a.price);
    }

    displayproduct(productary);
};

document.getElementById("Sort").addEventListener("click", sortProduct);

// Refresh Product List
const refreshProducts = async () => {
    const updatedProducts = await productapi.get();
    displayproduct(updatedProducts);
};
Logout();
displayproduct(productary);


