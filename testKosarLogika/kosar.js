const pizzak = [
    {   
        "id": 1,
        "nev": "Margherita",
        "ar": 1000,
        "db": 1
    },
    {
        "id": 2,
        "nev": "Marinara",
        "ar": 1200,
        "db": 1
    },
    {
        "id": 3,
        "nev": "Quattro Stagioni",
        "ar": 1500,
        "db": 1
    },
    {
        "id": 4,
        "nev": "Quattro Formaggi",
        "ar": 1600,
        "db": 1
    },
    {
        "id": 5,
        "nev": "Capricciosa",
        "ar": 1700,
        "db": 1
    }
];



const kosarPizzak = [];



function getPizzaById(id) {
    return pizzak.find(pizza => pizza.id === Number(id));
}


function getParams() {
    const params = new URLSearchParams(window.location.search);
    const kosarAdat = params.get("kosar");
    try {
        return kosarAdat ? JSON.parse(kosarAdat) : [];
    } catch {
        return [];
    }
}


function displayKosar() {
    const kosarCont = document.getElementById("kosarCont");
    kosarPizzak.length = 0;

    getParams().forEach((pizzaId) => {
        const pizza = getPizzaById(pizzaId);
        if (!pizza) return;

        const existingPizza = kosarPizzak.find(item => item.id === pizza.id);
        if (existingPizza) {
            existingPizza.db++;
        } else {
            kosarPizzak.push({ ...pizza, db: 1 });
        }
    });

    kosarCont.innerHTML = "";
    let osszAr = 0;
    kosarPizzak.forEach((pizza) => {
        osszAr += pizza.ar * pizza.db;
        kosarCont.innerHTML += `<p>${pizza.nev} - ${pizza.ar} Ft</p><button onclick="changeDb(${pizza.id}, -1)">-</button><span>${pizza.db}</span><button onclick="changeDb(${pizza.id}, 1)">+</button>`;
    });

    kosarCont.innerHTML += `<p>Összesen: ${osszAr} Ft</p>`;
}

function changeDb(pizzaId, num) {
    const pizza = kosarPizzak.find(item => item.id === Number(pizzaId));
    if (!pizza) return;

    pizza.db += num;
    if (pizza.db < 1) {
        kosarPizzak.splice(kosarPizzak.indexOf(pizza), 1);
    }
    refreshKosar();
}

function refreshKosar() {
    const kosarCont = document.getElementById("kosarCont");
    kosarCont.innerHTML = "";
    let osszAr = 0;

    kosarPizzak.forEach((pizza) => {
        osszAr += pizza.ar * pizza.db;
        kosarCont.innerHTML += `<p>${pizza.nev} - ${pizza.ar} Ft</p><button onclick="changeDb(${pizza.id}, -1)">-</button><span>${pizza.db}</span><button onclick="changeDb(${pizza.id}, 1)">+</button>`;
    });

    kosarCont.innerHTML += `<p>Összesen: ${osszAr} Ft</p>`;
}




window.addEventListener("DOMContentLoaded", () => {
    displayKosar();
    console.log(kosarPizzak); 
});