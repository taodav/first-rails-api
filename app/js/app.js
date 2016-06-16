$(document).ready(function() {
  // Grab the template script

  localStorage.setItem("badges", "");

    setTemplate(setCookie)
  // Fix this for miniQuery NOT POSSIBLE

});


function setCookie(){
    var user_id = (function(){
    var id = 0
    return function(){
      return id += 1
    }
  })()
    document.cookie = "user_id=" + user_id()
    return user_id()
}

function setTemplate(user_id){
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
      clickStudent(context)
    });
}

function clickStudent(context){
    $('a').on('click', function(e) {
    e.preventDefault();
    var that = new minQuery(this)
    $.ajax({
      url: "http://localhost:3000/students/" + that.attr('id'),
      method: "GET"
    }).done(function(response) {
      // console.log(!($('.badges').element in window))
      // if (!($('.badges').element in window)) {
        var res = JSON.parse(response);
        context.badges = res.badges;

        var badgesList = document.createElement("ul")
        badgesList.className = "badges";


        for (badge of res.badges) {
          var paragraph = document.createElement("li");
          var badgeContent = document.createTextNode(badge.content + ": " +badge.points + " points");
          paragraph.appendChild(badgeContent);
          var form = $('#voteForm').element.cloneNode(true);
          form.setAttribute('id', 'voteForm-' + badge.id);
          var children = form.children;


          for (var i=0; i<children.length; i++) {
            children[i].setAttribute('id', children[i].id + '-' + badge.id);
          }
          badgesList.appendChild(paragraph);
          badgesList.appendChild(form);
        }

        document.getElementById("student-" + res.id).appendChild(badgesList);
        $('.voteForm').on("submit", function(e){
          e.preventDefault();
          var data = new FormData(this);

          var that = new minQuery(this);

          console.log(that);
          console.log(this);
          var theId = that.attr('id').replace(/[\D]*/g, "");
          var voteType = this.children[0].value;
          var theUrl = "http://localhost:3000/badges/" + theId + "/vote";
          var theData = "vote%5Bvote_type%5D=" + voteType + "&vote%5Buser_id%5D=1"// + user_id()
          console.log(voteType);

          // Do not submit vote if it is already present in the local storage
          if (localStorage.getItem("badges").split(" ").includes(theId)) {
            return;
          }

          $.ajax({
            url: theUrl,
            method: that.attr('method'),
            data: theData//JSON.stringify({vote: {vote_type: -1, user: '1'}})
          }).done(function(response) {
            console.log(response);
            var newBadges = localStorage.getItem("badges") + " " + theId;
            localStorage.setItem("badges", newBadges);
          });



        });
        // $('.voteForm').on('click', function(e){
        //   e.preventDefault();
        //   console.log("CLICK WAS CALLED")
        // });
      // } else {
        // $('.badges').hide()
      // }
      // var res = JSON.parse(response);
      // $('div#student-' + res.id).

    });

  });
}
