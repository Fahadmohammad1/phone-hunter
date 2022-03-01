// load phones
const loadPhones = () => {
  document.getElementById("spinner").style.display = "block";
  document.getElementById("details-container").innerHTML = "";
  document.getElementById("phone-container").innerHTML = "";
  const input = document.getElementById("search-input").value;

  // error handle
  if (input === "" || isNaN(input) === false) {
    document.getElementById("empty-error").style.display = "block";
    document.getElementById("search-input").value = "";
    document.getElementById("name-error").style.display = "none";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhones(data.data.slice(0, 20)));

    // reseting input value
    document.getElementById("search-input").value = "";
    // empty input error
    document.getElementById("empty-error").style.display = "none";
    // invalid name error
    document.getElementById("name-error").style.display = "none";
  }
};
// display phones to UI
const displayPhones = (phones) => {
  // error handle
  if (phones.length === 0) {
    document.getElementById("name-error").style.display = "block";
    document.getElementById("empty-error").style.display = "none";
  }
  phones.forEach((phone) => {
    const parent = document.getElementById("phone-container");

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card pt-2 rounded-3 shadow-lg mx-auto" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top p-1 w-50 mx-auto" alt="...">
        <div class="card-body">
            <h5 class="card-title fw-bold">${phone.phone_name}</h5>
            <h6>Brand: ${phone.brand}</h6>
            <button onclick="loadDetails('${phone.slug}')" class="btn btn-outline-dark">Explore</button>
        </div>
    </div>
    `;
    parent.appendChild(div);
    document.getElementById("spinner").style.display = "none";
  });
};
// load phone details
const loadDetails = (phoneId) => {
  document.getElementById("spinner").style.display = "block";
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetails(data.data));
};

// display phone details to UI
const showDetails = (singlePhone) => {
  window.scrollTo(0, 0);
  document.getElementById("details-container").innerHTML = "";
  document.getElementById("details-container").style.display = "block";
  const detailsContainer = document.getElementById("details-container");

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="row g-4">
          <div class="col-12">
            <div class="card border-0 shadow-lg">
              <h3 class="text-center fs-2 fw-bold py-3">${singlePhone.name}</h3>
              <h6 class="text-center mb-3">Release Date: ${
                singlePhone?.releaseDate ?? "not published"
              }</h6>
              <img
                src="${singlePhone.image}"
                class="card-img-top w-25 mx-auto mt-2"
                alt="mobile image"
              />
              <div class="card-body">
                <table class="table table-striped table-hover word-break">
                  <thead>
                    <tr class="fs-5 primary-color">
                      <th scope="col">Main Features:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Storage</th>
                      <td>: ${singlePhone.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                      <th scope="row overflow-wrap">Display</th>
                      <td>
                        : ${singlePhone.mainFeatures.displaySize}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Chipset</th>
                      <td>: ${singlePhone.mainFeatures.chipSet}
                    </tr>
                    <tr>
                      <th scope="row">sensors</th>
                      <td>
                        : ${singlePhone.mainFeatures.sensors}
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr class="fs-5 primary-color">
                      <th scope="col">Other Features:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">WLAN</th>
                      <td>: ${
                        singlePhone?.others?.WLAN ?? "result not found"
                      }</td>
                    </tr>
                    <tr>
                      <th scope="row">Bluetooth</th>
                      <td>
                        : ${
                          singlePhone?.others?.Bluetooth ?? "result not found"
                        }
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">GPS</th>
                      <td>: ${
                        singlePhone?.others?.GPS ?? "result not found"
                      }</td>
                    </tr>
                    <tr>
                      <th scope="row">NFC</th>
                      <td>
                        : ${singlePhone?.others?.NFC ?? "result not found"}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Radio</th>
                      <td>
                        : ${singlePhone?.others?.Radio ?? "result not found"}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">USB</th>
                      <td>
                        : ${singlePhone?.others?.USB ?? "result not found"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  `;
  detailsContainer.appendChild(div);
  document.getElementById("spinner").style.display = "none";
};
