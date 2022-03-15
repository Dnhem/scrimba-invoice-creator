// State
let existingServices = [];
let total = 0;

// Selectors
const serviceBtns = document.querySelectorAll(".btn-price");
const dollar = document.querySelector(".dollar-sign");
const price = document.querySelector(".price");
const servicesList = document.querySelector(".services-list");
const totalPrice = document.querySelector(".total-price");
const invoiceBtn = document.querySelector(".btn-invoice");

for (let btn of serviceBtns) {
  btn.addEventListener("click", () => {
    console.log(btn.id);
    if (!existingServices.includes(btn.id)) {
      // Only gets called if node id is pushed into existingServices list
      existingServices.push(btn.id);
      addServiceToTable(btn.id);
      totalPrice.textContent = `$${total}`;
    }
  });
}

const fillServiceType = (type, id, price) => {
  let p = document.createElement("p");
  p.classList.add("service-type");
  p.setAttribute("id", id);
  p.innerHTML = `${type}<span class="remove">remove</span>
  <span class="price">$${price}</span>`;
  return p;
};

const addServiceToTable = serviceID => {
  if (serviceID === "wash-car") {
    let washCar = fillServiceType("Wash Car", "wash-car", "10");
    servicesList.appendChild(washCar);
    total += 10;
  } else if (serviceID === "mow-lawn") {
    let mowLawn = fillServiceType("Mow Lawn", "mow-lawn", "20");
    servicesList.appendChild(mowLawn);
    total += 20;
  } else if (serviceID === "pull-weeds") {
    let pullWeeds = fillServiceType("Pull Weeds", "pull-weeds", "30");
    servicesList.appendChild(pullWeeds);
    total += 30;
  }
};

// Remove service from DOM and existingServices array
servicesList.addEventListener("click", e => {
  let target = e.target;
  if (target.matches("span")) {
    let serviceType = document.querySelector(".service-type");
    console.log(serviceType);
    serviceType.remove();
    existingServices.splice(existingServices.indexOf(serviceType.id), 1);
    if (serviceType.id === "wash-car") total -= 10;
    else if (serviceType.id === "mow-lawn") total -= 20;
    else if (serviceType.id === "pull-weeds") total -= 30;
    totalPrice.textContent = `$${total}`;
  }
});

invoiceBtn.addEventListener("click", e => {
  const serviceType = document.querySelectorAll(".service-type");
  for (let type of serviceType) {
    type.remove();
  }
  total = 0;
  totalPrice.textContent = "";
  existingServices = [];
});
