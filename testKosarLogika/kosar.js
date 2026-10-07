pizzak = [
    {   
        "id": 1,
        "nev": "Margherita",
        "ar": 1000
    },
    {
        "id": 2,
        "nev": "Marinara",
        "ar": 1200
    },
    {
        "id": 3,
        "nev": "Quattro Stagioni",
        "ar": 1500
    }
];



function makePizza(kosar) {
    const kosarCont = document.getElementById("kosarCont");


    kosarCont.innerHTML = "";
    kosar.forEach((pizza) => {
        kosarCont.appendChild(createPizza(pizza));
    });
}

const createPizza = (pizza) => {
    const pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza");

    const pizzaNev = document.createElement("p");
    pizzaNev.textContent = pizza.nev;

    const pizzaAr = document.createElement("p");
    pizzaAr.textContent = pizza.ar;

    pizzaDiv.appendChild(pizzaNev);
    pizzaDiv.appendChild(pizzaAr);

    return pizzaDiv;
};

let kosar = JSON.parse(localStorage.getItem("kosar"));

window.onload = function() {
    for (let i = 0; i < kosar.length; i++) {
        let pizza = pizzak.find(p => p.id == kosar[i]);

        const kosarCont = document.getElementById("kosarCont");



    }
}


