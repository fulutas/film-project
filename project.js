// Elementlere ulaş

const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// UI Objesini Başlatma
const ui = new UI();

// Storage Objesi Üret
const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
     form.addEventListener("submit", addFilm);

     // Sayfa yüklendiğinde;
     document.addEventListener("DOMContentLoaded", function(){ 
        
        let films = storage.getFilmsFromStorage();
        
        ui.loadAllFilms(films);
        
     });

     cardbody.addEventListener("click", deleteFilm);

     clear.addEventListener("click", clearAllfilms);
}

function addFilm(e){

    const titleValue = titleElement.value;
    const directorValue = directorElement.value;
    const urlValue = urlElement.value;
    const notFound = document.getElementById("foundMessage");


    // İnputlardan herhangi biri boş ise hata verecek. (|| veya)
    if(titleValue === "" || directorValue === "" || urlValue === ""){

      // Hata ekranı bas.
      // ui.displayMessages("Tüm alanları doldurunuz.","danger");

      swal({
        title: "Tüm alanları doldurunuz.",
        icon: "warning",
        button: "Kapat",
        timer: 2000,
      })

    } 

    else{

    // Yeni Film ekler.    
    const newFilm = new Film(titleValue,directorValue,urlValue);

    // Arayüze film ekleme
    ui.addFilmToUI(newFilm); 

    // Storage'a film ekleme
    storage.addFilmToStorage(newFilm);

    notFound.remove();

    // Başarılı ekranı bas.
    // ui.displayMessages("Başarıyla eklendi.","success");
    swal({
      title: "Başarıyla eklendi.",
      icon: "success",
      button: "Kapat",
      timer: 1000,
    })

    }
  
    // Film ekleme işleminden sonra inputları temizle.
    ui.clearInputs(titleElement,directorElement,urlElement); 

    // Sayfa yenilenmesini engeller.
    e.preventDefault();

}

function deleteFilm(e){
   
    // Tıklanılan yer id'si delete-film ise;
    if(e.target.id === "delete-film"){
      ui.deleteFilmFromUI(e.target);

     // Filmi ismninin değerini al.
     // previousElementSibling üst elementin altındaki elementi al.
      storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent); 
      // ui.displayMessages("Başarıyla silindi.","success");

      swal({
        title: "Başarıyla silinmiştir.",
        icon: "success",
        button: "Kapat",
        timer: 1000,
      })

    }

}

function clearAllfilms(){

  let filmList = document.getElementById("films");
  const clearEl = document.getElementById("clearEl");
  const notFound = document.getElementById("foundMessage");
  const divE = document.createElement("div");

  divE.className = `no-records-message text-dark`;
  divE.textContent = "Kayıt Bulunamadı";


  // Basic confirm ile;
  // if(confirm("Emin Misiniz?")){

  //   ui.clearAllFilmsFromUI();
  //   storage.clearAllFilmsFromStorage();
  
  //   }

  swal({
    title: "Emin misiniz?",
    text: "Tüm veriler silenecektir.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })

  // Evet butonuna tıklandıktan sonra gelecek ekran;
  .then((willDelete) => {
    if (willDelete) {
      swal("Tüm veriler silinmiştir.", {
        icon: "success",
      });
      ui.clearAllFilmsFromUI();
      storage.clearAllFilmsFromStorage();
      clearEl.appendChild(divE);
      notFound.remove();
    }

    
  
  });



}