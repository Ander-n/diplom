`<section class="movie">
    <div class="movie__info">
    <div class="movie__poster">
        <img class="movie__poster-image" alt="Звёздные войны постер" src="i/poster1.jpg">
    </div>
    <div class="movie__description">
        <h2 class="movie__title">Звёздные войны XXIII: Атака клонированных клонов</h2>
        <p class="movie__synopsis">Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.</p>
        <p class="movie__data">
        <span class="movie__data-duration">130 минут</span>
        <span class="movie__data-origin">США</span>
        </p>
    </div>
    </div>  

    <div class="movie-seances__hall">
    <h3 class="movie-seances__hall-title">Зал 1</h3>
    <ul class="movie-seances__list">
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">10:20</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">14:10</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">18:40</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">22:00</a></li>
    </ul>
    </div>
    <div class="movie-seances__hall">
    <h3 class="movie-seances__hall-title">Зал 2</h3>
    <ul class="movie-seances__list">
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">11:15</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">14:40</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">16:00</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">18:30</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">21:00</a></li>
        <li class="movie-seances__time-block"><a class="movie-seances__time" href="hall.html">23:30</a></li>     
    </ul>
    </div>      
</section>`;

const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
let date = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
let data = {};

function editDate(e) {
  document.querySelectorAll(".page-nav__day").forEach((element) => {
    element.classList.remove("page-nav__day_chosen");
  });
  e.currentTarget.classList.add("page-nav__day_chosen");
  let day = e.currentTarget.dataset.day;
  renderMainList(day);
}

function openHall(e) {
  let dataset = e.currentTarget.dataset;
  hall = data.halls.result.filter((el) => {
    return el.hall_id == dataset.hallid;
  })[0];
  seance = data.seances.result.filter((el) => {
    return el.seance_id == dataset.seanceid;
  })[0];
  film = data.films.result.filter((el) => {
    return el.film_id == dataset.filmid;
  })[0];
  let response = {
    hall,
    seance,
    film,
    timestamp: dataset.timestamp,
  };
  localStorage.setItem("hall", JSON.stringify(response));
}

function createMainList(apiData) {
  var currentDate = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000);
  apiData.halls.result = apiData.halls.result.filter((el) => {
    return el.hall_open == "1";
  });
  apiData.seances.result.sort((a, b) => {
    return a.seance_start - b.seance_start;
  });
  data = apiData;
  console.log(data);
  renderMainList(currentDate);
}

function renderMainList(selectDate) {
  document.querySelector("main").innerHTML = "";
  let today = false;
  if (selectDate == Math.floor(new Date().setHours(0, 0, 0, 0)) / 1000) {
    selectDate = Math.floor(new Date().getTime() / 1000);
    today = true;
  }

  data.films.result.forEach((film) => {
    let halls = "";
    data.halls.result.forEach((hall) => {
      let seances = "";
      data.seances.result.forEach((seance) => {
        if (
          seance.seance_filmid == film.film_id &&
          seance.seance_hallid == hall.hall_id
        ) {
          timestamp =
            Number(seance.seance_start) * 60 +
            (today ? date : Number(selectDate));
          seances += `
            <li class="movie-seances__time-block">
              <a 
                class="movie-seances__time ${
                  selectDate > Number(seance.seance_start) * 60 + date && today
                    ? "acceptin-button-disabled"
                    : ""
                }" 
                data-hallId="${hall.hall_id}" 
                data-filmId="${film.film_id}" 
                data-seanceId="${seance.seance_id}" 
                data-timestamp="${timestamp}" 
                href="hall.html">
                  ${seance.seance_time}
                </a>
            </li>
            `;
        }
      });
      if (seances) {
        halls += `
        <div class="movie-seances__hall">
            <h3 class="movie-seances__hall-title">${hall.hall_name}</h3>
            <ul class="movie-seances__list">
               ${seances}
            </ul>
        </div>
        `;
      }
    });

    let section = `<section class="movie">
        <div class="movie__info">
        <div class="movie__poster">
            <img class="movie__poster-image" alt="${film.film_name} постер" src="${film.film_poster}">
        </div>
        <div class="movie__description">
            <h2 class="movie__title">${film.film_name}</h2>
            <p class="movie__synopsis">${film.film_description}</p>
            <p class="movie__data">
            <span class="movie__data-duration">${film.film_duration} минут</span>
            <span class="movie__data-origin">${film.film_origin}</span>
            </p>
        </div>
        </div>  

        ${halls}
              
    </section>`;

    document.querySelector("main").insertAdjacentHTML("beforeend", section);
  });

  document.querySelectorAll(".movie-seances__time").forEach((element) => {
    element.addEventListener("click", openHall);
  });
}

function renderDays() {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  for (var i = 0; i < 6; i++) {
    var tabClasses = "page-nav__day ";
    if (i == 0) {
      tabClasses += "page-nav__day_today page-nav__day_chosen ";
    }
    if (date.getDay() == 0 || date.getDay() == 6) {
      tabClasses += "page-nav__day_weekend ";
    }
    var tab = `<a class="${tabClasses}" data-day="${Math.floor(
      date.getTime() / 1000
    )}" href="#">
    <span class="page-nav__day-week">${
      weekdays[date.getDay()]
    }</span><span class="page-nav__day-number" >${date.getDate()}</span>
  </a>`;
    document.querySelector(".page-nav").insertAdjacentHTML("beforeend", tab);
    date.setDate(date.getDate() + 1);
  }
  document.querySelectorAll(".page-nav__day").forEach((element) => {
    element.addEventListener("click", editDate);
  });
}

getDataApi("event=update", createMainList);
renderDays();
