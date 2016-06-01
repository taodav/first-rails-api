/*!
 * minQuery
 */

// class minQuery {
var finder = (function(){
  // constructor(selector){
  //   this.findSelector(selector)
  // }
  var element = ''
  return {
    findSelector: function(selector) {
      if (selector.constructor == HTMLDocument){
        return element = selector
      } else {
        if (findElement(selector)){
          // console.log(selector)
          return findElement(selector)
        }
        return findAttr(selector)
        // return element
      }
    }
  }

    function findElement(selector){
      if (selector.charAt(0) !== '.' && selector.charAt(0) !== '#' ) {
        var tag = selector.replace(/[.].*|[#].*/g, '')
        console.log(document.getElementsByTagName(tag))
        return document.getElementsByTagName(tag)
      } else {
        return false
      }

    }

    function findAttr(selector) {
      if (selector.includes('#')){
        var id = selector.replace(/\S*[#]/g, '')
        // for (var i = 0; i<element.length; i++){
          // if (element[i].id == id) {
          //   element = element[i]
          // }
        // }
        return document.getElementById(id)
      } else if (selector.includes('.')) {
        var klass = selector.replace(/\S*[.]/g, '')
        return document.getElementsByClassName(klass)[0]
        // var matching = new Array
        // for (var i = 0; i<element.length; i++){
        //   if (element[i].className == klass) {
        //     matching.push(element[i])
        //   }
        // }
        // element = matching
      } else {
        element = document.getElementsByTagName(selector)
      }
    }

})()


function minQuery(element){
  this.element = element
  return {
    element: this.element,
    hide: () => this.element.style.display = 'none',
    show: () => this.element.style.display = "initial",
    addClass: (className) => this.element.setAttribute('class', className),
    removeClass: (className) => this.element.removeAttribute('class', className),
    on: (...args) => {
      if (args[2]){
        var children = this.element.children
        for (var i = 0; i<children.length; i++) {
          console.log(children[i].tagName)
          // console.log(args[1].toUpperCase())
          if (children[i].tagName == args[1].toUpperCase()){
            console.log("BLAHBLAHBLAH")
            return children[i].addEventListener(args[0], args[2])
          }
        }
      } else {
        for (var i = 0; i<this.element.length; i++){
          this.element[i].addEventListener(args[0], args[1])
        }
      }
    },
    trigger: (event) => {
                    var event = new Event(event);
                    this.element.dispatchEvent(event)
                    },
    ready: (callback) => {
                            if (this.element.readyState) {
                              console.log('READYREADY');
                              callback();
                            } else {
                              console.error('Error in the DOM!');
                            }
                          },
    html: (htmlElement) => {
      if (htmlElement){
        this.element.innerHTML = htmlElement
      } else {
        // console.log(this.element)
        return this.element.innerHTML
      }
    },
    attr: (attribute) => {return this.element.getAttribute(attribute)}
  }
}
var $ = function(selector) {
  var element = finder.findSelector(selector)
  // console.log(element)
  var query = new minQuery(element)
  return query
}

// minQuery.prototype = ()

// })()


// functions on selectors
// HTMLElement.prototype.hide = function(){
//   this.style.display = "none"
// }

// HTMLElement.prototype.show = function(){
//   this.style.display = "initial"
// }

// HTMLElement.prototype.addClass = function(className){
//   this.setAttribute('class', className)
// }

// HTMLElement.prototype.removeClass = function(className){
//   this.removeAttribute('class', className)
// }

// HTMLElement.prototype.on = function(){
//   var callback = arguments[1]
//   this.addEventListener(arguments[0], callback)
// }

// HTMLElement.prototype.trigger = function(){
//   var event = new Event(arguments[0])
//   this.dispatchEvent(event)
// }

// HTMLDocument.prototype.ready = function(callback){
//   if (this.readyState) {
//     console.log('READYREADY')
//     callback()
//   } else {
//     console.error('Error in the DOM!')
//   }
// }

// DOLLAR SIGN SELECTOR
// function $(selector){
//   var listener = finder.findSelector(selector)
//   if (listener.element.constructor == Array && listener.element.length == 1){
//     if (listener.element.length == 1){
//       return listener.element[0]
//     }
//   } else {
//     return listener.element
//   }
// }



$.ajax = function(http){
  var promise = new Promise( function(resolve, reject){
    var req = makeCorsRequest(http.method, http.url)

    req.onload = function() {
      if (this.status >= 200 && this.status < 300){
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
    req.onerror = function() {
      reject(this.statusText)
    }
  });
  promise.done = promise.then
  promise.fail = promise.catch
  return promise;
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}
function makeCorsRequest(method, url) {
  // All HTML5 Rocks properties support CORS.

  var xhr = createCORSRequest(method, url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  // xhr.onload = function() {
  //   var text = xhr.responseText;
  //   var title = getTitle(text);
  //   alert('Response from CORS request to ' + url + ': ' + title);
  // };

  // xhr.onerror = function() {
  //   alert('Woops, there was an error making the request.');
  // };

  xhr.send();
  return xhr
}

