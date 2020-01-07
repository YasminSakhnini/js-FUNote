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

// ### NOTES
let note = {
  id: "random",
  created: "date",
  owner: "username",
  flags: ['important', 'funny', 'work', 'private', 'todo'],
  title: "string",
  content: "stringified quill object",
  versions: [note, note]
}

// ### USER
let user = {
  username: "email | unique"
}

