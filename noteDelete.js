class noteDelete {
  constructor(e) {
    let eventNote = e.target.parentNode,
      noteId = eventNote.getAttribute('data-index')
    eventNote.parentNode.removeChild(eventNote)

    let entries = notesCollection.entries.filter(entry => {
      return entry.id != noteId.toString()
    })
    notesCollection.entries = entries
    localStorage.setItem("items", JSON.stringify(notesCollection))
  }
}