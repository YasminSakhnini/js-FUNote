import { $, create, timeString } from './helpers'
export class loginPage {
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
            <span>Username</span>
            <input class="usernameInput" type="text" name="username" value="yas">
          </form>
          <button type="button" class="login-button">Show my notes</button>
        </div>
      </div>
    `
  }
}

export class searchBar {
  constructor(whatElementToRenderTo, startPageInstance) {
    this.visible = false;
    this.startPageInstance = startPageInstance
    this.renderToElement = $(whatElementToRenderTo)
    this.addSearchEventHandler()
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
          <input type="text" class="search-input" placeholder="Search for your notes here...">
        </nav>
      </div>
    `
  }

  addSearchEventHandler() {
    listen('keyup', '.search-input', e => {
      if (e.keyCode == 8 && e.target.value.length == 0) {
        this.startPageInstance.render()
      }
    })
    listen('input', '.search-input', e => {
      // this.startPageInstance.render(e.target.value)
      this.startPageInstance.render(e.target.value)
    })
  }
}

export class navBar {
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
        <button type="button" class="log-out">&#128100;</button>
      </nav> 
    `
  }
}

export class startPage {
  constructor(whatElementToRenderTo) {
    this.visible = false
    this.renderToElement = $(whatElementToRenderTo)
    this.username = store.current
  }
  setVisibility(state = true) {
    this.username = store.current
    this.notes = this.fetchNotes()
    this.visible = state
    this.renderToElement.innerHTML = this.render()
  }

  render(search = null) {

    let html = `
    <div class="${this.visible ? '' : 'hidden'}">
      <div>Welcome <b>${this.username}</b>, here are you notes..</div>
      <div class="notes">
        <div class="note-cards flex flex-column">
          ${this.renderNotes(search)} 
        </div>
      </div>
    </div>
    `
    this.renderToElement.innerHTML = html
    return html
  }

  fetchNotes() {
    let notes = store.notes.filter(notes => {
      if (notes.owner == this.username) return true;
    })
    // YASMIN! IN ALL JS FUNCTIONS AND METHODS, if WE do not return something, IT will be undefined to whoever called it!!!!!!
    return notes
  }

  renderNotes(search = null) {
    let html = ''

    if (search) {
      let search_value = new RegExp(search, 'ig')
      let search_results = []

      this.notes.map(note => {
        if (search_value.test(note.title)) {
          search_results.push(note)
        }
      })

      if (search_results.length != 0) {
        search_results.map(result => {
          html += createNoteHtml(result)
        })
        // this.renderToElement.innerHTML = html
      } else {
        // this.renderToElement.innerHTML = this.renderNotes()
      }
    } else {
      this.notes.map(note => {
        html += createNoteHtml(note)
      })
    }

    function createNoteHtml(note) {
      return `
      <div>
        <span href="/" class="flex a">
          <span>${note.isFavorite ? '&#x2605;' : '&#x2606;'}</span>
          <h3 data-key="${note.id}" class="note-card">${note.title}</h3>
        </span>
      </div>
      `
    }

    // this.renderToElement.innerHTML = html
    return html
  }
}

export class editNote {
  constructor(whatElementToRenderTo) {
    this.renderToElement = $(whatElementToRenderTo)
  }

  newNote() {
    let html =
      `
        <input type="text" class="note-title-input" placeholder="Note title...">
        <div class="noteWrapper">
          <div id="editor"> </div>
          <button type="button" class="save-note">Save note</button>
          <button type="button" class="close-note">Close</button>
        </div>
      `
    this.render(html)
    // Not passing any params to line below, so it will be treated as new
    this.addQuillEventHandler()
  }

  editNote(note) {
    this.note = note
    let html =
      `
        <div class="noteWrapper">
          <input type="text" class="note-title-input" value="${note.title}">
          <div id="editor"></div>
          <button type="button" class="save-note">Update note</button>
          <button type="button" class="close-note">Close</button>
          <button type="button" class="delete-note" data-key="${note.id}">Delete note</button>
          <button type="button" class="favorite-note" data-key="${note.id}">${note.isFavorite ? '&#x2605;' : '&#x2606;'}</button>
        </div>
      `
    this.render(html)
    // Passing params to line below, so it will be treated as edit (not new)
    this.addQuillEventHandler(note)
  }

  saveNote(noteObjectToSave, id = null) {
    // console.table(noteObjectToSave)

    if (!id) {
      // If you did not pass in ID, this is just a new note
      store.notes.push(noteObjectToSave)
      store.save()
      startPageInstance.setVisibility()
    } else {
      // if you DID pass in id, then this must be a EDIT note, so we change position and push to history
      let editedNote = store.notes.filter(x => {
        if (x.id == id) return true
      })


      editedNote[0].title = noteObjectToSave.title
      editedNote[0].content = noteObjectToSave.content
      editedNote[0].flags = noteObjectToSave.flags
      store.save()
    }
    this.hide()
    startPageInstance.setVisibility()
  }

  toggleFavorit(id) {
    store.notes.map(note => {
      if (note.id == id) {
        note.isFavorite = !note.isFavorite
        this.editNote(note)
        startPageInstance.render()
      }
    })
    store.save()
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
          owner: store.current,
          flags: ['important'],
          title: $('.note-title-input').value || "Default note title " + new Date().toLocaleString('se'),
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
        console.log("HOW MANY")
        let note = {
          id: noteDataObj.id,
          flags: noteDataObj.flags,
          title: $('.note-title-input').value,
          content: quill.getContents()
        }
        // We have to save some reference that points to this of the class outside this block.
        // Because this inside the addEventListener we are in is pointing to THIS block not the outer one
        // So to access editNoteInstance variables we save a variable before this function that keeps a referece to the "class this"
        editNoteInstance.saveNote(note, note.id)
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