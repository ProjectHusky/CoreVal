let config = require("../src/config");
// This application parses the data set from the csv files.
let firebase = require ("firebase");
let lineReader = require('line-reader');
const file = "./dataset/data.csv";
// var config = {
//     apiKey: "AIzaSyA8vhTFhNOOzpevUohNqCEiswCvadjXGBg",
//     authDomain: "corevalhack-89a84.firebaseapp.com",
//     databaseURL: "https://corevalhack-89a84.firebaseio.com",
//     projectId: "corevalhack-89a84",
//     storageBucket: "",
//     messagingSenderId: "492980149757"
//   };
// Set up firebase
// 
console.log(config);
let db = firebase.database();
let classLevel = "Classes";
let profLevel = "Professors";
let classref = db.ref(classLevel);
let profref = db.ref(profLevel);

// Go through each line and parse it adding to firebase.
// lineReader.eachLine(file, (line, lastLine) => {
//     if (line) {
//         parseLine(line, lastLine);
//     }
// });


/**
 * Parse each line into tokens and put the information into the
 * firebase application.
 * 
 * @param line, the line to process
 */
function parseLine(line, lastLine) {
    // Parse each token in the line.
    let tokens = line.split(",");
    let professor = tokens[0].replace(".", "").replace(" ","_").replace(".","");
    console.log(professor);
    let course = tokens[1];
    let rating = tokens[2].replace("[", "").replace("]","").split(" ");
    let quarter = tokens[3];
    let numSurveyed = tokens[4];
    let ratingObj = {};

    // Every rating has at least 4 fields.
    ratingObj["overall"] = rating[0];
    ratingObj["content"] = rating[1];
    ratingObj["contribution"] = rating[2];
    ratingObj["effective"] = rating[3];

    // Prepare this object to be added to firebase
    let courseInfo = {
        quarter: quarter,
        rating: ratingObj,
        numSurveyed: numSurveyed
    }

    // Add the mapping from course to professor
    let currClassRef = db.ref(`${classLevel}/${course}/${professor}`);
    currClassRef.push(courseInfo)
    .then (handleSuccess)
    .catch (handleErr);

    // Add the mapping from professor to course
    currClassRef = db.ref(`${profLevel}/${professor}/${course}`);
    currClassRef.push(courseInfo)
    .then (handleSuccess)
    .catch (handleErr);
}

function handleErr(err) {
    console.log(err);
}

function handleSuccess(data) {
    console.log("data pushed");
}


