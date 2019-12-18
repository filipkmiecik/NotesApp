class noteLoad{
    constructor() {
        return JSON.parse(localStorage.getItem("items")) || {
        title: "Notes",
        entries: []
        }       
    }
}