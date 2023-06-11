//function to validate the field 
function validateData(){
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;

    if(name == ""){
        alert("Please Enter Name");
        return false;
    }
    if(age == "" || age < 1){
        alert("Please Valid age");
        return false;
    }
    if(address == ""){
        alert("Please Enter Address");
        return false;
    }
    if(email == "" || !email.includes("@") ){
        alert("Inavlid Email");
        return false;
    }
    return true;
}

//function to show the data
function showData(){

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    var enteredText = "";

    peopleList.forEach(function(elem , index){
        enteredText +=
        `
        <tr>
        <td>${elem.name}</td>
        <td>${elem.age}</td>
        <td>${elem.address}</td>
        <td>${elem.email}</td>
        <td><button onclick="deleteData(${index})"class="btn btn-danger btn-sm">Delete</button><button onclick="editData(${index})"class="btn btn-warning btn-sm m-1">Edit</button></td>
        </tr>
        `    
    });

    document.querySelector('#crudTable tbody').innerHTML = enteredText;

}

// onload triggered when page loaded
document.onload = showData()

//function to add data to local storage
//onclick handler
function addData(){
    //onclick handler triggered the validate funcion 
if(validateData()==true){

    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];    
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    peopleList.push({
        name : name,
        age : age,
        address: address,
        email : email,
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById('name').value ="";
    document.getElementById('age').value="";
    document.getElementById('address').value="";
    document.getElementById('email').value="";

}
}

// function to delete the data from local storage

function deleteData(index){

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];    
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//function ro update/edit the data from local storage
function editData(index){
    // first we have to change the ADD button to update from html when user click to edit button 
    document.querySelector("#submit").style.display = "none";
    document.querySelector("#update").style.display = "inline-block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];    
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    document.getElementById('name').value = peopleList[index].name;
    document.getElementById('age').value=peopleList[index].age;
    document.getElementById('address').value=peopleList[index].address;
    document.getElementById('email').value=peopleList[index].email;

    


    document.querySelector("#update").onclick  = function(){

        if(validateData() == true){
            peopleList[index].name =  document.getElementById('name').value;
            peopleList[index].age =  document.getElementById('age').value;
            peopleList[index].address =  document.getElementById('address').value;
            peopleList[index].email =  document.getElementById('email').value;
        }

        localStorage.setItem('peopleList', JSON.stringify(peopleList));
        showData();
        document.getElementById('name').value ="";
        document.getElementById('age').value="";
        document.getElementById('address').value="";
        document.getElementById('email').value="";

    // NOw we have to change the updateData to addData from html when user click to update button
    document.querySelector("#submit").style.display = "inline-block";
    document.querySelector("#update").style.display = "none";

 }
}

//function to delete all data from local storage
function deleteall(){
    
        showData( localStorage.clear());
    

}


