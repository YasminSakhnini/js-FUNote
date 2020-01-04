// Importing sass files
import '../sass/index.scss'

//Helper Functions
function $(selector) {
  return document.querySelectorAll(selector)[0]
}

function create(element) {
  return document.createElement(element)
}
// End of helpers



class loginPage {
  constructor(whatElementToRenderTo) {
    this.visible = false;
    this.renderToElement = $(whatElementToRenderTo)
  }

  setVisibility(state = true) {
    this.visible = state
    this.renderToElement.innerHTML = this.render()
  }
  saveUserData() {

  }

  render() {
    return `
      <div class="login-wrapper flex flex-column flex-center ${this.visible ? '' : 'hidden'}">
        <div class="logo-img">
          <h1>FUNote</h1>
        </div>
        <div class="login-form flex flex-column">
          <form class="login-inputs flex flex-column">
            <span>Username</span> <input type="text" name="username"><br>
            <span>Password</span> <input type="password" name="password"><br>
          </form>
          <button type="button" class="login-button">Log in</button>
        </div>
      </div>
    `
  }
}

class searchBar {
  constructor(whatElementToRenderTo) {
    this.visible = false;
    this.renderToElement = $(whatElementToRenderTo)
  }

  setVisibility(state = true) {
    this.visible = state
    this.renderToElement.innerHTML = this.render()
  }

  render() {
    return `
      <div>
        <nav class="search flex ${this.visible ? '' : 'hidden'}">
          <button type="button">&#128269;</button>
          <input type="text" placeholder="Search for your notes here...">
        </nav>
      </div>
    `
  }
}

class navBar {
  constructor(whatElementToRenderTo) {
    this.visible = false;
    this.renderToElement = $(whatElementToRenderTo)
  }

  setVisibility(state = true) {
    this.visible = state
    this.renderToElement.innerHTML = this.render()
  }

  render() {
    return `
      <nav class="navbar flex flex-space-between ${this.visible ? '' : 'hidden'}">
        <button type="button">&#128196;</button>
        <button type="button">&#128269;</button>
        <button type="button" class="button-round">&#10133;</button>
        <button class="favorite-btn" type="button">&#10025;</button>
        <button type="button">&#128100;</button>
      </nav> 
    `
  }
}






// LOGIN PAGE EXAMPLE OF INJECTING TO HTML DOCUMENT WITH CLASS
let loginPageInstance = new loginPage('.login')
let searchBarInstance = new searchBar('.search')
let navBarInstance = new navBar('.navbar')

// Run this method to show login when page loads first time
loginPageInstance.setVisibility()

// Fetch the button from the DOM
let loginBtn = $('.login-button')

// We are simulating a login here
loginBtn.addEventListener('click', function (e) {
  e.preventDefault()
  loginPageInstance.setVisibility(false)
  searchBarInstance.setVisibility(true)
  navBarInstance.setVisibility(true)
})


// EOF LOGIN EXAMPLE






















// let quill = new Quill('#editor', {
//   theme: 'snow'
// });


// let saveNoteBtn = document.querySelector('.save-note')
// console.log("BTN?", saveNoteBtn)
// let restoreNoteBtn = document.querySelector('.restore-note')
// let newNoteTitle = document.querySelector('.new-note-title')

// saveNoteBtn.addEventListener('click', function (e) {
//   let keyOfDatabase = newNoteTitle.value || "note"
//   // localStorage.setItem(keyOfDatabase, JSON.stringify(quill.getContents()));

//   let noteData = {
//     title: keyOfDatabase,
//     data: quill.getContents()
//   }
//   notes.push(noteData)
//   console.log("Notes after save", notes)
//   localStorage.setItem('notes', JSON.stringify(notes))

// })

// restoreNoteBtn.addEventListener('click', function (e) {
//   let data = localStorage.getItem('note');
//   data = JSON.parse(data)
//   quill.setContents(data)
// })


// let aButton = document.querySelector('.a')


// aButton.addEventListener('click', function (e) {
//   e.preventDefault();
//   let key = e.target.getAttribute('data-key')
//   console.log(key)
//   let chosen = notes.filter(note => {
//     console.log(note)
//     if (note.title === key) return true
//   })

//   let thisNote = chosen[0];
//   quill.setContents(thisNote.data)
// })




// notes.map(note => {
//   console.log(note)
// })

