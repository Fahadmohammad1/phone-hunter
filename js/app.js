// load phones
const loadPhones = () => {
  document.getElementById("phone-container").innerHTML = "";
  const input = document.getElementById("search-input").value;

  const url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
  document.getElementById("search-input").value = "";
};
// display phones to UI
const displayPhones = (phones) => {
  phones.forEach((phone) => {
    const parent = document.getElementById("phone-container");

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card rounded-3 shadow mx-auto boreder-0" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top p-1" alt="...">
        <div class="card-body">
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
            <h6>Brand: ${phone.brand}</h6>
            <button onclick="showDetails('${phone.slug}')" class="btn btn-outline-dark">Explore</button>
        </div>
    </div>
    `;
    parent.appendChild(div);
  });
};

// display phone details to UI
const showDetails = (phoneId) => {
  console.log(phoneId);
};
