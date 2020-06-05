//Get HTML Element
const box = document.getElementById('box')
const cell = document.getElementsByTagName('td')
const score = document.getElementById("score")

//Tetris Shape
let startEnd = true
let countScore = 0
let lebar = 10
let mySound
let bentukL = [
  [2,1,lebar+1,(lebar*2)+1],
  [lebar, lebar+1, lebar + 2, (lebar*2)+2],
  [(lebar*2), (lebar*2)+1, lebar + 1, 1],
  [lebar, (lebar*2), (lebar*2)+1, (lebar*2)+ 2]
]
let bentukKaki = [
  [0,lebar,lebar+1,lebar*2+1],
  [lebar+1, lebar+2,lebar*2,lebar*2+1],
  [0,lebar,lebar+1,lebar*2+1],
  [lebar+1, lebar+2,lebar*2,lebar*2+1]

]
let bentukT = [
  [lebar, lebar+1, lebar+2, 1],
  [1,lebar+1,lebar+2,(lebar*2)+1],
  [lebar, lebar+1, lebar+2, (lebar*2)+1],
  [1,lebar,lebar+1,(lebar*2)+1]
]
let bentukKubus = [
  [0,1,lebar,lebar+1],
  [0,1,lebar,lebar+1],
  [0,1,lebar,lebar+1],
  [0,1,lebar,lebar+1]
]
let bentukI = [
  [1,lebar+1,(lebar*2)+1,(lebar*3)+1],
  [lebar, lebar+1, lebar+2, lebar+3],
  [1,lebar+1,(lebar*2)+1,(lebar*3)+1],
  [lebar, lebar+1, lebar+2, lebar+3],
]
let allShape = [bentukL, bentukKaki, bentukT, bentukKubus, bentukI]


//Starting Point & Shaping
let beginIndex = 4
let beginForm = 0

let randomShape = Math.floor(Math.random()*5)
let temp = allShape[randomShape][beginForm]

function shaping(arr,arr2){
  for(let i = 0; i < arr2.length; i++){
    if(randomShape === 0){
      arr[beginIndex + arr2[i]].style.backgroundColor = "yellow"
    }
    else if(randomShape === 1){
      arr[beginIndex + arr2[i]].style.backgroundColor = "pink"
    }
    else if(randomShape === 2){
      arr[beginIndex + arr2[i]].style.backgroundColor = "red"
    }
    else if(randomShape === 3){
      arr[beginIndex + arr2[i]].style.backgroundColor = "blue"
    }
    else if(randomShape === 4){
      arr[beginIndex + arr2[i]].style.backgroundColor = "green"
    }
  }
}
function hapus(arr){
  for(let i = 0; i < temp.length; i++){
    arr[beginIndex + temp[i]].style.backgroundColor = "transparent"
  }
}


shaping(cell,temp)


//Down Interval Time
document.addEventListener("keydown",function(){
  if(event.keyCode === 65){
    moveLeft()
  }
  else if(event.keyCode === 68){
    moveRight()
  }
  else if(event.keyCode === 87){
    changeShape()
  }
  else if(event.keyCode === 83){
      moveDown()

  }
})

function moveDown(){
  hapus(cell)
  beginIndex += lebar
  shaping(cell,temp)
  startAgain()

}

function startAgain(){
    for(let i = 0; i < temp.length; i++){
    let value = false
    if(cell[beginIndex + temp[i] + lebar].classList.contains("nonEmpty")){
      value = true
    }
    if(value === true){
      for(let j = 0; j < temp.length; j++){
        cell[beginIndex + temp[j]].classList.add("nonEmpty")
      }
      randomShape = Math.floor(Math.random()* 5)
      beginForm = 0
      temp = allShape[randomShape][beginForm]
      beginIndex = 4
      shaping(cell,temp)
      tambahScore()
      gameOver()
    }
  }
}

function tambahScore() {
  let value = true
  let indexJ = 199
  for(let i = 0; i < 20; i++){
    for(let j = indexJ; j > indexJ - 10; j--){
      if(cell[j].classList.contains("nonEmpty")){
        value = true
      }
      else{
        value = false
        break
      }
    }
    if(value === true){
      countScore += 10
      score.innerHTML = `Score: ${countScore}`

    }
    indexJ -= 10
  }

}

//Moving Shape Left, Right, Down
function changeShape(){
  hapus(cell)
  beginForm += 1
  if(beginForm === 4){
    beginForm = 0
  }
  temp = allShape[randomShape][beginForm]
  shaping(cell,temp)
}


function moveLeft(){
  hapus(cell)
  let value = false
  for(let i = 0; i < temp.length; i++){
    if((temp[i]+beginIndex) % lebar === 0){
      value = true
    }
    if(cell[beginIndex + temp[i]].classList.contains("nonEmpty")){
      value = true
    }
  }
  if(value === false){
    beginIndex -= 1
  }
  shaping(cell,temp)
}

function moveRight(){
  hapus(cell)
  let value = false
  for(let i = 0; i < temp.length; i++){
    if((temp[i]+beginIndex) % lebar === lebar - 1){
      value = true
    }
    if(cell[beginIndex + temp[i]].classList.contains("nonEmpty")){
      value = true
    }
  }
  if(value === false){
    beginIndex += 1
  }
  shaping(cell,temp)
}

let timerPause
const tombol2 = document.getElementById("tombol2")
tombol2.addEventListener("click",function(){
  if(timerPause){
    clearInterval(timerPause)
    timerPause = null
  }
  else{
    shaping(cell,temp)
    timerPause = setInterval(moveDown,1000)
  }
})

function gameOver() {
  let value = false
  for(let i = 0; i < temp.length; i++){
    if(cell[temp[i] + beginIndex].classList.contains("nonEmpty")){
      value = true
      break
    }
  }
  console.log(value)
  if(value === true){
    let status = document.getElementById("status")
    status.innerHTML = "Game Over"

    clearInterval(timerPause)
  }
}
