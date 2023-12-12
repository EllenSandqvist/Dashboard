const noteBoard = document.getElementById('note-board');
const deleteNotesBtn = document.getElementById('delete-notes');
let noteText = localStorage.getItem('notes') || '';

//function to render notes
function renderNotes() {
    noteBoard.textContent = noteText;
}

//eventlistener on notes that "listens" to input
noteBoard.addEventListener('input', (event) => {
    // event.preventDefault();
    noteText = noteBoard.value;
    
    addToLocalStorage(noteText);
    renderNotes();
});

//function for adding notes to localStorage
function addToLocalStorage(text) {
    localStorage.setItem('notes', text);
}

//function for deleting notes
deleteNotesBtn.addEventListener('click', () => {
    const confirmDelete = confirm('Vill du verkligen radera alla anteckningar?');

    if (confirmDelete) {
        localStorage.clear();
        noteText = '';
        /*renderNotes(); //FIXME - Varför funkar det först vid omladdninga av sidan?*/
        location.reload();
    }
})

renderNotes();

