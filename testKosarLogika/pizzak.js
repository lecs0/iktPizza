let kosar = [];

function kosarba(id) {
    kosar.push(id);
}

function rendeles() {
    console.log(kosar);
    localStorage.setItem('kosar', JSON.stringify(kosar));
}
