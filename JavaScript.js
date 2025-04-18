const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};


btn.addEventListener("click",(event) => {
    event.preventDefault();
    updateAmt();
});
const updateAmt= async()=>{
    let amountInput = document.querySelector(".amount input");
    let amount = amountInput.value;
    if (amount === "" || amount < 1) {
        amount = 1;
        amountInput.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

        let finalAmt = (amount * rate).toFixed(2);
        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}
window.addEventListener("load",()=>{
    updateAmt();
});
