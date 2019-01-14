(function () {

  window.$api = (function () {

    const render = (id, content) => {
      const div = document.getElementById(id)
      div.innerHTML = content
    }
    
    
    return {
      render
    }

  })()

})()