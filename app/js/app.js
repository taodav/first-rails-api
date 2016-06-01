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
      // context.students = JSON.parse(response);
      context.students = JSON.parse(response);
      // Pass our data to the template
      var theCompiledHtml = theTemplate(context);

      // Add the compiled html to the page
      $('.content-placeholder').html(theCompiledHtml);
      $('a').on('click', function(e) {
        //
        e.preventDefault();
        var that = new minQuery(this)
        $.ajax({
          url: "http://localhost:3000/students/" + that.attr('id'),
          method: "GET"
        }).done(function(response) {
          console.log($('.badges').element in window)
          if (!($('.badges').element in window)) {
          var res = JSON.parse(response);
          context.badges = res.badges;

          var badgesList = document.createElement("div")
          badgesList.className = "badges";
          for (badge of res.badges) {
            var paragraph = document.createElement("p");
            var badgeContent = document.createTextNode(badge.content);
            paragraph.appendChild(badgeContent);
            console.log(this);
            badgesList.appendChild(paragraph);
          }

          document.getElementById("student-" + res.id).appendChild(badgesList);
          } else {
            $('.badges').hide()
          }
          // var res = JSON.parse(response);
          // $('div#student-' + res.id).

        });

      });
    });

  // Fix this for miniQuery NOT POSSIBLE

});

