var latitude, longitude;

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var mymap = L.map('mapid').setView([latitude, longitude], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18,
  }).addTo(mymap);

  L.marker([latitude, longitude]).addTo(mymap)
    .bindPopup('Vị trí của bạn')
    .openPopup();

  L.marker([12.694100401375113, 108.06420564616015]).addTo(mymap)
    .bindPopup('Music Lab')
    .openPopup();
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Vị trí không được trình duyệt hỗ trợ!");
}
