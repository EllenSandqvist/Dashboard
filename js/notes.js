const noteBoard = document.getElementById('note-board');
const deleteNotesBtn = document.getElementById('delete-notes');
let noteText = localStorage.getItem('notes') || '';

//function to render notes
function renderNotes() {
    noteBoard.value = noteText;
}

//eventlistener on noteboard that "listens" to input
noteBoard.addEventListener('input', () => {
    noteText = noteBoard.value;
    
    //function for saving notes on localStorage
    saveToLocalStorage(noteText);
});

function saveToLocalStorage(text) {
    localStorage.setItem('notes', text);
}

//function for deleting notes
deleteNotesBtn.addEventListener('click', () => {
    const confirmDelete = confirm('Vill du verkligen radera alla anteckningar?');

    if (confirmDelete) {
        localStorage.clear();
        noteText = '';
        renderNotes(); 
    }
})

renderNotes();


