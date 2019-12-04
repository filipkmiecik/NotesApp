let noteBase = localStorage.getItem('notes') ?
JSON.parse(localStorage.getItem('notes')) : []
localStorage.setItem('notes', JSON.stringify(noteBase))
const noteData = JSON.parse(localStorage.getItem('notes'))

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

title = document.querySelector('#noteTitle')
text = document.querySelector('#noteText')
color = document.querySelector('#noteColor')
noteSubmit = document.querySelector('#noteSubmit')
clearNotes = document.querySelector('#clearNotes')

const noteContainer = document.querySelector('#noteContainer')

function addNote() {
    let noteTitle = title.value
    let noteText = text.value
    let userNote = document.createElement('div')
    let deleteNote = document.createElement('span')
    let pinNote = document.createElement('span')
    var noteDate = new Date();
    var noteTime = ("0" + noteDate.getDate()).slice(-2) + "-" + ("0" + (noteDate.getMonth() + 1)).slice(-2) + "-" +
        noteDate.getFullYear() + " " + ("0" + noteDate.getHours()).slice(-2) + ":" + ("0" + noteDate.getMinutes()).slice(-2);
    deleteNote.classList.add('deleteNote')
    pinNote.classList.add('pinNote')
    deleteNote.innerHTML = '&times;'
    pinNote.innerHTML = '&raquo;'

    userNote.classList.add('userNote')
    userNote.innerHTML = 
    `
    <h2>${noteTitle}</h2>
    <p>${noteText}</p>
    <p id='timestamp'>Added ${noteTime}</p>
    `

    if (text.value != '') {
        noteContainer.appendChild(userNote)
        userNote.appendChild(pinNote)
        noteBase.push(userNote)
        noteBase.push({
            title: noteTitle,
            text: noteText,
            time: noteTime
        }) 
        localStorage.setItem('notes', JSON.stringify(noteBase))  
        title.value = ''
        text.value = ''
    }
}

clearNotes.addEventListener('click', function () {
    localStorage.clear()
    while (noteContainer.firstChild) {
        noteContainer.removeChild(noteContainer.firstChild)
    }
})

noteSubmit.addEventListener('click', addNote)

