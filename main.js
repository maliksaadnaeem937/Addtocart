let shop = document.querySelector('#shop');


console.log(shop);
const getQuantity=(id)=>{
    console.log(typeof(id));
    let data = JSON.parse(localStorage.getItem("cart"));
    if(data===null){data=[]}
    let requiredObject = data.find((x) => {return x.ID == id});
    console.log(requiredObject);
    if (requiredObject) {
        return requiredObject.Qty;
    } else {
        return 0;
        // Return 0 if the item is not found in the cart
    }


}

let generateShop = () => {

    let finalResult = "";
    shopItemsData.forEach((element) => {
        let qty=getQuantity(element.id);
        finalResult = finalResult + `<div class="parent">
        <div class="item" id="${element.id}">
<img width="100%" src="images/${element.img}" alt="">
<div class="details">
    <h3>${element.name}</h3>
    <p>${element.desc}</p>
    <div class="price-quantity">
        <h2>$ ${element.price}</h2>
        <div class="button">
            <i class="bi bi-dash-lg" onclick="decrement(${element.id},'quantity-${element.id}')"></i>
            <div class="quantity" id="quantity-${element.id}">${qty ? qty: "0"}</div>
            <i class="bi bi-plus-lg" onclick="increment(${element.id},'quantity-${element.id}')"></i>
        </div>
    </div>
</div>

</div>
<div class="overlay "></div>
</div>
`


    })
    shop.innerHTML = finalResult;

};



generateShop();

let increment = (id, quantityId) => {



    let quantityDIV = document.getElementById(quantityId);
    let quantity = parseInt(quantityDIV.textContent);
    quantity++;
    quantityDIV.textContent = quantity;


    let object = {
        ID: id,
        Qty: quantity,
    };
    let data = JSON.parse(localStorage.getItem("cart"));
    if (data === null) {
        data = [];
        data.push(object)
        localStorage.setItem("cart", JSON.stringify(data))
    }
    else{

        let index=data.findIndex((x)=>{return object.ID===x.ID})
        if(index===-1){data.push(object)}
        else{data[index].Qty=quantity}
        console.log(data);
        localStorage.setItem("cart", JSON.stringify(data))
       
        

    }

calculation();



}
let decrement = (id, quantityId) => {
    let quantityDIV = document.getElementById(quantityId);
    let quantity = parseInt(quantityDIV.textContent);
    if (quantity === 0) return;
    quantity--;
    quantityDIV.textContent = quantity;
    let object = {
        ID: id,
        Qty: quantity,
    };
    let data = JSON.parse(localStorage.getItem("cart"));
    let index=data.findIndex((x)=>{return x.ID===object.ID})
    if(quantity===0 && index!=-1){data.splice(index,1)}
     else data[index].Qty=quantity
     console.log(data);
    localStorage.setItem("cart", JSON.stringify(data))
    calculation();
       
        

}
let calculation = () => {


    let cartAmount = document.querySelector('.cartAmount');
    let quantity = document.querySelectorAll('.quantity');
    let total = 0;

    quantity.forEach((element) => {
        total = total + parseInt(element.textContent);
    })
    cartAmount.textContent = total;


}
calculation();



// carrt page design 

// let cart=document.querySelector(".cart");
// cart.addEventListener(("click",
// ()=>{





// }))