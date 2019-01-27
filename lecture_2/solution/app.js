(function () {

  const data = [
    [
        { id: 0, row: 0, column: 0, position: 1 },
        { id: 1, row: 1, column: 0, position: 2 },
        { id: 2, row: 2, column: 0, position: 3 }
    ],
    [
        { id: 3, row: 0, column: 1, position: 4 },
        { id: 4, row: 1, column: 1, position: 5 },
        { id: 5, row: 2, column: 1, position: 6 }
    ],
    [
        { id: 6, row: 0, column: 2, position: 7 },
        { id: 7, row: 1, column: 2, position: 8 },
        { id: 8, row: 2, column: 2, position: 9 }
    ]
]

  //  ****** Ramda *******

  const { groupWith, sortBy, flatten, slice } = R
  const mapIndexed = R.addIndex(R.map);

//   //  **********************

const rearrangeMatrix = (table, newColumn, newRow, item) => {
     const {  id } = item
     const { position: newPosition } = table[newColumn][newRow]
     table = flatten(table)
     const filtered = table.filter((item) => item.id !== id);

     const reorderedItems = [
       ...(mapIndexed((item, index) => (
         {
          ...item, 
          position: 
          table[index].position, 
          row: table[index].row, 
          column: table[index].column
        }
         ), slice(0, newPosition - 1, filtered))),

       {...item, position: newPosition, row: newRow, column: newColumn},

       ...(mapIndexed((item, index) => (
          {
            ...item, 
            position: table[index + newPosition].position, 
            row: table[index + newPosition].row, 
            column: table[index + newPosition].column
          }
         ), slice(newPosition - 1, filtered.length, filtered))),
     ]
    
   return groupWith(groupProperty('column'), sortBy(sortProperty('column'), reorderedItems))
  } 
  

const groupProperty = prop => (a, b) => a[prop] === b[prop]

const sortProperty = prop => e => e[prop]

const printTable = (data, id) => {
  tableAPI.render(data, id)
}

/**
 *
 *  
 * 
 * 
 * 
 */

printTable(groupWith(groupProperty('row'), sortBy(sortProperty('row'), flatten(data))), 'first')

const newColumn = 2
const newRow = 2
const item = data[0][0]

printTable(groupWith(groupProperty('row'), sortBy(sortProperty('row'), flatten(rearrangeMatrix(data, newColumn, newRow, item)))), 'second')

console.log(data)
console.log(rearrangeMatrix(data, newColumn, newRow, item))
})()

