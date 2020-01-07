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
            <span>Username (email)</span>
            <input class="usernameInput" type="email" name="username" value="yas">
          </form>
          <button type="button" class="login-button">Show my notes</button>
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
    this.state = {

    }
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
        <button type="button" class="button-round addNote">&#10133;</button>
        <button class="favorite-btn" type="button">&#10025;</button>
        <button type="button">&#128100;</button>
      </nav> 
    `
  }
}

class startPage {
  constructor(whatElementToRenderTo) {
    this.visible = false
    this.renderToElement = $(whatElementToRenderTo)
  }
  setVisibility(state = true) {
    this.username = username
    this.notes = this.fetchNotes()
    this.visible = state
    this.renderToElement.innerHTML = this.render()
  }

  render() {
    return `
    <div>Welcome <b>${this.username}</b>, here are you notes..</div>
    <div class="notes">
      <div class="note-cards flex flex-column">
        ${this.renderNotes()} 
      </div>
    </div>
    `
  }

  fetchNotes() {
    let notes = store.notes.filter(notes => {
      if (notes.owner === this.username) return true;
    })
    // YASMIN! IN ALL JS FUNCTIONS AND METHODS, if WE do not return something, IT will be undefined to whoever called it!!!!!!
    return notes
  }

  renderNotes() {
    let html = ''

    this.notes.map(note => {
      html += `
      <div class="note-card">
        <a href="/" class="flex a">
          <span>&#128196;</span>
          <h3 data-key="${note.id}">${note.title} - created ${note.created}</h3>
        </a>
      </div>
      `
    })

    return html
  }
}

class editNote {
  constructor(whatElementToRenderTo) {
    this.visible = true;
    this.renderToElement = $(whatElementToRenderTo)
  }

  setVisibility(state = true) {
    this.visible = state
    this.render()
  }

  render(data = []) {
    let html = ''
    data.map(note => {
      html +=
        `
        <div class="noteWrapper ${this.visible ? '' : 'hidden'}">
          <div> ${note.title}</div >
          <div id="editor"> </div>
          <button type="button" class="save-note">Save note</button>
        </div>
      `
    })

    this.renderToElement.innerHTML = html
    this.addQuillEventHandler(data[0])
    return html
  }

  addQuillEventHandler(noteDataObj) {
    this.quill = new Quill('#editor', {
      theme: 'snow'
    })
    let quill = this.quill


    let saveNoteBtn = document.querySelector('.save-note')
    saveNoteBtn.addEventListener('click', function (e) {
      console.log("Notes after save", quill.getContents())
      noteDataObj.content = JSON.stringify(quill.getContents())
      console.log(JSON.parse(noteDataObj.content))
    })

    
  }
}

// LOGIN PAGE EXAMPLE OF INJECTING TO HTML DOCUMENT WITH CLASS
let username
let loginPageInstance = new loginPage('.login')
let searchBarInstance = new searchBar('.search')
let navBarInstance = new navBar('.navbar')
let startPageInstance = new startPage('.startPage')
let editNoteInstance = new editNote('.noteView')

// Run this method to show login when page loads first time
loginPageInstance.setVisibility(true)





listen('click', '.login-button', (e) => {
  e.preventDefault()
  // Check if user exists
  username = $('.usernameInput').value

  if (!username) {
    alert("Must have username")
    return
  }
  let DBuser = store.users.filter(user => {
    // FILTER will save any data in the loop  when "return true" is present
    // Save will be to whatever variable the filter is store to, in this case: DBuser
    if (user.username === username) return true
  })

  // if no: create user 
  if (DBuser.length !== 1) {
    // console.error("USER NOT FOUND")
    store.users.push({ username: username })
    store.save()
  }

  // if yes: show startpage
  loginPageInstance.setVisibility(false)
  searchBarInstance.setVisibility(true)
  navBarInstance.setVisibility(true)
  startPageInstance.setVisibility(true)
})

listen('click', '.addNote', (e) => {
  console.log("CLICKED ADDNOTE")
})

listen('click', '.note-card', (e) => {
  e.preventDefault()
  // Get data-key of clicked element
  let clickedNoteId = e.target.getAttribute('data-key')

  // Fetch the notes of the signed in user (all of them)
  let notesOfThisUser = startPageInstance.fetchNotes()

  // Filter out the one MATCHING our clicked
  let thisNote = notesOfThisUser.filter(note => {
    if (note.id == clickedNoteId) return true
  })

  editNoteInstance.render(thisNote)

})

document.querySelector('.login-button').click()


// store.notes.map(note => {
//   note.content = '{"ops":[{"attributes":{"bold":true},"insert":"tgytryrt  trhyuytujyt "},{"insert":"gyhjhj\n"}]}'
// })
// console.log(store.notes)
// store.save()
