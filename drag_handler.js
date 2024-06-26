const drag_box=document.getElementById("drag_box")
const file_input = drag_box.querySelector("input#file_input")




drag_box.onclick=()=>{
  file_input.click()
}
file_input.onchange=(e)=>{
  for(let file of file_input.files){
    addfiletoList(file)
  }
  }


drag_box.ondragenter=(e)=>{
    drag_box.classList.add("drg_over");
    const drag_items=[...e.dataTransfer.items];


    let file_cunt = drag_items.filter(di=>di.kind=="file").length;
  

     drag_box.querySelector(".info").textContent=`Dropping ${file_cunt} ${file_cunt == 1 ? "file" : "files"}...`
}

drag_box.ondragleave=()=>{
    drag_box.classList.remove("drg_over")
    drag_box.querySelector(".info").textContent="Browse or Drag and Drop your Files Here"
}


drag_box.ondragover=(e)=>{
   
    e.stopPropagation()

    e.preventDefault();
    
    drag_box.classList.add("drg_over");
  
}



drag_box.ondrop=(e)=>{

e.stopPropagation()
e.preventDefault();
drag_box.classList.remove("drg_over")
drag_box.querySelector(".info").textContent="Browse or Drag and Drop Your Files Here";
console.log(e.dataTransfer);
[...e.dataTransfer.items].forEach((item, i) => {
    // If dropped items aren't files, reject them
  
    if (item.kind === "file") {
      const file = item.getAsFile();
      const entry = item.webkitGetAsEntry();
     
      addfiletoList(file);
    }
  })


}


function addfiletoList(file){
  let file_row_template=document.getElementById("file_row")
  let clone=file_row_template.content.cloneNode(true)
  clone.querySelector("li").title=file.name
  clone.querySelector(".name").textContent=file.name;
  clone.querySelector(".size").textContent=file.size;

  let link=clone.querySelector("a")
  link.download=file.name;
  link.href=URL.createObjectURL(file)
  document.querySelector("#file_list_box [role=list]").appendChild(clone)


 

}