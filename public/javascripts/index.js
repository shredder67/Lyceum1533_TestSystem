var index = 0;
var kostil = 0; //индексация id вопроса 
var fl;
function addQuestionButtonClick() {
    kostil = 0;
    var elem = document.createElement("div");
    elem.id = "question[" + index + "]";
    //выбор типа вопроса 
    elem.innerHTML = `<h6>Выберите тип вопроса</h6>` +
        `<select name = '${elem.id}[quesiton_type]' onchange = 'changeQuestionType("${elem.id}", this.options[this.selectedIndex].value)'>` +
        `<option value=''></option><option value = 'free_input'>Свободный ответ</option>` +
        `<option value = 'multiple_choice'>Выбор из списка</option> </select> <div id = "${index}"></div>`
    document.getElementById("question_list").appendChild(elem)
    index++;
}

function changeQuestionType(question_id, question_type) { //смена тела вопроса 
    var elem_body = document.getElementById(question_id).getElementsByTagName("div")[0]; //elem_body - div внутри одного вопроса, содержащий его тело (условие, варианты ответа итд)
    switch (question_type) {
        case "free_input":
            {
                elem_body.innerHTML = `<input type='file' name='${question_id}[pic]'></input><h7>Условие:</h7><input type = 'text' name = '${question_id}[condition]'></input><h7>Правильный ответ:</h7><input type = 'text' name = '${question_id}[all_options[${0}][text]]'></input>`
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
    fl =document.createElement("input");
    fl.type="file";
    fl.name=`${question_id}[pic]`;
    document.getElementById("tr[" + index + "]").appendChild(fl);
    var rd;
    var options = document.createElement("input");
    options.type = "text";
    options.name = `${question_id}[condition]`;
    document.getElementById("tr[" + index + "]").appendChild(options);
    for (var i = 0; i < question_count; i++) {
        rd = document.createElement("input");
        rd.type = "checkbox";
        rd.name = `${question_id}[all_options[${i}][isRight]]`;
        document.getElementById("tr[" + index + "]").appendChild(rd);
        options = document.createElement("input");
        options.type = "text";
        options.name = `${question_id}[all_options[${i}][text]]`;
        document.getElementById("tr[" + index + "]").appendChild(options);
    }
    kostil++;
}