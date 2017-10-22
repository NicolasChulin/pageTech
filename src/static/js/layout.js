
;(function (window, document) {

  var base = {
    isEmptyObj: function(obj) {
      for (var i in obj) {
        return true
      }
      return false
    },
    extend: function(oldObj, newObj) {
      var extended = {}
      for(var i in oldObj){
        if (typeof oldObj[i] == 'object') {
          if (newObj[i] && typeof newObj[i] == 'object') {
            extended[i] = base.extend(oldObj[i], newObj[i])
          } else {
            extended[i] = base.extend(oldObj[i], {})
          }
        } else {
          extended[i] = newObj[i] ? newObj[i] : oldObj[i]
        }
      }
      return extended
    }
  }

  function Layout () {
    this.defualt = {
      time: 1500,
      confirm: {
        content: '',
        cancelText: '取消',
        confirmText: '确定',
        title: '信息确认',
        showTitle: false,
        btnBold: 'left',
        canceled: '',
        confirmed: ''
      }
    }
  }

  Layout.prototype.msg = function(content, time) {
    if (!time) {
      var time = this.defualt.time
    }
    var cont = document.createElement('div')
    var text = document.createTextNode(content)
    cont.setAttribute('class', 'layout-content')
    cont.appendChild(text)

    var box = document.createElement('div')
    box.setAttribute('class', 'layout-msg layout-msg-show')
    box.appendChild(cont)

    document.getElementsByTagName('body')[0].appendChild(box)
    setTimeout(function() {
      box.setAttribute('class', 'layout-msg')
      setTimeout(function() {
        box.parentNode.removeChild(box)
      }, 500)
    }, time)
  }

  Layout.prototype.confirm = function (options) {
    var opt = base.extend(this.defualt.confirm, options)

    if (opt.showTitle) {
      var title = document.createElement('div')
      var titleText = document.createTextNode(opt.title)
      title.setAttribute('class', 'layout-title')
      title.appendChild(titleText)
    }

    var cont = document.createElement('div')
    var text = document.createTextNode(opt.content)
    cont.setAttribute('class', 'layout-content')
    cont.appendChild(text)

    var btns = document.createElement('div')
    btns.setAttribute('class', 'layout-btns')

    var btn1 = document.createElement('span')
    text = document.createTextNode(opt.cancelText)
    if (opt.btnBold == 'left') {
      btn1.setAttribute('class', 'btn-bold')
    }
    btn1.appendChild(text)
    btns.appendChild(btn1)

    var btn2 = document.createElement('span')
    text = document.createTextNode(opt.confirmText)
    if (opt.btnBold == 'right') {
      btn2.setAttribute('class', 'btn-bold')
    }
    btn2.appendChild(text)
    btns.appendChild(btn2)

    var container = document.createElement('div')
    container.setAttribute('class', 'layout-container')
    if(opt.showTitle) container.appendChild(title)
    container.appendChild(cont)
    container.appendChild(btns)
    var confirm = document.createElement('div')
    confirm.setAttribute('class', 'layout-confirm')
    confirm.appendChild(container)

    document.getElementsByTagName('body')[0].appendChild(confirm)
    btn1.addEventListener('click', function() {
      confirm.parentNode.removeChild(confirm)
      if (typeof opt.canceled == 'function') opt.canceled()
    })
    btn2.addEventListener('click', function() {
      confirm.parentNode.removeChild(confirm)
      if (typeof opt.confirmed == 'function') opt.confirmed()
    })

  }

  window.Layout = new Layout()

})(window, document)

function layoutTips() {
  // Layout.msg('hello! my friend!')
  // tips('hello! my friend!', 1000)
  Layout.confirm({
    content: '您真的要离开吗？',
    cancelText: '我点错了',
    confirmText: '不想看了',
    showTitle: false,
    confirmed: function() {
      console.log('confirmed')
    }
  })
}
