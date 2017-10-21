
function layoutTips() {
  tips('hello! my friend!', 1000)
}


function tips(content, time) {
  var cont = document.createElement('div')
  var text = document.createTextNode(content)
  cont.setAttribute('class', 'layout-content')
  cont.appendChild(text)

  var msg = document.createElement('div')
  msg.setAttribute('class', 'layout-msg lay-show')
  msg.appendChild(cont)
  document.getElementsByTagName('body')[0].appendChild(msg)

  setTimeout(function() {
    msg.setAttribute('class', 'layout-msg')
    setTimeout(function() {
      msg.parentNode.removeChild(msg)
    }, 300)
  }, time)
}
