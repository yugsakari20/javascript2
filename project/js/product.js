import getValue, { createTag } from "../components/helper.js";
import Navbar from "../components/navbar.js";


document.getElementById("navbar").innerHTML = Navbar()

let products = JSON.parse(localStorage.getItem("products")) || [];

const mapper = (data) => {
    document.getElementById("productList").innerHTML = "";
    data.map((ele) => {
        let img = createTag("img", ele.img);
        let price = createTag("p", ele.price);
        let title = createTag("h3", ele.title);
        let category = createTag("p", ele.category);
        let buyBtn = createTag("button", "Buy");
        buyBtn.addEventListener("click", () => handleCart(ele))
        let div = document.createElement("div");
        div.append(img, title, price, category, buyBtn);
        document.getElementById("productList").append(div);
    });
};

mapper(products);

const handleSort = (orderBy) => {
    if (orderBy == "lth") {
        let temp = products.sort((a, b) => a.price - b.price);
        mapper(temp);
    } else {
        let temp = products.sort((a, b) => b.price - a.price);
        mapper(temp);
    }
};

const handleCategory = (category) => {
    let temp = products.filter((ele) => ele.category == category);
    mapper(temp);
};
document
    .getElementById("lth")
    .addEventListener("click", () => handleSort("lth"));
document
    .getElementById("htl")
    .addEventListener("click", () => handleSort("htl"));

document
    .getElementById("men")
    .addEventListener("click", () => handleCategory("men"));
document
    .getElementById("fashion")
    .addEventListener("click", () => handleCategory("fashion"));

document
    .getElementById("electronics")
    .addEventListener("click", () => handleCategory("electronics"));

document
    .getElementById("Home Appliances")
    .addEventListener("click", () => handleCategory("Home Appliances"));

    const search = (e) => {
        e.preventDefault();
    
        let searchValue = getValue("#search");
        let temp = products.filter((ele) => ele.title.toLowerCase().includes(searchValue.toLowerCase()));
        mapper(temp);
    
    };
    
    document.getElementById("searching").addEventListener("submit", search);