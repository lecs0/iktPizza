const pizzak = [
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
    },
    {
        "id": 4,
        "nev": "Quattro Formaggi",
        "ar": 1600
    },
    {
        "id": 5,
        "nev": "Capricciosa",
        "ar": 1700
    }
];





function getPizzaById(id) {
    return pizzak.find(pizza => pizza.id === Number(id));
}


function getParams() {
    const params = new URLSearchParams(window.location.search);
    const kosarAdat = params.get("kosar");
    const kosar = kosarAdat ? JSON.parse(kosarAdat) : [];
    return kosar;
}


function displayKosar() {
    const kosar = getParams();
    const kosarCont = document.getElementById("kosarCont");
    let osszAr = 0;

    kosar.forEach((pizzaId) => {
        const pizza = getPizzaById(pizzaId);
        osszAr += pizza ? pizza.ar : 0;
        if (!pizza) return;
        kosarCont.innerHTML += `<p>${pizza.nev} - ${pizza.ar} Ft</p>`;
    });

    kosarCont.innerHTML += `<p>Összesen: ${osszAr} Ft</p>`;
}


window.addEventListener("DOMContentLoaded", () => {

    const kosar = getParams();
    displayKosar();

    
});