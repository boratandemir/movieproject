const form = document.getElementById("film-form");
const titleEl = document.querySelector("#title");
const directorEl = document.querySelector("#director");
const urlEl = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

eventListener();

function eventListener() {
    form.addEventListener("submit", addFilm);

    document.addEventListener("DOMContentLoaded", function() {
        let films = Storage.getFilmFromStorage();
        UI.loadAllFilms(films);
    })
    cardbody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {

    const title = titleEl.value;
    const director = directorEl.value;
    const url = urlEl.value;

    if (title === "" || director === "" || url === "") {
        UI.displayMessage("Tüm alanları doldurun..", "danger");
    } else {
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm);
        Storage.addFilmToStorage(newFilm);
        UI.displayMessage("Film basari ile eklendi", "success");
    }


    UI.clearInputs(titleEl, urlEl, directorEl);
    e.preventDefault();
}


function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessage("silma islemi basarili", "success");
    }
}

function clearAllFilms() {
    if (confirm("Emin Misin?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }

}