// This application parses the data set from the csv files.
let firebase = require ("firebase");
let lineReader = require('line-reader');
const file = "./dataset/partial.csv";
var config = {
    apiKey: "AIzaSyB9LZS3RpqkPnwTyfPfy8fcZuGHYmw8YNE",
    authDomain: "corevalhack.firebaseapp.com",
    databaseURL: "https://corevalhack.firebaseio.com",
    projectId: "corevalhack",
    storageBucket: "corevalhack.appspot.com",
  };


// Set up firebase
firebase.initializeApp(config);
let db = firebase.database();
let classLevel = "Classes";
let profLevel = "Professors";
let classref = db.ref(classLevel);
let profref = db.ref(profLevel);

// Go through each line and parse it adding to firebase.
lineReader.eachLine(file, (line, lastLine) => {
    if (line) {
        parseLine(line, lastLine);
    }
});


/**
 * Parse each line into tokens and put the information into the
 * firebase application.
 * 
 * @param line, the line to process
 */
function parseLine(line, lastLine) {
    // Parse each token in the line.
    let tokens = line.split(",");
    let professor = tokens[0].replace(" ","_").replace(".", "");
    let course = tokens[1];
    let quarter = tokens[2];
    let rating = tokens[3].replace("[", "").replace("]","").split(" ");
    let numSurveyed = tokens[4];
    let ratingObj = {};

    // Every rating has at least 4 fields.
    ratingObj["overall"] = rating[0];
    ratingObj["content"] = rating[1];
    ratingObj["contribution"] = rating[2];
    ratingObj["effective"] = rating[3];

    // Prepare this object to be added to firebase
    let courseInfo = {
        course: course,
        quarter: quarter,
        // rating: ratingObj,
        numSurveyed: numSurveyed
    }

    // Add the mapping from course to professor
    let currClassRef = db.ref(`${classLevel}/${course}/${professor}`);
    currClassRef.push(courseInfo)
    .then (handleSuccess)
    .catch (handleErr);

    // Add the mapping from professor to course
    currClassRef = db.ref(`${profLevel}/${professor}/${course}`);
    currClassRef.push(numSurveyed)
    .then (handleSuccess)
    .catch (handleErr);
}


function handleErr(err) {
    console.log(err);
}

function handleSuccess(data) {
    console.log("data pushed");
}


