$(document).ready(function() {
  // Grab the template script
  var theTemplateScript = $("#students-list").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context = {
    students: [
      { name: 'Homer'},
      { name: 'Peter'},
      { name: 'Eric'},
      { name: 'Kenny'},
      { name: 'Bart'}
    ],
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('.content-placeholder').html(theCompiledHtml);
});

