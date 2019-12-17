class noteAdd{
constructor(id, title, text, color) {
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
}