// Importing sass files
import '../sass/index.scss'

// Initialize database
let notes = localStorage.getItem('notes') || null

if (!notes) {
  localStorage.setItem('notes', JSON.stringify([]))
  notes = localStorage.getItem('notes')
} else {
  // console.log("Was already there")
}

notes = JSON.parse(notes)
// console.log(notes)


var quill = new Quill('#editor', {
  theme: 'snow'
});


let saveNoteBtn = document.querySelector('.save-note')
let restoreNoteBtn = document.querySelector('.restore-note')
let newNoteTitle = document.querySelector('.new-note-title')

saveNoteBtn.addEventListener('click', function (e) {
  let keyOfDatabase = newNoteTitle.value || "note"
  // localStorage.setItem(keyOfDatabase, JSON.stringify(quill.getContents()));

  let noteData = {
    title: keyOfDatabase,
    data: quill.getContents()
  }
  notes.push(noteData)
  console.log("Notes after save", notes)
  localStorage.setItem('notes', JSON.stringify(notes))

})

restoreNoteBtn.addEventListener('click', function (e) {
  let data = localStorage.getItem('note');
  data = JSON.parse(data)
  quill.setContents(data)
})


let aButton = document.querySelector('.a')


aButton.addEventListener('click', function (e) {
  e.preventDefault();
  let key = e.target.getAttribute('data-key')
  // console.log(key)
  let chosen = notes.filter(note => {
    console.log(note)
    if (note.title === key) return true
  })

  let thisNote = chosen[0];
  quill.setContents(thisNote.data)
})




// notes.map(note => {
//   console.log(note)
// })

