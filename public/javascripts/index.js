function addQuestionButtonClick(){
    
    document.getElementById("shit").innerHTML='<p><select id="selected_question" onchange="change_type();"><option value="ничего"></option><option value="Вопрос с выбором">Вопрос с выбором</option><option value="Вопрос">Вопрос</option></select></p>';
    document.getElementById("shit").appendChild(elem);
}
function change_type()
{
switch(document.getElementById("selected_question").value)
{
case 'Вопрос':
document.getElementById("for_questions").innerHTML='<input type="text">';
break;
case 'Вопрос с выбором':
document.getElementById("for_questions").innerHTML='<input type="text" id="ques_count" onblur="create_questions();">';

//document.getElementById("for_questions").innerHTML='<input name="test1" type="radio" value="nedzen"> Сука <input name="test2" type="radio" value="nedzen"> Убью <input name="test3" type="radio" value="nedzen"> Себя';
break;
}
}
function create_questions()
{
var arr = [];
for(var i=0;i<document.getElementById("ques_count").value;i++)
{
    document.getElementById("for_questions").innerHTML='<input type="text", onblur"">';
    arr[i]= document.getElementById("for_questions").value;
}

}
function add_question()
{

}

   