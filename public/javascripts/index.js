var index = 0; //индексация id вопроса 
function addQuestionButtonClick() {
    var elem = document.createElement("div");
    elem.id = "question[" + index + "]";
    //выбор типа вопроса 
    elem.innerHTML = `<h6>Выберите тип вопроса</h6>` +
        `<select name = '${elem.id}[quesiton_type]' onchange = 'changeQuestionType("${elem.id}", this.options[this.selectedIndex].value)'>` +
        `<option value=''></option><option value = 'free_input'>Свободный ответ</option>` +
        `<option value = 'multiple_choice'>Выбор из списка</option> </select> <div id = "q_b${index}"></div>`
    document.getElementById("question_list").appendChild(elem)
    index++;
}

function changeQuestionType(question_id, question_type) { //смена тела вопроса 
    // elem_body = document.getElementById(question_id).getElementsTagName("div"); 
    var elem_body = document.getElementById(question_id).getElementsByTagName("div")[0];
    switch (question_type) {
        case "free_input":
            {
                elem_body.innerHTML = `<h7>Условие:</h7><input type = 'text' name = '${question_id}[condition]'></input><h7>Правильный ответ:</h7><input type = 'text' name = '${question_id}[right_option]'></input>`
                break;
            }
        case "multiple_choice":
            {
                elem_body.innerHTML = `<h7>Кол-во вариантов ответа:</h7><select id='answer_count' onchange='createNewAnswers(this.options[this.selectedIndex].value,"${elem_body.id}", "${question_id}");'>" +
                "<option value = 'er'></option>" +
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

function createNewAnswers(question_count, elem_body_id, question_id)//Добавление вариантов ответа в multitple_choice
 {
    var gopa = document.createElement("input");
    gopa.type="text";
    gopa.name=`${question_id}[condition]`;
    document.getElementById(elem_body_id).appendChild(gopa);
    gopa = document.createElement("input");
    gopa.type="text";
    gopa.name=`${question_id}[right_option]`;
    document.getElementById(elem_body_id).appendChild(gopa);
     for(var i=1;i<question_count;i++)
     {
    gopa = document.createElement("input");
    gopa.type="text";
    gopa.name=`${question_id}[all_options[]]`;
    document.getElementById(elem_body_id).appendChild(gopa);
     }
    
    
}