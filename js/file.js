let btnAdd= document.querySelector("button[class=Add]")
let section = document.querySelector(".section-1")
let section2 = document.querySelector(".section-2")
let saveStudentButton = document.querySelector(".saveStudentButton")
let addStudentButton = document.querySelector(".addStudentButton")
let addDepartmentbutton = document.querySelector(".addDepartmentbutton")
let saveDepartmentButton = document.querySelector(".saveDepartmentButton")
// ----------------form1-------------------
let form1=document.querySelector(".form1")
let StudenttName = document.querySelector("#StudenttName")
let StudenttID = document.querySelector("#StudenttID")
let studentdepartment = document.querySelector("#studentdepartment")
// ----------------form2-------------------
let saveEdittButton=document.querySelector(".saveEdittButton")
let form2 = document.querySelector(".form2")
let saveEditedepart=document.querySelector(".saveEditedepart")
let table = document.querySelector("table")
let tableBody = document.querySelector("#tableBody")
let tableHead = document.querySelector("#tableHead")
let DepartmentInput = document.querySelector("#DepartmentInput")
let DepartmentInputId = document.querySelector("#DepartmentInputId")
let allstudent = [];
let headerUser = "";
let optionObject = "";
let clonTable="";
start()
loadDepartments() 
// --------------------------------------------
async function start() {
    let apiResponse = await fetch(`https://node-monge-iti-project.herokuapp.com/students`);//Async
    apiResponse = await apiResponse.json();
    allstudent = apiResponse;
    display()
}
// ---------------data-------------------------
function display()  {
    console.log("ahmed");
    headerUser = " ";
    tbodye = " ";
    tableHead.innerHTML = `
        <th>id</th>
        <th>Name</th>
        <th>Department</th>
        <th>Action</th>
    `
    for (let i = 0; i < allstudent.length; i++) {
        tbodye += `<tr>
        <td>${allstudent[i]._id}</td>
        <td>${allstudent[i].Name}</td>
        <td>${allstudent[i].Department==null?"No Department":allstudent[i].Department.Name }</td>
        <td>
        <button id="btndelete" onclick="deletef(this)" class="Delete" >Delete</button>
        <button id="btnEdite" onclick="eidteStudent(this)" class="Update" >Edite</button>
        </td>
        </tr>`
    }

    tableBody.innerHTML = tbodye
    console.log("end users");
}
btnAdd.addEventListener("click", function () {
    section.style.display="flex";
    saveEdittButton.style.display ="none"
    saveStudentButton.style.display = "inline-block"
    StudenttID.value = "";
    StudenttName.value = "";
    studentdepartment = "";
    

})
// --------------------Add Student--------------------------------------------
saveStudentButton.addEventListener("click", async function () {
    console.log(this);
if (StudenttName.value !="") {
    let response=await  fetch("https://node-monge-iti-project.herokuapp.com/students",{
        method:"post",
        body:JSON.stringify({name:StudenttName.value,department: studentdepartment.value}),
       // body:JSON.stringify({name:StudenttName.value,department: studentdepartment.options[studentdepartment.selectedIndex].innerTex}),
        headers:{"Content-Type":"application/json"}
    });
    let data =await response.json();
    console.log(data,typeof data);

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been Added',
        showConfirmButton: false,
        timer: 1500
    })
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch (e) {
        console.log(e);
        return e;
      }
    }
    else
{
    Swal.fire('PLZ fill all inputs')
    }

    
})
// -------------------------------------------------------
addStudentButton.addEventListener("click", async function () {
    form1.style.display="flex"
    form2.style.display = "none"
  
    // table.style.display="block"
    // tableHead.style.width="100%"
    // table.style.width="100%"
    // table.style.width="100%"
})
// --------------------load department--------------------------------------------
async function loadDepartments() {

    let response = await fetch("https://node-monge-iti-project.herokuapp.com/departments");
    let departments = await response.json();

    for (let dep of departments) {
        optionObject = document.createElement("option");
        optionObject.value = dep["_id"];
        optionObject.innerText = dep["Name"]
        studentdepartment.append(optionObject);
    }
}
addDepartmentbutton.addEventListener("click", async function () {
    
    form1.style.display="none"
    form2.style.display = "flex"
    // ----------------------------------------
    datadepartment()
    
})
async function datadepartment()
{
    let tbody=""
    let tableheader=document.createElement("thead")
    let tablebody = document.createElement("tbody")
    // ------------------- switch display---------------------------
    headerUser = " ";
    tableheader.innerHTML = `
    <th>id</th>
    <th>Department</th>
    <th>Action</th>
       `
    // -------------------clone table--------------------
     clonTable = table.cloneNode();
    clonTable.appendChild(tableheader)
    clonTable.appendChild(tablebody)
     console.log(clonTable);
     section2.appendChild(clonTable)
    table.style.display = "none";
    // ---------------------------------------------------
    let response = await fetch("https://node-monge-iti-project.herokuapp.com/departments");
    let departments = await response.json();
    for (let dep of departments) {
        tbody += `<tr>
        <td>${dep._id}</td>
        <td>${dep.Name}</td>
        <td>
        <button id="btndelete" onclick="deleteDepartment(this)" class="Delete" >Delete</button>
        <button id="btnEdite" onclick="eidteDepartmentt(this)" class="Update" >Edite</button>
        </td>
        </tr>`
    }
tablebody.innerHTML = tbody;
}
// ----------------- funcion Delete Departmen------------------------
async function deleteDepartment(e)
{
    
    await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
                 let response=  fetch("https://node-monge-iti-project.herokuapp.com/departments",{
                method:"delete",
                body:JSON.stringify({id:e.parentElement.parentElement.children[0].innerText}),
                headers:{"Content-Type":"application/json"}
    });
              
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
     
        }
      })
    start()
}
// ----------------- function Edit Departmen------------------------

