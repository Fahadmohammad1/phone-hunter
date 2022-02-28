// load phones
const loadPhones = () => {
  const input = document.getElementById("search-input").value;

  const url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};
