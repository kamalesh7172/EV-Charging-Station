// ===============================
// EV CHARGING STATION FINDER
// ===============================


// Selected station
let selectedStation = "";


// Selected time
let selectedTime = "";


// ===============================
// SEARCH STATIONS
// ===============================

function searchStations() {

    let searchText =
        document.getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    let connector =
        document.getElementById("connectorFilter")
            .value;

    let power =
        Number(
            document.getElementById("powerFilter")
                .value
        );

    let freeOnly =
        document.getElementById("freeFilter")
            .checked;

    let stations =
        document.querySelectorAll(".station");

    let count = 0;


    stations.forEach(function(station) {

        let name =
            station.dataset.name.toLowerCase();

        let city =
            station.dataset.city.toLowerCase();

        let stationConnector =
            station.dataset.connector;

        let stationPower =
            Number(station.dataset.power);

        let freePorts =
            Number(station.dataset.free);


        // Search condition
        let matchesSearch =
            searchText === "" ||
            name.includes(searchText) ||
            city.includes(searchText);


        // Connector condition
        let matchesConnector =
            connector === "" ||
            stationConnector === connector;


        // Power condition
        let matchesPower =
            stationPower >= power;


        // Free port condition
        let matchesFree =
            !freeOnly ||
            freePorts > 0;


        // Final result
        if (
            matchesSearch &&
            matchesConnector &&
            matchesPower &&
            matchesFree
        ) {

            station.style.display = "grid";

            count++;

        } else {

            station.style.display = "none";

        }

    });


    document.getElementById("stationCount")
        .textContent =
        count + " station" +
        (count !== 1 ? "s" : "") +
        " found";
}


// ===============================
// RESET SEARCH
// ===============================

function resetSearch() {

    document.getElementById("searchInput")
        .value = "";

    document.getElementById("connectorFilter")
        .value = "";

    document.getElementById("powerFilter")
        .value = "0";

    document.getElementById("freeFilter")
        .checked = false;


    let stations =
        document.querySelectorAll(".station");


    stations.forEach(function(station) {

        station.style.display = "grid";

    });


    document.getElementById("stationCount")
        .textContent =
        stations.length + " stations found";
}


// ===============================
// OPEN BOOKING
// ===============================

function openBooking(stationName) {

    selectedStation = stationName;


    document.getElementById("selectedStation")
        .innerHTML =
        "Selected station: <strong>" +
        stationName +
        "</strong>";


    document.getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });


    document.getElementById("bookingMessage")
        .innerHTML = "";


    // Reset selected time
    selectedTime = "";


    let timeButtons =
        document.querySelectorAll(
            ".time-slots button"
        );


    timeButtons.forEach(function(button) {

        button.classList.remove("selected");

    });

}


// ===============================
// SELECT TIME
// ===============================

function selectTime(button) {

    let buttons =
        document.querySelectorAll(
            ".time-slots button"
        );


    buttons.forEach(function(item) {

        item.classList.remove("selected");

    });


    button.classList.add("selected");


    selectedTime =
        button.textContent.trim();
}


// ===============================
// CONFIRM BOOKING
// ===============================

function confirmBooking() {

    let date =
        document.getElementById("bookingDate")
            .value;

    let duration =
        document.getElementById("duration")
            .value;

    let name =
        document.getElementById("name")
            .value
            .trim();

    let email =
        document.getElementById("email")
            .value
            .trim();

    let phone =
        document.getElementById("phone")
            .value
            .trim();

    let vehicle =
        document.getElementById("vehicle")
            .value
            .trim();


    // Check station
    if (selectedStation === "") {

        showMessage(
            "Please select a charging station first.",
            "error"
        );

        return;
    }


    // Check date
    if (date === "") {

        showMessage(
            "Please select a booking date.",
            "error"
        );

        return;
    }


    // Check time
    if (selectedTime === "") {

        showMessage(
            "Please select a start time.",
            "error"
        );

        return;
    }


    // Check name
    if (name === "") {

        showMessage(
            "Please enter your name.",
            "error"
        );

        return;
    }


    // Check email
    if (email === "") {

        showMessage(
            "Please enter your email.",
            "error"
        );

        return;
    }


    // Check phone
    if (phone === "") {

        showMessage(
            "Please enter your phone number.",
            "error"
        );

        return;
    }


    // Check vehicle
    if (vehicle === "") {

        showMessage(
            "Please enter your vehicle number.",
            "error"
        );

        return;
    }


    // Validate phone
    if (!/^[0-9]{10}$/.test(phone)) {

        showMessage(
            "Please enter a valid 10-digit phone number.",
            "error"
        );

        return;
    }


    // Create booking ID
    let bookingId =
        "EV" +
        Math.floor(
            100000 + Math.random() * 900000
        );


    // Success message

    let message =

        "<strong>Booking Confirmed!</strong><br><br>" +

        "Booking ID: <strong>" +
        bookingId +
        "</strong><br>" +

        "Station: " +
        selectedStation +
        "<br>" +

        "Date: " +
        date +
        "<br>" +

        "Time: " +
        selectedTime +
        "<br>" +

        "Duration: " +
        duration +
        " minutes<br>" +

        "Name: " +
        name +
        "<br>" +

        "Vehicle: " +
        vehicle +
        "<br>" +

        "Phone: " +
        phone;


    showMessage(
        message,
        "success"
    );


    // Save booking in browser
    let booking = {

        bookingId: bookingId,

        station: selectedStation,

        date: date,

        time: selectedTime,

        duration: duration,

        name: name,

        email: email,

        phone: phone,

        vehicle: vehicle

    };


    localStorage.setItem(
        "evBooking",
        JSON.stringify(booking)
    );

}


// ===============================
// SHOW MESSAGE
// ===============================

function showMessage(message, type) {

    let box =
        document.getElementById(
            "bookingMessage"
        );


    box.innerHTML = message;


    if (type === "success") {

        box.style.background = "#dcf1e5";

        box.style.color = "#15663b";

        box.style.border =
            "1px solid #8bc9a5";

    } else {

        box.style.background = "#fde5e5";

        box.style.color = "#a61b1b";

        box.style.border =
            "1px solid #e4a0a0";

    }

}


// ===============================
// SET MINIMUM BOOKING DATE
// ===============================

window.addEventListener(
    "DOMContentLoaded",
    function() {

        let dateInput =
            document.getElementById(
                "bookingDate"
            );


        let today =
            new Date()
                .toISOString()
                .split("T")[0];


        dateInput.min = today;

    }
);