function eidteDepartmentt(e)
{   
    
    DepartmentInputId.value=e.parentElement.parentElement.children[0].innerText
    DepartmentInput.value=e.parentElement.parentElement.children[1].innerText
    saveEditedepart.style.display = "inline-block"
    saveDepartmentButton.style.display = "none"
}
DepartmentInput.addEventListener("click", async function () {
    let response = await fetch("https://node-monge-iti-project.herokuapp.com/departments");
    let departments = await response.json();

    for (let dep of departments) {
        optionObject = document.createElement("option");
        optionObject.value = dep["_id"];
        optionObject.innerText = dep["Name"]
        DepartmentInput.append(optionObject);
    }
})
// ----------------- save Edit Departmen------------------------
saveEditedepart.addEventListener("click",async function(){
      let response=await  fetch("https://node-monge-iti-project.herokuapp.com/departments",{
        method:"put",
          body: JSON.stringify({ id: DepartmentInputId.value, name: DepartmentInput.value }),
        headers:{"Content-Type":"application/json"}
    });
    let data =await response.json();
    console.log(data,typeof data);

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been Added',
        showConfirmButton: false,
        timer: 1500
    })
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch (e) {
        console.log(e);
        return e;
    }
// ---------reload table---------------    
datadepartment()
})
//--------------------save Add department--------------------------------------------
saveDepartmentButton.addEventListener("click", async function () {   
    if (DepartmentInputId.value!=""&&DepartmentInput.value!="") {
        
        let response=await  fetch("https://node-monge-iti-project.herokuapp.com/departments",{
            method:"post",
            body:JSON.stringify({id:DepartmentInputId.value,name:DepartmentInput.value}),
            headers:{"Content-Type":"application/json"}
        });
        console.log(response.status);
        let data =await response.json();
        console.log(data,typeof data);
    
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been Added',
            showConfirmButton: false,
            timer: 1500
        })
        try {
            const newData = await response.json();
            console.log(newData);
            return newData;
          } catch (e) {
            console.log(e);
            return e;
          }
        //   function(err, user) {
        //     if (!user) {
        //       console.log("logged err");
        //         res.status(404);
 
        //         //Send error response here
        //       enter code here
        //     } else {
        //       console.log("login in");
        //     }  
    }
    else
    {
    Swal.fire('PLZ fill all inputs')
        
        }
})
// -------------------- delete student from table--------------------------------------------

 async function deletef(e)
{
   await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
                 let response=  fetch("https://node-monge-iti-project.herokuapp.com/students",{
                method:"delete",
                body:JSON.stringify({id:+e.parentElement.parentElement.children[0].innerText}),
                headers:{"Content-Type":"application/json"}
    });
              
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
     
        }
      })
    start()
      
}
// -------------------- Edit student table--------------------------------------------
async function eidteStudent(e) {
    section.style.display = "flex";
    saveEdittButton.style.display="inline-block"
     saveStudentButton.style.display="none"
    StudenttID.value=e.parentElement.parentElement.children[0].innerText;
    StudenttName.value=e.parentElement.parentElement.children[1].innerText;
    studentdepartment.innerHTML=`<option>${e.parentElement.parentElement.children[2].innerText}</option>`
}
// ------------------------Edit Department--------------------------------
studentdepartment.addEventListener("click", async function () {
    
    let response = await fetch("https://node-monge-iti-project.herokuapp.com/departments");
    let departments = await response.json();

    for (let dep of departments) {
        optionObject = document.createElement("option");
        optionObject.value = dep["_id"];
        optionObject.innerText = dep["Name"]
        studentdepartment.append(optionObject);
    }
})
// -------------------- Edit student table-------------------------------------------

saveEdittButton.addEventListener("click", async function () {
    
     let response=await  fetch("https://node-monge-iti-project.herokuapp.com/students",{
                    method:"put",
                    body:JSON.stringify({id:StudenttID.value,name:StudenttName.value,department:studentdepartment.value}),
                    headers:{"Content-Type":"application/json"}
                });
                let data =await response.json();
    
     
                StudenttID.value = "";
                StudenttName.value = "";
                studentdepartment = "";
          
    // -----------------re drwo table--------------

    start()
       


   
})


