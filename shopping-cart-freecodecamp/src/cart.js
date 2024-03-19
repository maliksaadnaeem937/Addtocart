let calculate = () => {


    let cartAmount = document.querySelector('.cartAmount');
    let quantity = JSON.parse(localStorage.getItem("cart"));
    if(quantity==null) quantity=[];
    let total = 0;

    quantity.forEach((element) => {
        total = total + parseInt(element.Qty);
    })
    cartAmount.textContent = total;


}
calculate();

const getData=(id)=>{
  

let index=shopItemsData.findIndex((x)=>{return x.id==id})
if(shopItemsData!=-1)
return shopItemsData[index];
else return ;

}
const display=()=>{
    let totalCost=0;

let data =JSON.parse(localStorage.getItem("cart"));
if(data==null)data=[];
let boughtItems=document.querySelector(".bought-items");
let finalData="";
data.forEach((element)=>{
    let objectData=getData(element.ID);
    let cost=parseInt(objectData.price)*parseInt(element.Qty)
    totalCost=totalCost+cost;
    finalData=finalData+`  <div class="box">
    <span class="cross"  onclick=del(${element.ID})>&times;</span>

    <div class="image-container"><img src="images/${objectData.img}" alt="" "></div>

    <div class="item-details">
        <div class="item-header">
            <h3 class="item-name">${objectData.name}</h3>
            <p class='price'>$ ${objectData.price}</p>
            
        </div>
        <div class="button">
        <i class="bi bi-dash-lg" onclick="decrement(${element.ID})"></i>
        <div class="quantity" id="Quantity-${element.ID}">${element.Qty}</div>
        <i class="bi bi-plus-lg" onclick="increment(${element.ID})"></i>
        </div>

        <div class="item-footer">
            <p class="totalPrice">Total Price: $ ${cost}</p>
            
        </div>

        
    </div>


</div>`




})


boughtItems.innerHTML=finalData;
let totalBill=document.querySelector(".totalBill");
if(totalCost==0){
totalBill.innerText="Cart is Empty";
let buttons=document.querySelector(".buttons");
buttons.innerHTML="";
}
else{
totalBill.innerText="Total Bill: $ "+totalCost;


}



}
display();
const del=(id)=>{
let data =JSON.parse(localStorage.getItem("cart"));
let index =data.findIndex((x)=>{return id==x.ID})
data.splice(index,1);
localStorage.setItem("cart",JSON.stringify(data));
display();
calculate();


}

let clearCart=document.querySelector(".btn-2");
if(clearCart!=null){
clearCart.addEventListener("click",
()=>{
    let data =JSON.parse(localStorage.getItem("cart"));
    data.length=0;
  localStorage.setItem("cart",JSON.stringify(data));


display();
calculate();





})}
let increment = (id) => {

let QuantityId="Quantity-"+id;
console.log(QuantityId);


    let quantityDIV = document.getElementById(QuantityId);
    console.log(quantityDIV);
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
display();
calculate();



}

let decrement = (id) => {
    let QuantityId="Quantity-"+id;
    let quantityDIV = document.getElementById(QuantityId);
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
    display();
    calculate();
       
        

}