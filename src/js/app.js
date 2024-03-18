let $ = document;
let container = $.querySelector("#container > .grid");
let lang_inp = $.getElementById("lang");
let city_inp = $.getElementById("city");
let wday_inp = $.getElementById("wday");

let city = "";
let lang = "en";

lang_inp.addEventListener("change", () => {
  lang = lang_inp.value;
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
    })
    .catch((err) => {
      console.error(err);
    });
}

// swiper
const swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  centeredSlides: true,
  slidesPerView: 5,
  spaceBetween: 15,
  breakpoints: {
    // when window width is >= 992px
    992: {
      slidesPerView: 7,
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 25,
    },
  },
  loop: true,
});
