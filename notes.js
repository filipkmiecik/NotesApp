String.prototype.hashCode = function () {
  var hash = 0, i, chr
  if (this.length === 0) return hash
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }
  return hash
}
let note = {
  title: document.querySelector('#noteTitle'),
  text: document.querySelector('#noteText'),
  color: document.querySelector('#noteColor')
}
noteSubmit = document.querySelector('#noteSubmit')
clearNotes = document.querySelector('#clearNotes')

const noteContainer = document.querySelector('#noteContainer')

let notesCollection = new noteLoad()

if (notesCollection.entries.length > 0) {
  notesCollection.entries.forEach(entry => {
    new noteAdd(entry.id, entry.title, entry.text, entry.color)
  })
}

function addData() {
  let title = note.title.value
  let text = note.text.value
  let color = note.color.value

  let id = JSON.stringify({ title, text, color }).hashCode()
  if (note.title.value && note.text.value != '') {

    new noteAdd(id, title, text, color)
    new noteSave(id, title, text, color)

    note.title.value = ''
    note.text.value = ''
  }
}

clearNotes.addEventListener('click', function () {
  localStorage.clear()
  while (noteContainer.firstChild) {
    noteContainer.removeChild(noteContainer.firstChild)
  }
})

noteSubmit.addEventListener('click', addData)

function addDeleteButton(deleteButton) {
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation()
    new noteDelete(e)
  })
}
