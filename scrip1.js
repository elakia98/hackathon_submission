async function loadUsers(url){
    const response = await fetch(url); //github api
    const users = await response.json(); //change it to json
    return users; //return the whole users
}

let selectedIndex = 0; //to process 
let users = []; //all users data
//for pagintion
let btndiv = document.getElementById('buttons-div');
let previousBtn = document.createElement('button');//previous button
previousBtn.innerHTML = 'Previous';
previousBtn.addEventListener('click',()=>{
    changeData(selectedIndex-1);
    selectedIndex = selectedIndex - 1
});
let nextBtn = document.createElement('button') //next  button
nextBtn.innerHTML = 'Next'
nextBtn.addEventListener('click',()=>{
    changeData(selectedIndex+1);
    selectedIndex = selectedIndex + 1
})
//append both buttons in div
document.getElementsByTagName("BODY")[0].appendChild(previousBtn);
document.getElementsByTagName("BODY")[0].appendChild(nextBtn);
//tto gget all individual data
async function changeData(i){
        //get image of every repos
        var img= document.createElement('img');
        img.innerHTML = ''
        let tblee = document.getElementById('tbl'); //get the div with id tbl
        while (tblee.firstChild) {
            tblee.removeChild(tblee.lastChild);
         }
         let img_ho = document.getElementById('img_home')
         while (img_ho.firstChild) {
            img_ho.removeChild(img_ho.lastChild);
         }
        img.src = users[i]["avatar_url"];
        img.alt = 'alt txt';
        img.style.width = "200px";
        img.style.height = "200px";
        document.getElementById('img_home').appendChild(img);

         //individual users repos data
        let individual_user = await loadUsers(users[i]["repos_url"]);
        //create table
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        // Adding the entire table to the body tag
        document.getElementById('tbl').appendChild(table);
        table.setAttribute("id","tbl1"); //set id for table
       // loop through individual users data
        for(j in individual_user){
            
            var table1 = document.getElementById("tbl1");
               var row = table1.insertRow(j); // keep it in every row 
               var cell1 = row.insertCell(0); //1st column
               var cell2 = row.insertCell(1); //2nd column
               var cell3 = row.insertCell(2); //3rd column
               var cell4 = row.insertCell(3); //4th column
               cell1.innerHTML = individual_user[j].full_name; //Get full name of the user
               cell2.innerHTML = individual_user[j].forks; //get forks count of each repo
               cell3.innerHTML = individual_user[j].stargazers_count; //get stars count
               cell4.innerHTML = individual_user[j].url; //url of each repo
        }
       
        // Creating and adding data to first row of the table
        let row_1 = document.createElement('tr');
        let heading_1 = document.createElement('th');
        heading_1.innerHTML = "Fullname";
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Fork Count";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Stars count";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Repository link";
        //adding all the heading to tr
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);

}
//to get the users data
document.addEventListener("DOMContentLoaded",async() => {
    try{
        users = await loadUsers("https://api.github.com/users");
        //console.log(users);
        changeData(selectedIndex);
    }catch(e){
        console.log(e);
    }

});




