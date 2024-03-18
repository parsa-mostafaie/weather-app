let $ = document;
let today_container = $.querySelector(".swiper-wrapper.today");
let future_container = today_container;
let swip = $.querySelector(".hide");
let name = $.querySelector(".name");
let time_inp = $.querySelector("#time");
let lang_inp = $.getElementById("lang");
let city_inp = $.getElementById("city");
let swiper;

let city = "";
let lang = "en";
let time = 0;

lang_inp.addEventListener("change", () => {
  lang = lang_inp.value;
});

time_inp.addEventListener("change", () => {
  time = +time_inp.value;
});

city_inp.addEventListener("change", () => {
  city = city_inp.value;
});

let data = null;

let item_classlist = "swiper-slide witem";

function fetchData() {
  data = fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?lang=${lang}&unitGroup=metric&include=events%2Cdays%2Chours%2Ccurrent%2Calerts&key=JR22YSC6YC3BTNV8C9CMJAR99&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      today_container.innerHTML = "";
      !time ? setToday(json.days[0]) : setFuture(json.days.slice(1));
      swip.style.display = "";
      init_swiper();
      swiper.slideTo(1);
      swiper.slidePrev();
    })
    .catch((err) => {
      console.error(err);
    });
}

function setToday(json) {
  let frag = $.createDocumentFragment();

  let hours = json.hours;

  for (hour of hours) {
    let witem = document.createElement("div");

    witem.className = item_classlist;
    let time = +hour.datetime.slice(0, 2);
    if (time > 12) {
      time = time - 12 + " PM";
    } else {
      time += " AM";
    }
    witem.innerHTML = `
      <p class="spec-text">${time.padStart(5, "0")}</p>
      <p>${hour.temp}&deg;C</p>
      <div style='background: url(images/${
        hour.icon
      }.png);background-size: cover;' class='mx-auto w-[32px] h-[32px]' title='${
      hour.conditions
    }'></div>
      `.replace("\n", "");

    frag.appendChild(witem);
  }

  today_container.append(frag);
  name.innerHTML = "Today";
}

function getAday(day, day_id) {
  let $el = $.createElement("div");

  $el.className = item_classlist;
  $el.innerHTML = `
      <i class="spec-text">${
        day_id == 1 ? "Tomorrow" : day_id + " days after"
      }</i>
      <p>${day.temp}&deg;C</p>
      <div style='background: url(images/${
        day.icon
      }.png);background-size: cover;' class='mx-auto w-[32px] h-[32px]' title='${
    day.conditions
  }'></div>
      `.replace("\n", "");
  return $el;
}

function setFuture(json) {
  let frag = $.createDocumentFragment();
  for (day in json) {
    frag.append(getAday(json[day], +day + 1));
  }
  future_container.append(frag);
  name.innerHTML = "Future";
}

// swiper
function init_swiper() {
  const config = {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: 5,
    spaceBetween: 15,
    breakpoints: {
      // when window width is >= 992px
      992: {
        slidesPerView: 7,
        spaceBetween: 25,
      },
    },
    loop: false,
  };

  swiper = new Swiper(".swiper", config);
  return { swiper };
}
