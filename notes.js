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

let notesCollection = loadNotes()

if (notesCollection.entries.length > 0) {
  notesCollection.entries.forEach(entry => {
    addNote(entry.id, entry.title, entry.text, entry.color)
  })
}

function addData() {
  let title = note.title.value
  let text = note.text.value
  let color = note.color.value

  let id = JSON.stringify({ title, text, color }).hashCode()
  if (note.title.value && note.text.value != '') {

    addNote(id, title, text, color)
    saveNote(id, title, text, color)

    note.title.value = ''
    note.text.value = ''
  }
}

function addNote(id, title, text, color) {
  let userNote = document.createElement('div')
  let deleteNote = document.createElement('span')
  let noteDate = new Date();
  let noteTime = ("0" + noteDate.getDate()).slice(-2) + "-" + ("0" + (noteDate.getMonth() + 1)).slice(-2) + "-" +
    noteDate.getFullYear() + " " + ("0" + noteDate.getHours()).slice(-2) + ":" + ("0" + noteDate.getMinutes()).slice(-2)
  deleteNote.classList.add('deleteNote')
  deleteNote.innerHTML = '&times;'

  userNote.classList.add('userNote')
  userNote.classList.add(color)
  userNote.setAttribute('data-index', id)
  userNote.innerHTML =
    `
    <h2>${title}</h2>
    <p>${text}</p>
    <p id='timestamp'>Added ${noteTime}</p>
    `
  noteContainer.appendChild(userNote)
  userNote.appendChild(deleteNote)
  addDeleteButton(deleteNote)
}

clearNotes.addEventListener('click', function () {
  localStorage.clear()
  while (noteContainer.firstChild) {
    noteContainer.removeChild(noteContainer.firstChild)
  }
})

noteSubmit.addEventListener('click', addData)

function saveNote(id, title, text, color) {
  notesCollection.entries.push({ id, title, text, color });
  saveNotes()
}

function saveNotes() {
  localStorage.setItem("items", JSON.stringify(notesCollection));
}

function loadNotes() {
  return JSON.parse(localStorage.getItem("items")) || {
    title: "Notes",
    entries: []
  };
}

function addDeleteButton(deleteButton) {
  deleteButton.addEventListener('click', function (e) {
    e.stopPropagation()
    deleteNote(e)
  })
}

function deleteData(id) {
  let entries = notesCollection.entries.filter(entry => {
    return entry.id != id.toString()
  })
  notesCollection.entries = entries;

  saveNotes();
}

function deleteNote(e) {
  let eventNote = e.target.parentNode,
    noteId = eventNote.getAttribute('data-index')

  eventNote.parentNode.removeChild(eventNote)
  deleteData(noteId)
}