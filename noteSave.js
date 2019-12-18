class noteSave{
    constructor(id, title, text, color)  {
        notesCollection.entries.push({ id, title, text, color })
        localStorage.setItem("items", JSON.stringify(notesCollection))
     }   
}