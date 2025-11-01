const todoitem=document.getElementById("todoitem");
const additem=document.getElementById("additem");
const updateitembtn=document.getElementById("updateitembtn");
const ulid=document.getElementById("ulid");
const todoform=document.getElementById("todoform");
let cl=console.log;
let todoarr;
if(localStorage.getItem("todoarr")){
   todoarr = JSON.parse(localStorage.getItem("todoarr")); 
}else{
  todoarr = [];
}
cl(todoarr);

/*todoarr=[{
        item:'css',
        todoid:'e8c3eb94-85dd-4388-af3e-76bd39180b89'
        },
    {
        item:'html',
        todoid:'a4f5eb94-85dd-4388-af3e-76bd39180b12'
        }
    ];  */ 

const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}
console.log(uuid());

const createliarr=((arr)=>{
    r='';
    todoarr.forEach((li)=>{
        r+=` <li class="list-group-item d-flex justify-content-between" id=${li.todoid}>
                   <strong> ${li.item}</strong>
                    <div>
                    <i onclick="onedit(this)" class="fas fa-edit text-success"></i>
                     <i onclick="onremove(this)" class="fas fa-trash-alt text-danger"></i>
                </div></li> `;
    });
    ulid.innerHTML=r;

})
createliarr(todoarr);

let eid;
const onedit=(ele=>{
    eid=ele.closest('li').id;
    let eobj=todoarr.find(std=>{
        return std.todoid===eid;
    })
    console.log(eid);
    todoitem.value=eobj.item;

    additem.classList.add('d-none');
    updateitembtn.classList.remove('d-none');
})
const onremove=ele=>{
     let getcon=confirm(`are you sure`);
     console.log(getcon);
    if(getcon){ 
     let removeid=ele.closest('li').id;
    let geti=todoarr.findIndex(todo=>
    {
        return todo.todoid===removeid;
    });
    console.log(geti);

    todoarr.splice(geti,1);

    localStorage.setItem("todoarr", JSON.stringify(todoarr));
    ele.closest('li').remove();

    let timerInterval;
Swal.fire({
        title:'removed!',
        text:'details removed successfully',
        icon:'success',
        timer:2000,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      //timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.isconfirmed) {
    console.log(result);
  }
});

}
}

const onaddtodo=(eve)=>{
        console.log('ssbbbb');

    eve.preventDefault();
    let todoobj={
        item:todoitem.value,
        todoid:uuid()
    };
   todoform.reset();

    todoarr.push(todoobj);

    localStorage.setItem("todoarr", JSON.stringify(todoarr));
    createliarr(todoarr);
     swal.fire({
        title:'added',
        text:'details added successfully',
        icon:'success',
        timer:3000
    });
    console.log(todoarr);
    /*let li=document.createElement('li');
    li.id=todoobj.todoid;
    li.className='list-group-item d-flex justify-content-between';
    li.innerHTML=`<li class="list-group-item d-flex justify-content-between" id=${li.todoid}>
                    ${todoobj.item}
                    <div>
                    <i onclick="onedit(this)" class="fas fa-edit text-success"></i>
                     <i onclick="onremove(this)" class="fas fa-trash-alt text-danger"></i>
                </div></li> `;
    ulid.append(li);*/

}

const onupdate=()=>{
    console.log('sssss')
    let updateid=eid;
    let upob={
        item:todoitem.value,
        todoid:updateid
    };
    todoform.reset();
    let getindex=todoarr.findIndex(std=>std.todoid===updateid);
    console.log(eid);

    todoarr[getindex]=upob;
    localStorage.setItem("todoarr", JSON.stringify(todoarr));

    let li=document.getElementById(updateid);
    console.log(todoarr);
    li.firstElementChild.innerText=upob.item;
    updateitembtn.classList.add('d-none');
    additem.classList.remove('d-none');
    console.log(li.firstElementChild);
     swal.fire({
        title:'updated',
        text:'details updated successfully',
        icon:'success',
        timer:3000
    })
}


additem.addEventListener("click",onaddtodo);
updateitembtn.addEventListener("click" ,onupdate);


