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


const kuponok = [
    {
        "kod": "KUPON1",
        "ertek": 500
    },
    {
        "kod": "KUPON2",
        "ertek": 1000
    },
    {
        "kod": "INGYENPIZZA",
        "ertek": "100%"
    }

];



function vissza() {
    const kosar = kosarPizzak.flatMap(pizza =>
        Array(pizza.db).fill(pizza.id)
    );

    const parameterek = new URLSearchParams({
        kosar: JSON.stringify(kosar)
    });

    window.location.href = `etlap.html?${parameterek.toString()}`;
}




let oszAr = 0;
let alkalmazottKupon = null;
const kosarPizzak = [];
const osszArElem = document.getElementById("vegosszeg");


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
    osszAr = 0;
    if (kosarPizzak.length === 0) {
        kosarCont.innerHTML = "<p class=\"empty-cart\">A kosarad üres. Válassz egy pizzát az étlapról!</p>";
    }
    kosarPizzak.forEach((pizza) => {
        osszAr += pizza.ar * pizza.db;
        kosarCont.innerHTML += `
        <div class="product">
                    <svg fill="none" viewBox="0 0 60 60" height="60" width="60" xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true">
                        <rect fill="#FFF6EE" rx="8.25" height="60" width="60"></rect>
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" stroke="#FF8413"
                            fill="#FFB672"
                            d="M34.2812 18H25.7189C21.9755 18 18.7931 20.5252 17.6294 24.0434C17.2463 25.2017 17.0547 25.7808 17.536 26.3904C18.0172 27 18.8007 27 20.3675 27H39.6325C41.1993 27 41.9827 27 42.4639 26.3904C42.9453 25.7808 42.7538 25.2017 42.3707 24.0434C41.207 20.5252 38.0246 18 34.2812 18Z">
                        </path>
                        <path fill="#FFB672"
                            d="M18 36H17.25C16.0074 36 15 34.9926 15 33.75C15 32.5074 16.0074 31.5 17.25 31.5H29.0916C29.6839 31.5 30.263 31.6754 30.7557 32.0039L33.668 33.9453C34.1718 34.2812 34.8282 34.2812 35.332 33.9453L38.2443 32.0039C38.7371 31.6754 39.3161 31.5 39.9084 31.5H42.75C43.9926 31.5 45 32.5074 45 33.75C45 34.9926 43.9926 36 42.75 36H42M18 36L18.6479 38.5914C19.1487 40.5947 20.9486 42 23.0135 42H36.9865C39.0514 42 40.8513 40.5947 41.3521 38.5914L42 36M18 36H28.5ZM42 36H39.75Z">
                        </path>
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" stroke="#FF8413"
                            d="M18 36H17.25C16.0074 36 15 34.9926 15 33.75C15 32.5074 16.0074 31.5 17.25 31.5H29.0916C29.6839 31.5 30.263 31.6754 30.7557 32.0039L33.668 33.9453C34.1718 34.2812 34.8282 34.2812 35.332 33.9453L38.2443 32.0039C38.7371 31.6754 39.3161 31.5 39.9084 31.5H42.75C43.9926 31.5 45 32.5074 45 33.75C45 34.9926 43.9926 36 42.75 36H42M18 36L18.6479 38.5914C19.1487 40.5947 20.9486 42 23.0135 42H36.9865C39.0514 42 40.8513 40.5947 41.3521 38.5914L42 36M18 36H28.5M42 36H39.75">
                        </path>
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#FF8413"
                            d="M34.512 22.5H34.4982"></path>
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" stroke="#FF8413"
                            d="M27.75 21.75L26.25 23.25"></path>
                    </svg>
                    <div>
                        <h2>${pizza.nev}</h2>
                    </div>
                    <div class="quantity">
                        <button type="button" aria-label="Mennyiség csökkentése" onclick="changeDb(${pizza.id}, -1)">
                            <svg fill="none" viewBox="0 0 24 24" height="14" width="14"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b"
                                    d="M20 12L4 12"></path>
                            </svg>
                        </button>
                        <label>${pizza.db}</label>
                        <button type="button" aria-label="Mennyiség növelése" onclick="changeDb(${pizza.id}, 1)">
                            <svg fill="none" viewBox="0 0 24 24" height="14" width="14"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b"
                                    d="M12 4V20M20 12H4"></path>
                            </svg>
                        </button>
                    </div>
                    <span class="price small">${pizza.ar}</span>
                </div>
        `;
    });

    kosarCont.innerHTML += `<p class="cart-total">Összesen: ${formatPrice(osszAr)} Ft</p>`;
    updateSummary();

}

