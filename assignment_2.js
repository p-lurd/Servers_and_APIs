// Assignment 2
// Using the FS module:

const fs = require("fs");
const path = require("path");

// Create directory/folder named: “Students”
fs.mkdir("./Students", function (err) {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("New directory successfully created.");
  }
});

// In the Students directory, create a file named user.js
fs.open("./Students/user.js", "w", function (err, file) {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("File Created!");
  }
});

//   Update the Students directory to “Names”
fs.rename("./Students", "./Names", function (err) {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("Directory successfully renamed.");
  }
});

// Add your name as content to the file user.js
fs.appendFile("./Names/user.js", "OBAYORI TOLUWANIMI .J", function (err) {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("Changes successfully made!");
  }
});

// Update the file and add your age, sex, nationality, phone number and any other information about yourself
fs.appendFile(
  "./Names/user.js",
  " \nage: 002; \nsex: male; \nnationality: \nNigerian; \nphone: 12345678; \nfavourites: coding and healthcare",
  function (err) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log("Changes successfully made!");
    }
  }
);

// Update the file user.js to {your_name}.js eg daniel_adesoji.js
fs.rename("./Names/user.js", "./Names/Obayori_Toluwanimi.js", function (err) {
  if (err) {
    console.log(err);
      return
  } else {
    console.log("File succesfully renamed.");
  }
});

// Read the contents from {your_name}.js. User fs.open or fs.readFile
fs.readFile("./Names/Obayori_Toluwanimi.js", 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return
  } else {
    console.log(data);
  }
});

// Delete the file {your_name}.js
fs.unlink("./Names/Obayori_Toluwanimi.js", (err) => {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("File succesfully removed!");
  }
}); // note to future self: rm can also be used to achieve this

// Delete the directory “Names”
fs.rmdir("./Names", (err) => {
  if (err) {
    console.log(err);
    return
  } else {
    console.log("Directory sucessfully deleted!");
  }
});
