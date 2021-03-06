$(document).ready(function() {


    var topics = ["kendrick lamar","jay-z","kanye west","schoolboy q","frank ocean","rihanna","asap rocky","drake","jermaine cole", "led zeppelin", "freddie mercury", "prince", "michael jackson"];


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
            // Gets rid of any previous gifs
            $("#gif-view").empty()

            var results = response.data
            // Loops through the objects containing the gifs and displays them onto the HTML
            for (var i = 0; i < results.length; i++) {
                // 
                var imgURL = results[i].images.fixed_height_still.url;
                var gifURL = results[i].images.fixed_height.url;

                var gifDiv = $("<div class='gifDiv'>");

                gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
            

                var image = $("<img>");
                image.attr("src", imgURL);
                image.attr("data-still", imgURL); // Still gif
                image.attr("data-animate", gifURL); // Animate gif
                image.attr("data-state", "still") // Sets the state of the gif to 'still'
                image.addClass("gif")
                gifDiv.append(image)
                $("#gif-view").append(gifDiv)

            }
        });
    } 

    // Adds the 'click' event-listener to all buttons with the class of 'gif-btn'
    $(document).on("click", ".gif-btn", displayGif);

    // Click event-listener for the gif images
    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate")); // Changes the gif to the 'animate' state
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still")); // Changes the gif to the 'still' state
            $(this).attr("data-state", "still")
        }
        console.log(this)
    });

    $("#add-gif").on("click", function(event){
        // Prevents the form button from actually submitting the input
        event.preventDefault();
        // Grabs input from the textbox
        userInput = $("#gif-input").val().trim();
        // Pushes the user input into the topics array
        topics.push(userInput);
        // Creates a button for the user input
        renderButtons();
    });
    
});
