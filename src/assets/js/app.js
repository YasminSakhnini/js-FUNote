// Importing sass files
import '../sass/index.scss'
//Helper Functions
function $(selector) {
  return document.querySelectorAll(selector)[0]
}
function timeString() {
  return new Date().toLocaleString()
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
    // IN ALL JS FUNCTIONS AND METHODS, if WE do not return something, IT will be undefined to whoever called it!!!!!!
    return notes
  }

  renderNotes() {
    let html = ''

    this.notes.map(note => {
      html += `
      <div class="note-card">
        <a href="/" class="flex a">
          <span>&#128196;</span>
          <h3 data-key="${note.id}">ID: ${note.id} =>  TITLE: ${note.title} => CREATED: ${note.created}</h3>
        </a>
      </div>
      `
    })

    return html
  }
}

class editNote {
  constructor(whatElementToRenderTo) {
    this.renderToElement = $(whatElementToRenderTo)
  }



  newNote() {
    let html =
      `
        <input type="text" placeholder="Note title...">
        <div class="noteWrapper">
          <div id="editor"> </div>
          <button type="button" class="save-note">Save note</button>
        </div>
      `
    this.render(html)
    // Not passing any params to line below, so it will be treated as new
    this.addQuillEventHandler()
  }

  editNote(note) {
    let html =
      `
        <div class="noteWrapper">
          <div> ${note.title}</div >
          <div id="editor"></div>
          <button type="button" class="save-note">Save note</button>
        </div>
      `
    this.render(html)
    // Passing params to line below, so it will be treated as edit (not new)
    this.addQuillEventHandler(note)
  }

  saveNote(noteObjectToSave, id = null) {
    console.table(noteObjectToSave)

    if (!id) {
      // If you did not pass in ID, this is just a new note
      store.notes.push(noteObjectToSave)
      store.save()
      this.hide()
      startPageInstance.setVisibility()
    } else {
      // if you DID pass in id, then this must be a EDIT note, so we change position and push to history
    }
  }

  addQuillEventHandler(noteDataObj) {

    // #editor and save button will be here regardless of "new" or "edit", so lets instantiate it and save btn pointer
    let quill = new Quill('#editor', {
      theme: 'snow'
    })

    let saveNoteBtn = document.querySelector('.save-note')
    let editNoteInstance = this

    // Check if noteDataObj is passed in (for new it is NOT, for edit it is)
    if (!noteDataObj) {
      // console.log("No data passet in, so this must be NEW operation")
      saveNoteBtn.addEventListener('click', function (e) {
        let note = {
          id: Date.now(),
          created: timeString(),
          owner: username,
          flags: ['important'],
          title: "Default note title",
          content: quill.getContents()
        }

        // We have to save some reference that points to this of the class outside this block.
        // Because this inside the addEventListener we are in is pointing to THIS block not the outer one
        // So to access editNoteInstance variables we save a variable before this function that keeps a referece to the "class this"
        editNoteInstance.saveNote(note)
      })
    } else {
      // console.log("Data is passed in, so this must be EDIT operation")
      // First let's set the content back, so we can edit it
      quill.setContents(noteDataObj.content)

      // NOW here we need to add evenetlistener for save (like the if block above), but this one should also put into versions
      // of course this will be a little different than the one above, but most things will still be SAME!

      // #### THIS IS NOT WORKING AS YOU WANT IN THE END RESULT, IT WILL CREATE A NEW NOTE, NOT A NEW VERSION! It is just for fun :D
      saveNoteBtn.addEventListener('click', function (e) {
        let note = {
          id: noteDataObj.id + 1,
          created: timeString(),
          owner: username,
          flags: noteDataObj.flags,
          title: noteDataObj.title + " edited: " + new Date().toLocaleString(),
          content: quill.getContents()
        }
        // We have to save some reference that points to this of the class outside this block.
        // Because this inside the addEventListener we are in is pointing to THIS block not the outer one
        // So to access editNoteInstance variables we save a variable before this function that keeps a referece to the "class this"
        editNoteInstance.saveNote(note)
      })
    }
  }

  hide() {
    // Running render WITHOUT passing in params will render empty string (or erasing it)
    // because render method has default value for html param to '', see the method
    this.render()
  }

  render(html = '') {
    this.renderToElement.innerHTML = html
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
  editNoteInstance.newNote()
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

  editNoteInstance.editNote(thisNote[0])

})

document.querySelector('.login-button').click()


// store.notes.map(note => {
//   note.content = '{"ops":[{"attributes":{"bold":true},"insert":"tgytryrt  trhyuytujyt "},{"insert":"gyhjhj\n"}]}'
// })
// console.log(store.notes)
// store.save()