function formatPrice(price) {
    return new Intl.NumberFormat("hu-HU").format(price);
}

function getDiscount() {
    if (!alkalmazottKupon) return 0;
    if (typeof alkalmazottKupon.ertek === "string" && alkalmazottKupon.ertek.endsWith("%")) {
        return Math.min(osszAr, Math.round(osszAr * Number.parseFloat(alkalmazottKupon.ertek) / 100));
    }
    return Math.min(osszAr, Number(alkalmazottKupon.ertek));
}

function updateSummary() {
    const kedvezmeny = getDiscount();
    const szallitasiDij = kosarPizzak.length > 0 ? 300 : 0;
    const vegosszeg = Math.max(0, osszAr - kedvezmeny + szallitasiDij);

    document.getElementById("reszosszeg").textContent = `${formatPrice(osszAr)} Ft`;
    document.getElementById("kedvezmeny").textContent = `-${formatPrice(kedvezmeny)} Ft`;
    document.getElementById("szallitasiDij").textContent = `${formatPrice(szallitasiDij)} Ft`;
    osszArElem.textContent = formatPrice(vegosszeg);
    document.querySelector(".checkout-btn").disabled = kosarPizzak.length === 0;
}

function changeDb(pizzaId, num) {
    const pizza = kosarPizzak.find(item => item.id === Number(pizzaId));
    if (!pizza) return;

    pizza.db += num;
    if (pizza.db < 1) {
        kosarPizzak.splice(kosarPizzak.indexOf(pizza), 1);
    }

    const params = new URLSearchParams(window.location.search);
    params.set("kosar", JSON.stringify(
        kosarPizzak.flatMap(item => Array(item.db).fill(item.id))
    ));
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    refreshKosar();
}

function refreshKosar() {
    displayKosar();
}

function resetKosar() {
    kosarPizzak.length = 0;
    alkalmazottKupon = null;

    const params = new URLSearchParams(window.location.search);
    params.delete("kosar");
    const query = params.toString();
    window.history.replaceState({}, "", query ? `${window.location.pathname}?${query}` : window.location.pathname);

    document.getElementById("kuponInput").value = "";
    document.getElementById("kuponUzenet").textContent = "";
    document.getElementById("kuponUzenet").className = "coupon-message";
    displayKosar();
}

function kuponBevaltasa() {
    const kuponInput = document.getElementById("kuponInput");
    const kuponKod = kuponInput.value.trim().toUpperCase();
    const uzenet = document.getElementById("kuponUzenet");
    const kupon = kuponok.find(k => k.kod === kuponKod);

    if (!kupon) {
        alkalmazottKupon = null;
        uzenet.textContent = "Érvénytelen kuponkód.";
        uzenet.className = "coupon-message error";
        updateSummary();
        return;
    }

    alkalmazottKupon = kupon;
    uzenet.textContent = `Kupon alkalmazva: ${kupon.kod}`;
    uzenet.className = "coupon-message success";
    updateSummary();
}

window.addEventListener("DOMContentLoaded", () => {
    displayKosar();
    document.getElementById("kuponForm").addEventListener("submit", (event) => {
        event.preventDefault();
        kuponBevaltasa();
    });
    document.getElementById("checkoutForm").addEventListener("submit", (event) => {
        event.preventDefault();
        if (kosarPizzak.length === 0) return;
        event.target.reset();
        resetKosar();
        document.getElementById("checkoutUzenet").textContent =
            "Köszönjük a rendelésed! Hamarosan felvesszük veled a kapcsolatot.";
    });
});