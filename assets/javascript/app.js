

const database = firebase.database();

$("#add-train").on('click', function (event) {
    event.preventDefault();

    let name = "";
    let place = "";
    let tTime = "";
    let freq = "";

    name = $("#train-input").val().trim();
    place = $("#destination-input").val().trim();
    tTime = $("#first-input").val().trim();
    freq = $("#frequency-input").val().trim();

    database.ref().push({
        name: name,
        place: place,
        tTime: tTime,
        freq: freq
    });

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    const csv = childSnapshot.val();

    let tName = csv.name;
    let tPlace = csv.place;
    let tTime = csv.tTime;
    let tFreq = csv.freq;

    console.log(csv.name);
    console.log(csv.place);
    console.log(csv.tTime);
    console.log(csv.freq);

    let milTime = tTime.split(":");
    let convertedTime = moment().hours(milTime[0]).minutes(milTime[1]);
    let maxMo = moment.max(moment(), convertedTime);
    let minutes;
    let arrivalTime;

    if (maxMo === convertedTime) {

        arrivalTime = convertedTime.format("hh:mm A")
        minutes = convertedTime.diff(moment(), "minutes");

    } else {
        let diff = moment.diff(convertedTime, "minutes");
        let remainder = diff % tFreq;
        minutes = tFreq - remainder;

        arrivalTime = moment().add(minutes, "m").format("hh:mm A");
    }



});