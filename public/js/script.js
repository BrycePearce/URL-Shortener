// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Do things when the user clicks the "Submit" button.
    document.querySelector('#submit').addEventListener('click', function () {
        var numberOfSides;

        //parse function
        //numberOfSides = parseInt(document.querySelector('#primality-input').value, 10);

        //output to box
        console.log("click!");
        document.getElementById("url-output").innerText = 'test';
    }, false);
}, false);