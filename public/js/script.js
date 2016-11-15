// All the code below will be run once the page content finishes loading.
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // process the form when "submit" button is clicked
    $('form[name=urlForm]').submit(function (event) {
        // get the data in the form
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
            //element[attribute=value]
            'name': $('input[name=url]').val(),
        };
        //this is the request
        console.log("your request data -> ", formData.name);
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/createShorter', // the url where we want to POST
            data: formData, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            encode: true
        })

            // using the 'done' promise callback
            .done(function (data) {
                // log data to the console so we can see
                console.log("done: ", data.shortID);
               $('#url-output').text("localhost:3000/" + data.shortID);
                // here we will handle errors and validation messages
            });
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });
}, false);