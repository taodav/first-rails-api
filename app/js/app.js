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
    console.log(response);
    context.students = response;
    console.log(context);
    // Pass our data to the template
    var theCompiledHtml = theTemplate(context);

    // Add the compiled html to the page
    $('.content-placeholder').html(theCompiledHtml);
  });

});

