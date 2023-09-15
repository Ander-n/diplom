let request = JSON.parse(localStorage.getItem("hall"));
function createPaymentPage() {
  document.querySelector(".ticket__title").innerHTML = request.film.film_name;
  document.querySelector(".ticket__chairs").innerHTML = request.chairs;
  document.querySelector(".ticket__hall").innerHTML = request.hall.hall_name;
  document.querySelector(".ticket__start").innerHTML =
    request.seance.seance_time;
  if (document.querySelector(".ticket__cost"))
    document.querySelector(".ticket__cost").innerHTML = request.cost;
}
function createQR() {
  date = new Date(request.timestamp * 1000);
  var row = `Фильм: ${request.film.film_name}, Зал: ${
    request.hall.hall_name
  }, Ряд/Место: ${request.chairs}, Дата сеанса: ${date
    .toISOString()
    .slice(0, 10)}, Начало сеанса: ${
    request.seance.seance_time
  }, Билет действителен строго на свой сеанс`;
  opt = {
    mode: -1,
    eccl: 0,
    version: -1,
    mask: -1,
    image: "PNG",
    modsize: 3,
    margin: 2,
  };
  document.querySelector(".ticket__info-qr").append(QRCreator(row,opt).result);
  console.log();
  getDataApi(`event=sale_add&timestamp=${request.timestamp}&hallId=${request.hall.hall_id}&seanceId=${request.seance.seance_id}&hallConfiguration=${request.hallConfig}`,(data)=>{return false})
}
