(function () {

  window.tableAPI = (function () {

    // const id = 'main'
  
    const table = body => `<table  border="1">${body}</table>`

    const body = val =>  `<tbody>${val}</tbody>`
    
    const tr = val =>  `<tr>${val}</tr>`

    const td = val => `<td>${val}</td>`

 
    const render = (matrix, id) => {
      const div = document.getElementById(id)

      const content = table(body(matrix.map(item => tr(item.map(e => td(e.id)).join(''))).join('')))

      div.innerHTML = content
    }

    return {
      render
    }
  })()

} ())