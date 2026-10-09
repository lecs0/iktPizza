function getMovieId() {
    const params = new URLSearchParams(window.location.search);

    return params.get('pizzaId');
}