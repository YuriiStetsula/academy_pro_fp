(function () {
  const data = [
    { name: 'TV', price: 300, date: '2018-10-10' },
    { name: 'laptop', price: 600, date: '2018-10-12' },
    { name: 'PC', price: 800, date: '2018-09-05' },
    { name: 'owen', price: 300 },
    { name: 'Camera', price: 500, date: '2018-03-03' },
    { name: 'Fridge', price: 1000, date: '2018-12-11' },
    { name: 'table', price: 150, date: '2018-12-10' },
    { name: 'Sofa', price: 400, date: '2018-12-10' },
    { name: 'chair', date: '2018-09-10' },
    { name: 'Window', price: 300, date: '2018-05-05' },
  ]

  //  ******lodash-fp*******

  const { curry, some, every, compose, reduce, map, filter, sortBy } = _

  //  **********************

  //  ******* helpers ******

  const capitalize = value => value && value[0].toUpperCase() + value.slice(1)
 
  const addSign = sign => value => `${sign}${value}` 

  const transformField = (key, fn, obj) => ({ ...obj, [key]: fn(obj[key]) })
  
  const validateField = (keys, filterMethod, fn, obj) => filterMethod(check(obj, fn))(keys)

  const checkField = (obj, fn, key) => fn(obj[key])
 
  const groupField = (key, obj, target) => ({
    ...obj,
    [target[key]]: [...(obj[target[key]] || []), target]
  })
       
  const exist = value => !!value

  const doesNotExist = (value) => !(exist(value))

  const getKeys = obj => Object.keys(obj)



  const gatherData = (getKeys, getMaxRowsCount, wrap, obj) => {
    return wrap(obj, getKeys(obj), getMaxRowsCount)
  }
   
  const wrap = (constructTable, constructHeader, constructBody, tr, td, th) => (obj, keys, getMaxRowsCount) => {
    return constructTable(constructHeader(keys, th))(
      constructBody(Array(getMaxRowsCount(obj, keys)).fill(0).map(constructTbody(tr, td, obj, keys)).join(''))
    ) 
  }

  const constructTable = header => body => `<table  border="1">${header}${body}</table>`

  const constructHeader = (keys, th) => {
    return `<thead>${tr(keys.map(th).join(''))}</thead>` 
  }

  const constructBody = (body) => {
    return `<tbody>${body}</tbody>`
  }
 
  const constructTableBody = (tr, td, obj, keys, key, index) => {
    return tr(keys.map(td(obj, index)).join(''))
  }

  const th = (value) => {
    return `<th>${value}</th>`
  }
  
  const tr = td => {
    return `<tr>${td}</tr>`
  }

  const buildTd = (obj, i, key) => {
    return obj[key][i] ? `<td>${obj[key][i].name} - ${obj[key][i].price}</td>` : `<td></td>`
  }

  const getMaxRowsCount = (obj, keys) => Math.max(...keys.map(key => obj[key].length))

  const td = curry(buildTd)

  const constructTbody = curry(constructTableBody)

  const gather = curry(gatherData)

  const transform = curry(transformField)

  const valid = curry(validateField)

  const check = curry(checkField)

  const groupBy = curry(groupField)





  // ********************
 const incorrect = filter(valid(['price', 'date'], some, doesNotExist))(data)
                
 
 const formData = compose(
    gather(getKeys, getMaxRowsCount, wrap(constructTable, constructHeader, constructBody, tr, td, th)),
    reduce(groupBy('date'), {}),
    sortBy('date'),
    map(transform('price', addSign('$'))),
    map(transform('name', capitalize)),
    filter(valid(['price', 'date'], every, exist))
   )


   console.log('incorrect row', incorrect)

   $api.render('main', formData(data))
  })()