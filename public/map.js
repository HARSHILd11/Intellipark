var map = L.map('map');
map.setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let marker, circle;

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    marker = L.marker([lat, lng]).addTo(map);
    circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }

    map.setView([lat, lng]);
    map.fitBounds(circle.getBounds());
};

function error(err) {
    if (err.code === 1) {
        alert("Please allow location access.");
    } else {
        alert("Cannot get location.");
    }
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
} else {
    alert("Geolocation is not supported by this browser.");
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            const country = data.address.country;
            const state = data.address.state;
            const city = data.address.city;

            const confirmMessage = `Your location: \nCountry: ${country}\nState: ${state}\nCity: ${city}\n\nIs this correct?`;
            const isLocationCorrect = confirm(confirmMessage);

            if (!isLocationCorrect) {
                getLocation();
            } else {
                refreshMap(latitude, longitude);
            }
        })
        .catch(error => console.error('Error fetching location:', error));
}

function refreshMap(latitude, longitude) {
    map.setView([latitude, longitude], 13);
}

getLocation();



