const drag_box=document.getElementById("drag_box")
const file_input = drag_box.querySelector("input#file_input")

try{

  if(navigator.userAgentData.mobile){
    drag_box.querySelector(".info").textContent="Browse your Files here"
  }
}
catch{

}


const def_file_icon="file_icons/file-earmark-text.svg"
const file_icon_map=new Map([
  ["image","file_icons/file-earmark-image.svg"],
  ["audio","file_icons/file-earmark-music.svg"],
  ["video","file_icons/file-earmark-play.svg"],
  ["",def_file_icon],
  ["text",def_file_icon],


  ['pdf',"file_icons/file-earmark-pdf-fill.svg"],
  ["zip","file_icons/file-earmark-zip-fill.svg"],
  
  ["xlsx","file_icons/file-earmark-spreadsheet.svg"],
  ["docx","file_icons/file-earmark-word-fill.svg"],
  [],
])


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



drag_box.ondrop= (e)=>{

e.stopPropagation()
e.preventDefault();
drag_box.classList.remove("drg_over")
drag_box.querySelector(".info").textContent="Browse or Drag and Drop Your Files Here";

[...e.dataTransfer.items].forEach( (item, i) => {
    // If dropped items aren't files, reject them
  
    if (item.kind === "file") {
      const file = item.getAsFile();
      const entry = item.webkitGetAsEntry();
     
      
      addfiletoList(file);
    }
  })


}




function addfiletoList(file){
  console.log(file)
  let file_row_template=document.getElementById("file_row")
  let clone=file_row_template.content.cloneNode(true)


  let icon_path="";
  if(file.type.split("/")[0]=="application"){
    icon_path = file_icon_map.get(file.name.split(".").pop());
  }
  else{
icon_path =file_icon_map.get(file.type.split("/")[0]);
  }
  

  
  clone.querySelector(".pic").src=icon_path;
  clone.querySelector("li").title=file.name
  clone.querySelector(".name").textContent=file.name;
  
  clone.querySelector(".size").textContent=file.size;

  let link=clone.querySelector("a")
  link.download=file.name;
  link.href=URL.createObjectURL(file)
  document.querySelector("#file_list_box [role=list]").appendChild(clone)


 

}