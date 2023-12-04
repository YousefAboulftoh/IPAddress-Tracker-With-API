// http://197.40.179.245/http://197.40.179.245/
const input = document.querySelector(`.search input`)
const button = document.querySelector(`.search button`)
const vaild = document.querySelector(`.top .search .valid`)
const theIP = document.querySelector(`.result .the-ip p`)
const theLocation = document.querySelector(`.result .location p`)
const theTimezone = document.querySelector(`.result .timezone p`)
const theIsp = document.querySelector(`.result .isp p`)
// Specify the initial latitude and longitude
let initialLat;
let initialLng;
let mymap
button.onclick = () => {
    ipAddressTraccker(input.value)
}

function ipAddressTraccker(ip) {
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_EzhMWRyd3X45jVOiQ5S1lxylm14gh&ipAddress=${ip}`)
        .then((res) => res.json())
        .then((data) => {
            return data.code !== 422 ? showElement(data) : vaild.style.display = "block";
        }).catch(() => false)
    if (mymap != undefined) {
        mymap.remove();
    }
    theIP.innerHTML = "";
    theLocation.innerHTML = "";
    theTimezone.innerHTML = "";
    theIsp.innerHTML = "";
}

function showElement(data) {
    vaild.style.display = "none"
    theIP.innerHTML = data.ip == undefined ? "" : data.ip;
    theLocation.innerHTML = data["location"]["region"];
    theTimezone.innerHTML = data["location"]["timezone"];
    theIsp.innerHTML = data["isp"];
    initialLat = data["location"]["lat"]
    initialLng = data["location"]["lng"]
    map(initialLat, initialLng)

}

function map(lat, lng) {
    // Initialize the map
    mymap = L.map('map').setView([lat, lng], 13);

    // Add a tile layer (use OpenStreetMap here)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    // Add a marker at a specific latitude and longitude
    const marker = L.marker([lat, lng]).addTo(mymap);

    // Add a popup to the marker
    marker.bindPopup('This is the marker location!').openPopup();
}
