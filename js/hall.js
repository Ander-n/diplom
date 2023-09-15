let request = JSON.parse(localStorage.getItem("hall"));

function selectChair(e) {
  e.currentTarget.classList.toggle("conf-step__chair_selected");
  console.log();
  if (
    document.querySelectorAll(".conf-step__row .conf-step__chair_selected")
      .length
  ) {
    document.querySelector(".acceptin-button").disabled = false;
  } else {
    document.querySelector(".acceptin-button").disabled = true;
  }
}
function renderHallConfig(data) {
  console.log(request, data);
  if (data == null) {
    data = request.hall.hall_config;
  }
  document
    .querySelector(".conf-step__wrapper")
    .insertAdjacentHTML("beforeend", data);

  document.querySelectorAll(".conf-step__chair:not(.conf-step__chair_taken)").forEach((element) => {
    element.addEventListener("click", selectChair);
  });
}
function renderHallPage() {
  console.log(
    `event=get_hallConfig&timestamp=${request.timestamp}&hallId=${request.hall.hall_id}&seanceId=${request.seance.seance_id}`
  );
  getDataApi(
    `event=get_hallConfig&timestamp=${request.timestamp}&hallId=${request.hall.hall_id}&seanceId=${request.seance.seance_id}`,
    renderHallConfig
  );
  document.querySelector(".buying__info-hall").innerHTML =
    request.hall.hall_name;
  document.querySelector(".buying__info-time").innerHTML =
    request.seance.seance_time;
  document.querySelector(".buying__info-title").innerHTML =
    request.film.film_name;
  document.querySelector(".price-vip").innerHTML = request.hall.hall_price_vip;
  document.querySelector(".price-standart").innerHTML =
    request.hall.hall_price_standart;
}

function createRequest() {
  request.chairs = "";
  request.cost = 0;
  document
    .querySelectorAll(".conf-step__row .conf-step__chair_selected")
    .forEach((el) => {
      step = [...el.parentNode.children].indexOf(el) + 1;
      row = [...el.parentNode.parentNode.children].indexOf(el.parentNode) + 1;
      console.log();
      request.cost += Number(
        el.classList.contains("conf-step__chair_vip")
          ? request.hall.hall_price_vip
          : request.hall.hall_price_standart
      );
      request.chairs += row + "/" + step + ", ";
      el.classList.remove("conf-step__chair_vip");
      el.classList.remove("conf-step__chair_standart");
      el.classList.remove("conf-step__chair_selected");
      el.classList.add("conf-step__chair_taken");
    });
  request.chairs = request.chairs.substring(0, request.chairs.length - 2);
  request.hallConfig = document.querySelector(".conf-step__wrapper").innerHTML;
  console.log(request);
  localStorage.setItem("hall", JSON.stringify(request));
  location.href = "./payment.html";
}
