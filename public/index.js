let container=document.getElementById("container");
let left=document.getElementById("left");
let right=document.getElementById("right");
let subject=document.getElementById("subject");
let description=document.getElementById("description");
let new_question=document.getElementById("new_question");
let submit=document.getElementById('submit');
let search=document.getElementById('search');

var questions=[];
display();
var right1=document.createElement("div");
right1.innerHTML=right.innerHTML;
new_question.addEventListener('click',function()
 {
    location.href="/";
     
});

submit.addEventListener('click',function()
{    
    var sub=subject.value;
    
    var des=description.value;
    if(sub=="" || des=="")
   {
       return ;
   }
    subject.value="";
    description.value="";
    var obj={ 
        subject:"",
        description:"",
        responses:[]

    };
     
    obj.subject=sub;
    obj.description=des;

    questions.push(obj);
    localStorage.setItem('arr', JSON.stringify(questions));

    
    display();
});


function display ()
{  
    
    input.innerHTML="";
     var data = JSON.parse(localStorage.getItem('arr'));
     
   if(data==null)
   {
       return ;
   }
   questions=data;
data.forEach(function( element,i) {
    


     let container=  makecontainer(data,i);  
     container.setAttribute("class","hello");
     input.appendChild(container);


    container.addEventListener('click',function()
    {
        responses(i,data);
      
    });


});
}



function responses(i,questions)
{
  
  
right.innerHTML="";
// question heading 
var Question=document.createElement("h3");
Question.innerText="Question";
Question.style.color="gray";
right.appendChild(Question);

// question container 
let container=makecontainer(questions,i);
container.classList.add('mb-2');
right.appendChild(container);


//resolve button 

var resolve=document.createElement("button");
resolve.setAttribute("id","resolve");
resolve.innerText="Resolve";
resolve.classList.add('btn-primary');

// *****************

right.appendChild(resolve);


// add response heading

var addResponse=document.createElement("h3");
addResponse.innerText="Add Response";
addResponse.style.color="gray";
right.appendChild(addResponse);



//add response form

let addcontainer=document.createElement("div");
//enter name

let name=document.createElement("input");
name.setAttribute("type","text");
name.setAttribute("placeholder","Enter Name");
name.setAttribute("id","entername");
name.style.width="250px";
name.style.margin="5px";
addcontainer.appendChild(name);
//enter comment
let comment=document.createElement("textarea");
comment.setAttribute("placeholder","Enter Comment");
comment.setAttribute("id","comment");
comment.setAttribute("rows","5");
// comment.setAttribute("cols","30");
comment.style.width="300px";

comment.style.margin="5px";

var breaks=document.createElement("br");
addcontainer.appendChild(breaks);
addcontainer.appendChild(comment);
var breaks=document.createElement("br");
addcontainer.appendChild(breaks);



//submit button


var submit=document.createElement("button");
submit.setAttribute("id","submitform");
submit.innerText="Submit";

submit.classList.add('btn-primary');
addcontainer.appendChild(submit);



right.appendChild(addcontainer);

//response heading
var Response=document.createElement("h3");
Response.innerText="Responses";
Response.style.color="gray";
right.appendChild(Response);

//***************** */

var responselist=document.createElement('div');
responselist.setAttribute("id","list");
right.appendChild(responselist);






var submitform=document.getElementById("submitform");
var nameform=document.getElementById("entername");
var commentform=document.getElementById("comment");

submitform.addEventListener('click',function()
{
    addresponse(i,questions,nameform.value,commentform.value);
    nameform.value="";
    commentform.value="";
});
var show=JSON.parse(localStorage.getItem('arr'));
showresponses(show,i);

var resolve=document.getElementById("resolve");
resolve.addEventListener('click',function()
{
    
    show.splice(i,1);
    localStorage.setItem('arr',JSON.stringify(show));
    display();
    location.href="/";
       
    
    
})



}
function makecontainer(questions,i)
{

    var container=document.createElement('div');
    var heading= document.createElement('h2');
    heading.innerHTML=questions[i].subject;
    var para=document.createElement('p');
    para.innerHTML=questions[i].description;
    container.appendChild(heading);
    container.appendChild(para);
    container.style.border='1px solid gray';
    

    
   
    return container;
}


function addresponse(i,questions,nameform,commentform)
{
    if((nameform==""||commentform==""))
    {
        return;
    }
    var form={
        nameform:nameform,
        commentform:commentform
    }
    questions[i].responses.push(form);
    
    localStorage.setItem('arr',JSON.stringify(questions));
   var show=JSON.parse(localStorage.getItem('arr'));
    showresponses(show,i);

}



function showresponses(show,i)
{
    var list=document.getElementById("list");
    list.innerHTML="";


    show[i].responses.forEach(function(element,index)
    {
        
        var container1=document.createElement('div');
    var heading1= document.createElement('h2');
    heading1.innerHTML=show[i].responses[index].nameform;
    var para1=document.createElement('p');
    para1.innerHTML=show[i].responses[index].commentform;
    container1.appendChild(heading1);
    container1.appendChild(para1);
    container1.style.border='1px solid gray';
    
    container1.style.paddingLeft='5px ';
    container1.classList.add('color');
    container1.style.backgroundColor='rgb(235, 235, 235)';
    list.appendChild(container1);
    });
}


search.addEventListener("input",function(){
    let inputvalue=search.value.toLowerCase().trim();
    // console.log(inputvalue);
    let containers=document.getElementsByClassName("hello");
    Array.from(containers).forEach(function(element){
       
        let name=element.getElementsByTagName("h2")[0].innerText.toLowerCase();
        // console.log(name);
        
        if(name.includes(inputvalue))
        {
            // console.log("haha");
            element.style.display="block";
        }
        else
        {
            element.style.display="none";
            
        }

    })
})