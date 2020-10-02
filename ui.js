function UI() {

}

UI.prototype.addFilmToUI = function (newFilm) {

  // <tr>
  //                                         <td><img src="" class="img-fluid img-thumbnail"></td>
  //                                         <td></td>
  //                                         <td></td>
  //                                         <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
  //                                       </tr> 

  const filmList = document.getElementById("films");

  // += yapılmasının ama cı önceki verinin üzerine yazar. komple silinip yazılması için = kullanılır.
  filmList.innerHTML += `
    
    <tr>
                                             <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
                                             <td>${newFilm.title}</td>
                                             <td>${newFilm.director}</td>
                                             <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
      </tr> 

    
    `;
}

// Film ekleme işleminden sonra inputları temizle.
UI.prototype.clearInputs = function (element1, element2, element3) {

  element1.value = "";
  element2.value = "";
  element3.value = "";

}

UI.prototype.displayMessages = function (message, type) {

  const cardBody = document.querySelector(".card-body");

  // Alert div oluşturma;

  const div = document.createElement("div");

  div.className = `alert alert-${type}`;
  div.textContent = message;

  // .card-body altına div i ekle;
  cardBody.appendChild(div);

  // 1 saniye sonra ekrandan kaybet.
  setTimeout(function () {

    div.remove();

  }, 1000);

}

UI.prototype.loadAllFilms = function (films) {

  const filmList = document.getElementById("films");

  films.forEach(function (films) {

    filmList.innerHTML += `

     <tr>
     <td><img src="${films.url}" class="img-fluid img-thumbnail"></td>
     <td>${films.title}</td>
     <td>${films.director}</td>
     <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
      </tr> 

      `;

  });

}

// Eklenen filmi ekrandan kaldırır. (ParentElement üst elemente gider)

UI.prototype.deleteFilmFromUI = function (element) {

  element.parentElement.parentElement.remove();

}

UI.prototype.clearAllFilmsFromUI = function () {

  const filmList = document.getElementById("films");

  // filmList.innerHTML = ""; (Böyle de temizlenebilir , ama yavaş bir yöntem.)

  // Child element olduğu sürece silecek. (Yani boş olmadığı sürece)
  while (filmList.firstElementChild !== null) {

    filmList.firstElementChild.remove();

  }



}





