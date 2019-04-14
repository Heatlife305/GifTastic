$(document).ready(function() {


    var topics = ["kendrick lamar","jay-z","kanye west","schoolboy q","frank ocean","sza","asap rocky","drake","jermaine cole"];


    // This function will create and display a button for each artist in the topics array 
    function renderButtons() {

        // This ensures that repeat buttons aren't produced when adding new topics
        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

            // Creates button and holds it to the button var
            var button = $("<button>");
            // Adds a class to the button
            button.addClass("gif-btn");
            // Adds data attribute
            button.attr("data-name", topics[i]);
            // Provides the button text
            button.text(topics[i]);
            // Adds the buttons to the buttons-view div
            $("#buttons-view").append(button);
        }
    }
    // Calls the function
    renderButtons();

    function displayGif() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=HiJq64S5RTagFrBXID1CARNeZKwObzWc&limit=10";

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            // Creating a div to hold the gif
            var gifDiv = $("<div class='gifs'>");

            // This variable will hold the rating data
            var rating = response.data.rating;

            // Creates a text showing the gif rating 
            pOne = $("<p>").text("Rating: " + rating);

            //
            var imgURL = response.data[0].images.original_still
            console.log(imgURL)


            // Displays the rating 
            gifDiv.append(pOne);
            console.log(response)
            console.log(response.data[0].rating)

        });
    }
    
    $(document).on("click", ".gif-btn", displayGif);
});
