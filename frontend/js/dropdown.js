function populateCities() {
    let county = document.getElementById("county").value;
    let citySelect = document.getElementById("city");

    citySelect.innerHTML = "";

    let cities = [];
    if (county === "Los Angeles") {
        cities = ["Los Angeles", "Long Beach", "Santa Monica"];
    } else if (county === "Orange") {
        cities = ["Anaheim", "Irvine", "Newport Beach"];
    } else {
        cities = ['Select  City']
    }

    cities.forEach(function(city) {
        var option = document.createElement("option");
        option.text = city;
        option.value = city;
        citySelect.appendChild(option);
    });

    citySelect.disabled = false;
}