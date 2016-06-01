$(document).ready(function() {
  // Grab the template script
  var theTemplateScript = $("#students-list").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  var request = $.ajax({
    url: "http://localhost:3000/cohorts/1",
    method: "GET"
  });

  var context = {};

  request.done(function(response) {
    console.log()
    // context.students = JSON.parse(response);
    context.students = response;
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);
  });

  // Fix this for miniQuery
  $('body').on('click', 'a', function(e) {
    e.preventDefault();
    console.log("I've been clicked");

    $.ajax({
      url: "http://localhost:3000/students/" + $(this).attr('id'),
      method: "GET"
    }).done(function(response) {
      console.log(response);
      // var res = JSON.parse(response);
      var res = response;
      context.badges = res.badges;

      var badgesList = document.createElement("div");
      for (badge of res.badges) {
        var paragraph = document.createElement("p");
        var badgeContent = document.createTextNode(badge.content);
        paragraph.appendChild(badgeContent);
        console.log(paragraph);
        badgesList.appendChild(paragraph);
      }

      document.getElementById("student-" + res.id).appendChild(badgesList);
      // $('div#student-' + res.id).

    });

  });

});

