var time = moment().format('MMMM Do YYYY, h:mm:ss a');
document.querySelector("#currentDay").innerHTML = time;
let storage = [];
let x = "events";
let starter = JSON.parse(localStorage.getItem("events"));
if(starter !==null) storage = starter;
else localStorage.setItem("events",JSON.stringify([]));

let holder = document.querySelector(".container");
const times = ["9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];

const date = new Date();
const hour12 = date => (date.getHours() % 12 || 12);

let hour = hour12(date);

times.forEach(t=>{
    
    let matchingText =("");
    let textareaText = storage.find(a=> a.time == t);
    if(typeof textareaText == "object" ) matchingText = textareaText.value;
    let u = t.split("");
    let c = document.createElement("div");
    c.innerHTML = `
    <div class ="row justify-content-center">
        <p>${t}</p>
        <textarea class="col-md-10"Readonly>${matchingText}</textarea>
        <button class="saveBtn col-md-1">Save</button>
      </div>
      `
    
    
    c.classList.add("container");
    let d = c.querySelector("textarea");

    d.addEventListener("click",function(e){
        d.removeAttribute("Readonly");
    });

    let save = c.querySelector(".saveBtn");
    save.addEventListener("click",f=>{
        let text = d.value;
        let event = {
            time:t,
            value:text
        }
        storage.push(check(event))
        localStorage.setItem(x,JSON.stringify(storage));
    })

    if(u[0] == hour) d.classList.add("present");
    if(u[0]<hour) d.classList.add("past");
    if(u[0]>hour) d.classList.add("future");
    holder.appendChild(c);
});

const check = (obj) =>{
    let textareaText = storage.find(a=> a.time == obj.time);
    if(typeof textareaText == "object" ){
        storage.splice(storage.findIndex(b=> b.time == obj.time),1)
    
    }
    return obj
}