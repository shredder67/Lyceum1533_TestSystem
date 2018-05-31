
function addQuestionButtonClick()
{
    switch(document.getElementById("selected_question").value)
    {
    case 'Вопрос':
    document.getElementById("default").innerHTML='';
    break;
    case 'Вопрос с выбором':
            document.getElementById("choice").innerHTML='';
    
    break;
    }
}


function change_type()
{
switch(document.getElementById("selected_question").value)
{
case 'Вопрос':
document.getElementById("default").innerHTML='<p>Введите условие</p> <input type="text" name="situation" id="condition"> <p>Введите ответ</p> <input type="text" name="right_option" id="answer">';
break;
case 'Вопрос с выбором':
        document.getElementById("choice").innerHTML='<p>Введите условие</p> <input type="text" name="situation" id="condition"> <p>Введите верный вариант</p><input type="text" id="f" name="right_option"> <p>Введите второй вариант</p><input type="text" id="s" name="all_options[]"><p>Введите третий вариант</p> <input type="text" id="t"name="all_options[]">';


break;
}
}

   
