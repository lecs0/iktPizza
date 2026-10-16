let kosar = [];

function kosarba(id) {
    kosar.push(id);
}

function rendeles() {
    console.log(kosar);

    const parameterek = new URLSearchParams({
        kosar: JSON.stringify(kosar)
    });

    window.location.href = "kosar.html?" + parameterek.toString();
}
