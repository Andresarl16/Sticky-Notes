if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
  }

let count = Number(window.localStorage.getItem("count"));
if(!count){
    window.localStorage.setItem("count","0")
}

createNote = (title,text) =>{

    document.getElementById("noNotes").classList.add("hidden");

    let li = document.createElement("li");
    let a = document.createElement("a");
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let button = document.createElement("button");
    let p = document.createElement("p");

    div.classList.add("noteT");
    button.classList.add("delete");

    let nTitle = document.createTextNode(title);
    let x = document.createTextNode("X");
    let nText = document.createTextNode(text);

    h2.appendChild(nTitle);
    button.appendChild(x);
    p.appendChild(nText);

    div.appendChild(h2);
    div.appendChild(button);

    a.appendChild(div);
    a.appendChild(p);
    a.setAttribute("href", "#")

    li.appendChild(a);

    document.getElementById("notes").appendChild(li);
}

recibeForm = (e) => {
    e.preventDefault();

    let title = document.getElementById("box-title").value;
    let text = document.getElementById("box-text").value;

    document.getElementById("box-title").value = "";
    document.getElementById("box-text").value = "";

    createNote(title,text)

    window.localStorage.setItem(count,title + "," + text);
    window.localStorage.setItem("count",++count);
}

document.getElementById("inputForm").addEventListener("submit", recibeForm, false);

removeNote = (e) => {
    if (e.target.classList.contains("delete")){
        if (true || confirm("¿Seguro que quieres eliminar la nota?")){
            let h2 = e.target.previousElementSibling;
            let p = e.target.parentElement.nextElementSibling;
            let li = e.target.parentElement.parentElement.parentElement;
            let ul = document.getElementById("notes");

            for(let i = 0; i < window.localStorage.length; i++){
                let key = window.localStorage.key(i);
                item = localStorage.getItem(key);
                if (item == (h2.innerText + "," + p.innerText)){
                    window.localStorage.removeItem(key);
                    break;
                }
            }

            ul.removeChild(li);

            if (ul.childElementCount == 0){
                document.getElementById("noNotes").classList.remove("hidden");
            }
        }
    }
}

document.getElementById("notes").addEventListener("click", removeNote);

for(let i = 0; i < window.localStorage.length; i++){
    let key = window.localStorage.key(i);
    if (key != "count"){
        let item = window.localStorage.getItem(key);
        let values = item.split(",");
        createNote(values[0],values[1]);
    }
}