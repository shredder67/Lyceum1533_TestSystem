var index = 0;
var temp = 5;
var kostil = 0; //индексация id вопроса 
var fl;

function addQuestionButtonClick() {
    document.getElementById("button_creating_test").setAttribute("disabled", "disabled");
    kostil = 0;
    var elem = document.createElement("div");
    elem.id = "question[" + index + "]";
    elem.className = "quest";
    //выбор типа вопроса n
    elem.innerHTML = `<h6>Выберите тип вопроса</h6>` +
        `<select name = '${elem.id}[quesiton_type]' onchange = 'changeQuestionType("${elem.id}", this.options[this.selectedIndex].value)'>` +
        `<option value=''></option><option value = 'free_input'>Свободный ответ</option>` +
        `<option value = 'multiple_choice'>Выбор из списка</option>`+
        `<option value = 'range'>Ввод ответа с примерным значением</option> </select> <div id = "${index}"></div>`
    document.getElementById("question_list").appendChild(elem)
    index++;
}

function changeQuestionType(question_id, question_type) { //смена тела вопроса 
    var elem_body = document.getElementById(question_id).getElementsByTagName("div")[0]; //elem_body - div внутри одного вопроса, содержащий его тело (условие, варианты ответа итд) 
    switch (question_type) {
        case "free_input":
            {
                elem_body.innerHTML = `<h7>Условие:</h7><textarea  onkeyup='check();' type = 'text' id ='inp${temp}'name = '${question_id}[condition]'></textarea><h7>Правильный ответ:</h7><input  onkeyup='check();' id ='inp${temp+1}' type = 'text' name = '${question_id}[all_options[${0}][text]]'></input> <input type='button' onclick='delete_question("${question_id}");'  id='del_butt${question_id}' value='Удалить вопрос'></input>`

                temp++;
                break;
            }
        case "multiple_choice":
            {
                elem_body.innerHTML = `<h7>Кол-во вариантов ответа:</h7><select id='answer_count' onchange='createNewAnswers(this.options[this.selectedIndex].value,"${elem_body.id}", "${question_id}");'>" + 
"<option value = ''></option>" + 
"<option value = '2'>2</option>" + 
"<option value = '3'>3</option>" + 
"<option value = '4'>4</option></select>`

                break;
            }
            case"range":
            {
                elem_body.innerHTML=`<h7>Введите минимальное значение</h7><input onchange='check();' type='number' id ='inp${temp}'></input><h7>Введите максимальное значение</h7><input onchange='check();' type='number' id ='inp${temp+1}'></input><h7>Введите цену деления</h7><input onchange='check();' type='number' id ='inp${temp+2}'></input><h7>Введите правильный ответ</h7><input onchange='check();' type='number' id ='inp${temp+3}'></input><input type='button' onclick='delete_question("${question_id}");'  id='del_butt${question_id}' value='Удалить вопрос'></input>`
               temp+=3;
                break;
            }
        default:
            {
                elem_body.innerHTML = "<h4>Выберите тип вопроса!</h4>"
            }
    }
}

function createNewAnswers(question_count, elem_body_id, question_id) //Добавление вариантов ответа в multitple_choice 
{
    if (kostil != 0) {
        document.getElementById("tr[" + index + "]").innerHTML = '';
    }
    var fix = document.createElement("div");
    fix.id = "tr[" + index + "]";
    document.getElementById(elem_body_id).appendChild(fix);
    var rd;
    var options = document.createElement("input");
    options.type = "text";
    options.name = `${question_id}[condition]`;
    options.id = `inp${temp}`;
    options.onkeyup = check;
    document.getElementById("tr[" + index + "]").appendChild(options);
    for (var i = 0; i < question_count; i++) {
        temp++;
        rd = document.createElement("input");
        rd.type = "checkbox";
        rd.name = `${question_id}[all_options[${i}][isRight]]`;
        document.getElementById("tr[" + index + "]").appendChild(rd);
        options = document.createElement("input");
        options.type = "text";
        options.id = `inp${temp}`;
        options.onkeyup = check;
        options.name = `${question_id}[all_options[${i}][text]]`;
        document.getElementById("tr[" + index + "]").appendChild(options);
    }
    var but=document.createElement("div");
   but.innerHTML=`<input type='button' onclick='delete_question("${question_id}");' value='Удалить вопрос'></input>`;
   document.getElementById("tr[" + index + "]").appendChild(but);
    
    kostil++;
}

function check() {
   // alert("Я хотя бы в фунции");
    var flag = true;
    for (var gopa = 1; gopa <= temp; gopa++) 
    {
if(document.getElementById(`inp${gopa}`)!=null){
        if (document.getElementById(`inp${gopa}`).value == "") 
        {
            flag = false;
        }
    }
    }
    //alert("Я вышел из цикла");
    if (flag == true) {
        document.getElementById("button_creating_test").removeAttribute("disabled");
    } else {
        document.getElementById("button_creating_test").setAttribute("disabled", "disabled");
    }
}

function delete_question(now_index)
{
    
document.getElementById(now_index).innerHTML="";
}