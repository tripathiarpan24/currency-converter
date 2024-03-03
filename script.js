const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("form .msg");
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
           updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let country = countryList[currCode];
    let newURL = `https://flagsapi.com/${country}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newURL;
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
     updateExchangeRate();
});
const updateExchangeRate = async ()=>{
    let amt = document.querySelector(".amount input");
    let amtValue = amt.value;
  //  console.log(amtValue);
    if(amtValue===""||amt.Value<1){
      amtValue =1;
      amt.value = "1";
    }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

 // console.log(rate);
  let finalAmount = amtValue*rate;
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}
window.addEventListener("load",()=>{
    updateExchangeRate();
});