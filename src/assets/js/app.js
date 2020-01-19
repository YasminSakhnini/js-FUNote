// Importing sass files
import '../sass/index.scss'
import { $ } from './helpers'
import { startPage, loginPage, searchBar, navBar, editNote } from './classes'


// LOGIN PAGE EXAMPLE OF INJECTING TO HTML DOCUMENT WITH CLASS
let startPageInstance = new startPage('.startPage')
window.startPageInstance = startPageInstance
let loginPageInstance = new loginPage('.login')
let searchBarInstance = new searchBar('.search', startPageInstance)
let navBarInstance = new navBar('.navbar')
let editNoteInstance = new editNote('.noteView')


// Run this method to show login when page loads first time
loginPageInstance.setVisibility(true)



listen('click', '.login-button', (e) => {
  e.preventDefault()
  // Check if user exists
  let username = $('.usernameInput').value

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

  // Save username to "current" in localStorage so we can access it globally
  store.current = username
  store.save()

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
  let clickedNoteId = e.target.dataset.key

  // Fetch the notes of the signed in user (all of them)
  let notesOfThisUser = startPageInstance.fetchNotes()


  // Filter out the one MATCHING our clicked
  let thisNote = notesOfThisUser.filter(note => {
    if (note.id == clickedNoteId) return true
  })

  editNoteInstance.editNote(thisNote[0])
})

listen('click', '.close-note', e => {
  editNoteInstance.render() //Render method in this class only clears it lol
})

listen('click', '.favorite-note', e => {
  let id = e.target.dataset.key
  editNoteInstance.toggleFavorit(id)
})

listen('click', '.delete-note', e => {
  let idOfNoteToDelete = e.target.dataset.key

  // Remove this note from store by splicing it out
  store.notes.map((note, index) => {
    if (note.id == idOfNoteToDelete) {
      store.notes.splice(index, 1)
    }
  })

  store.save()
  editNoteInstance.render() //Render method in this class only clears it lol
  startPageInstance.setVisibility(true)
})

listen('click', '.log-out', e => {
  navBarInstance.setVisibility(false)
  startPageInstance.setVisibility(false)
  editNoteInstance.render() //Render method in this class only clears it lol
  searchBarInstance.setVisibility(false)
  loginPageInstance.setVisibility(true)
})

// $('.login-button').click()