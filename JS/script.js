/**
 * @author Heather Kusmierz
 */

$(function() {
    $("#go").on("click", function(evt){
        $("#articles").empty();
        var searchQuery = $("#searchQuery").val();
        // Retrieves JSON format for a search (max 10 options) in a list format. data[0] is search team, data[1] are titles, data[2] are extracts, and data[3] are urls to Wiki page.
        var api = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&utf8=1&search=";
        var callback = "&callback=?";
        var apiFull = api + searchQuery + callback;
        $.getJSON(apiFull, function(data) {
            document.getElementById("searchQuery").value = '';
            if (data[1].length === 0) {
              $("#articles").html("<li class='panel panel-default'><h4>Sorry, no search results matched that query. Please try again!</h4></li>");
            } else {
              for (var i = 0; i < data[1].length; i++){
                var title = data[1][i];
                var extract = data[2][i];
                var url = data[3][i];
                $("#articles").append("<div class='panel panel-default'><a class='wikiLink' target='_blank' href='" + url + "'><div class='panel-heading'><b>" + title + "</b></div><div class='panel-body'>" + extract + "</div></a></div>");
              } // close for loop
            } // close else
        }); // close .getJSON
    });
});


// How to use Wiki's API:
// http://www.mediawiki.org/wiki/API:Main_page

// Random Wikipedia article webpage:
// http://en.wikipedia.org/wiki/Special:Random

// API URL: "https://en.wikipedia.org/w/api.php?action=query&titles=" + searchQuery + "&format=json&callback=?" 