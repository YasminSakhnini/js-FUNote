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
store.save()
// end of database check

let DBnotes = store.notes;