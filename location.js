function initMap() {
  const map_centre = {
    lat: 22.825133,
    lng: 86.205674,
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: map_centre,
  });

  let marker = null;
  let circle = null;

  // Default marker
  function initMarker() {
    marker = new google.maps.Marker({
      position: map_centre,
      map: map,
      draggable: true, // Marker is draggable
    });
    document.getElementById("latitude").value = map_centre.lat;
    document.getElementById("longitude").value = map_centre.lng;
  }

  // Add circle boundary
  function addCircle(radius) {
    const center = marker.getPosition();

    if (circle != null) {
      circle.setMap(null);
    }

    circle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: map,
      center: center,
      radius: radius,
    });

    google.maps.event.addListener(marker, "drag", function () {
      circle.setCenter(marker.getPosition());
    });
  }

  initMarker();
  new google.maps.event.addListener(map, "click", function (event) {
    placeMarker(event.latLng);
  });

  function placeMarker(location) {
    if (marker != null) {
      marker.setMap(null);
    }

    marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true, // Marker is draggable
    });

    document.getElementById("latitude").value = location.lat();
    document.getElementById("longitude").value = location.lng();

    const radiusInput = document.getElementById("radius");

    radiusInput.addEventListener("input", function () {
      const radius = parseFloat(radiusInput.value);
      addCircle(radius);
    });

    google.maps.event.addListener(marker, "drag", function () {
      const radius = parseFloat(radiusInput.value);
      addCircle(radius);
    });

    const radius = parseFloat(radiusInput.value);
    addCircle(radius);
  }
}

const savedServiceList = document.getElementById("savedServiceList");
const serviceForm = document.getElementById("serviceForm");
const dropdownButton = document.getElementById("dropdownButton");
const dropdownContent = document.getElementById("dropdownContent");

let savedAreas = [];

function addSavedArea(latitude, longitude, radius) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `<label>Latitude:</label><span>${latitude}</span><br>
                            <label>Longitude:</label><span>${longitude}</span><br>
                            <label>Radius:</label><span>${radius}</span>`;
  savedServiceList.appendChild(listItem);

  const dropdownItem = document.createElement("li");
  dropdownItem.innerText = `Latitude: ${latitude}, Longitude: ${longitude}, Radius: ${radius}`;
  dropdownContent.appendChild(dropdownItem);
}

serviceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const radius = document.getElementById("radius").value;
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  addSavedArea(latitude, longitude, radius);

  // Reset form values
  serviceForm.reset();

  // Show saved service area section
  savedServiceArea.style.display = "block";
});

dropdownButton.addEventListener("click", function () {
  dropdownContent.style.display =
    dropdownContent.style.display === "none" ? "block" : "none";
});
