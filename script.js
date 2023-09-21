let initial = document.querySelector('#initial');
let birthDate = document.querySelector('#birthDate');
let address = document.querySelector('#address');
let number = document.querySelector('#number');
let faculty = document.querySelector('#faculty');
const btn = document.getElementById('btn')
const infoContainer = document.querySelector('.info_container');
let numberOfRow = 6;
let numberOfColumns = 6;
let tableContainer = document.querySelector('.table_container')
let colorPicker = document.querySelector('.colorPicker')
let elArray = [initial, number, faculty, birthDate, address];
let regExArray = [
  /([А-Яа-я]+) ([А-Яа-я-.]+) ([А-Яа-я-.]+)/g,
  /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/g,
  /([А-Я]+)/g,
  /(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).((19|20)\d\d)/g,
  /(м|с|смт). ([А-Я]{1}[а-яё]{1,23})/gm,
]

let tilesElem = [];


function checkIfValid(elArray, regExArray) {
  infoContainer.innerHTML = '';
  let boolArray = [];
  for (let i = 0; i < elArray.length; i++) {
    elArray[i].classList.remove('getNormal');
    elArray[i].classList.remove('getRed');
    if (elArray[i].value.match(regExArray[i])) {
      boolArray.push(1);
    } else {
      boolArray.push(0);
    }
  }

  if (boolArray.includes(0)) {
    for (let i = 0; i < boolArray.length; i++) {
      if (boolArray[i] === 0) {
        checkColor(i);
      }
    }
    boolArray = [];
  } else {
    infoContainer.innerHTML = '';
    let h2 = document.createElement('h2');
    h2.innerHTML = 'Ведені дані';
    infoContainer.append(h2);
    for (let i = 0; i < elArray.length; i++) {
      let par = document.createElement('p');
      par.innerHTML = document.getElementsByTagName('label')[i].textContent + elArray[i].value;
      elArray[i].classList.add('getNormal')
      infoContainer.append(par);
    }
    boolArray = [];
  }
}

function checkColor(index) {
  elArray[index].classList.remove('getNormal');
  elArray[index].classList.add('getRed');
}

btn.addEventListener('click', () => {
  checkIfValid(elArray, regExArray)
})


function createArray() {
  let gameRows = new Array(numberOfRow);
  for (let i = 0; i < numberOfRow; i++) {
    gameRows[i] = new Array(numberOfColumns);
    for (let j = 0; j < numberOfColumns; j++) {
      gameRows[i][j] = '';
    }
  }
  return gameRows;
}

let gameRows = createArray();
let counter = 1;
gameRows.forEach((gameRow, index) => {
  const rowElem = document.createElement('div');
  rowElem.setAttribute('id', 'row-' + index)
  rowElem.className = 'table_row';
  gameRow.forEach((square, squareIndex) => {
    if (counter <= 36) {
      const squareElem = document.createElement('div');
      squareElem.setAttribute('id', 'row-' + index + '-square-' + squareIndex);
      squareElem.className = 'tile';
      squareElem.innerHTML = `${counter}`;
      rowElem.append(squareElem);
      counter++;
      tilesElem.push('row-' + index + '-square-' + squareIndex)

    }
  })

  tableContainer.append(rowElem);
})


let myTile = document.querySelector('#row-1-square-4')

myTile.addEventListener('mouseover', () => {
  myTile.setAttribute('style', `background-color:#${randomColor()}`)
})

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

colorPicker.addEventListener("input", function () {
  let theColor = colorPicker.value;
  myTile.addEventListener('click', () => {
    myTile.setAttribute('style', `background-color:${theColor}`)
  })
}, false);

myTile.addEventListener('dblclick', () => {
  let tile = document.querySelectorAll(".tile");
  tile.forEach((el, index) => {
    const parts = el.id.split('-');
    const rowIndex = parseInt(parts[1]);
    const squareIndex = parseInt(parts[3]);
    if (rowIndex >= 1 && rowIndex <= 5 && squareIndex >= 0 && squareIndex <= 4) {
      el.setAttribute('style', 'background-color:#caa6b8');
    }
  });
});