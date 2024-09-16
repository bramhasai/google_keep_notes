let allNote=document.querySelector(".allNotes");
let notes=[];

function initializeNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    try {
      notes = JSON.parse(storedNotes);
      if (!Array.isArray(notes)) {
        notes = []; // Reset if it's not an array
      }
    } catch (e) {
      notes = []; // Reset if parsing fails
    }
  }
}
// create note
document.querySelector("#createNote").addEventListener("click",()=>{
  let note={
    title:document.querySelector("#newTitle").value,
    textvalue:document.querySelector("#textArea").value
  }
  let classId="note"+Math.floor(Math.random()*1000);
  addtoLocalStorage(note,classId);
  render(note,classId);
});



//display on screen
function render(note,classId){
  if((note.title).trim()!="" && (note.textvalue).trim()!=""){
    const noteDiv=document.createElement("div");
    
    noteDiv.classList.add("note",classId);

    const title=document.createElement("h4");
    title.innerText=note.title;

    const textvalue=document.createElement("p");
    textvalue.innerText=note.textvalue;

    const Delete=document.createElement("button");
    Delete.id="deleteNote"
    Delete.innerText="Delete"

    const edit=document.createElement("button");
    edit.id="edit"
    edit.innerText="Edit"

    noteDiv.appendChild(title);
    noteDiv.appendChild(textvalue);
    noteDiv.appendChild(Delete);
    noteDiv.appendChild(edit)
    allNote.append(noteDiv);

    //delete note
    Delete.addEventListener("click",()=>{
      deleteNotebyId(note,classId);
    })

    edit.addEventListener("click",()=>{
      editNote(note,classId);
    })
    
    document.querySelector("#newTitle").value="";
    document.querySelector("#textArea").value="";

  }
  else{
    alert("Inputs fields should not be empty")
  }
}


//add to localstorage
function addtoLocalStorage(note,classId){
  if((note.title).trim()!="" && (note.textvalue).trim()!=""){
    note = { ...note, classId };
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  
}

//deleteall
document.querySelector(".deleteAll").addEventListener("click",()=>{
  document.querySelectorAll(".note").forEach(note=>{
    note.remove();
  });
  localStorage.clear();
  notes=[];
})

//delete note
function deleteNotebyId(note,id){
  document.querySelector("."+id).remove();
  notes=JSON.parse(localStorage.getItem('notes')) || [];
  let index=notes.findIndex(note=>note.classId===id);
  if(index!==-1){
    notes.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notes));
  }
}

//edit
function editNote(note,classId){
  document.querySelector("#newTitle").value=note.title;
  document.querySelector("#textArea").value=note.textvalue;
  deleteNotebyId(note,classId);
}


// render after refresh
function renderafterRefresh() {
  initializeNotes(); // Initialize notes from localStorage
  notes.forEach((note) => {
    render(note, note.classId);
  });
}

// Initialize and render notes on page load
initializeNotes();
renderafterRefresh();