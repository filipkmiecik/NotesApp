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
title : document.querySelector('#noteTitle'),
text : document.querySelector('#noteText'),
color: document.querySelector('#noteColor'),
addNote: document.querySelector('#noteSubmit')
}

let clearNotes = document.querySelector('#clearNotes')

const noteContainer = document.querySelector('#noteContainer')

let noteCollection = loadNotes()

if(noteCollection.entries.length > 0){
  noteCollection.entries.forEach(entry => {
    addEntry(entry.id, entry.title, entry.text, entry.color)
  })
}

function addData() {
    let title = note.title.value
    title.split(/((?:\w+ ){5})/g).filter(Boolean).join("\n")
    let text = note.text.value
    text.split(/((?:\w+ ){5})/g).filter(Boolean).join("\n")
    let color = note.color.value

    let id = JSON.stringify({ title, text, color }).hashCode()
    
    addEntry(id, title, text, color )
    saveNote(id, title, text, color )

    note.title.value = ''
    note.text.value = ''
    note.color.value = ''
}

function addDeleteButton(deleteButton) {
    deleteButton.addEventListener('click', function (e) {
        e.stopPropagation()
        deleteNote(e)
    });
}

function deleteNote(e) {
    let eventNote = e.target.parentNode,
    noteId = eventNote.getAttribute('data-index')

    eventNote.parentNode.removeChild(eventNote)
    deleteNote(noteId)
}

function addEntry(id, title, text, color){
  let note = document.createElement('div'),
      deleteButton = document.createElement('span'),
      noteText = `<div class='noteTitle'>${title}
    <p class="noteText>${text}</p></div>`;

  note.classList.add('userNote')
  note.classList.add(color)
  note.setAttribute('data-index', id)
    note.innerHTML = noteText
    deleteButton.classList.add('noteDelete')
    deleteButton.innerHTML = '&times;'

    note.appendChild(deleteButton);

    noteContainer.appendChild(note);

    addDeleteButton(deleteButton);

}

function loadNotes(){
  return JSON.parse(localStorage.getItem("items") ) || {
    title: "Notes",
    entries: []
  };
}

function saveNote(id, title, text, color){
  noteCollection.entries.push({id, title, text, color})
  saveNotes()
}

function deleteNote(id){
  let entries = noteCollection.entries.filter(entry => {
    return entry.id != id.toString() 
  })
  noteCollection.entries = entries

  saveNotes()
}
function saveNotes(){
  localStorage.setItem("items", JSON.stringify(noteCollection))
}

note.addNote.addEventListener('click', function (e) {
  console.log(e.target)
    e.preventDefault()
    if (note.title.value && note.text.value != '') {
        addNote()
    }
});

