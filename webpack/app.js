import css from './index.css';
import fontCss from './fonts/iconfont.css';
// import("./index2.css").then(()=>{})
import("./c.js").then(()=>{})
import scss from './scss.scss';
import img1 from './img.png'
import img2 from './img2.jpg'
import img3 from './img3.png'

import jq  from "jquery"

console.log(jq)

const apptest = '222'

const xhr = new XMLHttpRequest()
xhr.open('get', "/proxy")
// xhr.send(null)
let img = new Image()
img.setAttribute('src', img2)
document.querySelector(".content").appendChild(img)

setTimeout(() => {
    console.log(3)
    const promise = new Promise(() => {
    })
    promise.then()
})