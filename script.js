const searchBtn = document.getElementById('getIpBtn');
var inputTextData = document.getElementById('ipText');
var ipAddData = document.getElementById('ipValue');
var locationData = document.getElementById('location');
var timeZoneData = document.getElementById('time');
var ispData = document.getElementById('ispValue');

console.log(searchBtn);
console.log('yes');

async function getIPDetails() {
    console.log('button clicked');
    var query = inputTextData.innerText;
    //let result = await fetch(`http://ip-api.com/json/${query}`)
    let result = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_UpWVnc4ARBBLxh3GidyeOgVNHwwqa&ipAddress=${query}`);
    const data = await result.json();
    console.log(data);
    ipAddData.innerText = data.ip;
    locationData.innerText = data.location.city + ', ' + data.location.region;
    timeZoneData.innerText = data.location.timezone;
    ispData.innerText = data.as.name;
    myData(data.location.lat, data.location.lng);
}



var myData = (lat, lon) => {
    let mymap = L.map('mapid', {
        zoomControl: false,
        dragging: true,
    }).setView([lat, lon], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 12,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmFqYXQtc3JpdmFzIiwiYSI6ImNrZXB2Z3dwYzA2MmkycW4wNGZodnBhZm0ifQ.MzedXxgbHgwxnQZ27WSJdA'
    }).addTo(mymap);

    // myIcon = L.icon({
    //     iconUrl: './images/icon-location.svg'
    // });

    var marker = L.marker([lat, lon]).addTo(mymap);
};

searchBtn.addEventListener('click', getIPDetails);

document.addEventListener('DOMContentLoaded', function() {
    getIPDetails();
}, false);