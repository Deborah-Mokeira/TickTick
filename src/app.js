//Creating a "close" button and appending it to each list item
const myToDoList=document.getElementsByTagName("LI");

for ( let i=0; i< myToDoList.length; i++ ) {//Initialize i
  const span=document.createElement("SPAN");
  const txt=document.createTextNode("\u00D7");
  span.className="close";
  span.appendChild(txt);
  myToDoList[i].appendChild(span);
}
//Click on a close button to hide the current list item
let close=document.getElementsByClassName("close");
for(let i=0; i< close.length; i++){
  close[i].onclick=function(){
    let div=this.parentElement;
    div.style.display="none";
  }
}
//Adding a "checked" symbol when a list item is clicked
let list=document.querySelector('ul');
list.addEventListener('click',function(ev){
  if(ev.target.tagName==='LI'){
    ev.target.classList.toggle('checked');
  }
},false);

//Create a new list item when clicking on the 'Add' button
function newElement(){
  let li=document.createElement("li");
  let inputValue=document.getElementById("myInput").value;
  let addedValue=document.createTextNode(inputValue);
  li.appendChild(addedValue);
  if(inputValue===''){
    alert("You must write something!");
  }else{
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value="";

  let span=document.createElement("SPAN");
  let txt=document.createTextNode("\u00D7");
  span.className="close";
  span.appendChild(txt);
  li.appendChild(span);

  for(let i=0; i< close.length; i++){
    close[i].onclick=function(){
      let div=this.parentElement;
      div.style.display="none";
    }
  }
}