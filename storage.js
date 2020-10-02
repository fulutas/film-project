function Storage() {

}

// Storage film ekle.
Storage.prototype.addFilmToStorage = function (newFilm) {

    // Storage'den filmi getir.
    let films = this.getFilmsFromStorage();

    films.push(newFilm);

    // Localstorage ekle. 1) key films ekle. 2) veriyi stringe çevir.
    localStorage.setItem("films", JSON.stringify(films));

}

// Storage'de kayıtlı film varsa getir. yoksa boş getir.
Storage.prototype.getFilmsFromStorage = function () {

    let films;

    const notFound = document.getElementById("foundMessage");
    const div = document.createElement("div");

    div.className = `no-records-message text-dark`;
    div.textContent = "Kayıt Bulunamadı";


    if (localStorage.getItem("films") === null) {
        films = [];
        // filmList.innerHTML = "Kayıt bulunmuyor.";  // Veri yok ise text yaz.
        notFound.appendChild(div);
    }
    else {
        films = JSON.parse(localStorage.getItem("films"));
    }

    return films;
}

Storage.prototype.deleteFilmFromStorage = function (filmTitle) {

    let films = this.getFilmsFromStorage();

    films.forEach(function (film, index) {

        // Gelen değer film title alanında var ise splice ile sil.    
        if (film.title === filmTitle) {
            films.splice(index, 1); // Bulunduğu index'ten sil.
        }
    });

    // Son olarak Array stringe çevir , localstorage yaz.
    localStorage.setItem("films", JSON.stringify(films));

};

// Storage'deki tüm verileri temizle.
Storage.prototype.clearAllFilmsFromStorage = function () {

    localStorage.removeItem("films");
}
