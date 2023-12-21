const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

let notes = document.querySelectorAll(".input-box");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";

    img.addEventListener("mousedown", (event) => {
        event.stopPropagation();
    });

    inputBox.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && isCaretAtStart(inputBox)) {
            event.preventDefault();
        }
    });

    notesContainer.appendChild(inputBox).appendChild(img);
});

function isCaretAtStart(element) {
    const selection = window.getSelection();
    return selection.rangeCount > 0 && selection.getRangeAt(0).startOffset === 0;
}

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage()
    }
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        })
    }
})
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})
