let store
try {
  store = JSON.parse(localStorage.store)
}
catch (e) {
  store = {}
}

store.save = function () {
  localStorage.store = JSON.stringify(this)
}

store.notes = store.notes || []
store.users = store.users || []
store.save()
// end of database check

window.store = store;




// SCHEMAS FOR DATASTRUCTURE

// ### NOTES (NEED TO ADD POSITION IF U WANT ALL VERSIONS TO BE SAVED UNDER ONE ENTRY)
let note = {
  id: "random",
  created: "date",
  owner: "username",
  flags: ['important', 'funny', 'work', 'private', 'todo'],
  title: "string",
  content: "stringified quill object",
  position: 0,
  versions: [note, note]
}

// ### USER
let user = {
  username: "email | unique"
}

