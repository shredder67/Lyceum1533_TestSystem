var index =0;//индексация id вопроса
function addQuestionButtonClick(){
    var elem = document.createElement("div");
    elem.id ="question"+index;
    //выбор типа вопроса 
    elem.innerHTML = `<h6>Выберите тип вопроса</h6>`+
    `<select name = 'questions[][quesiton_type]' onchange = "changeQuestionType('${elem.id}', this.options[this.selectedIndex].value);">`+
    `<option value=''></option><option value = 'free_input'>Свободный ответ</option>`+
    `<option value = 'multiple_choice'>Выбор из списка</option> </select> <div id = "q_b"></div>`;
    document.getElementById("question_list").appendChild(elem)    
    index++;
}



function changeQuestionType(question_id, question_type){//смена тела вопроса
     var elem_body = document.getElementById(question_id).getElementsTagName("div");
    switch(question_type){
        case 'free_input': {
            elem_body.innerHTML = '<h7>Условие:</h7><input type = "text" name = "question[][condition]"></input><h7>Правильный ответ:</h7><input type = "text" name = "question[][condition]"></input>';
            break;
        }
        case 'multiple_choice':{
            elem_body.innerHTML = "";
            break;
        }
        default:{
            elem_body.innerHTML = "<h4>Выберите тип вопроса!</h4>";
            break;
        }
    }
}

/*function addQuestionButtonClick() {
    switch (document.getElementById("selected_question").value) {
        case 'Вопрос':
            document.getElementById("default").innerHTML = '';
            break;
        case 'Вопрос с выбором':
            document.getElementById("choice").innerHTML = '';

            break;
    }
}


function change_type() {
    switch (document.getElementById("selected_question").value) {
        case 'Вопрос':
            document.getElementById("default").innerHTML = '<p>Введите условие</p> <input type="text" name="situation" id="condition"> <p>Введите ответ</p> <input type="text" name="right_option" id="answer">';
            break;
        case 'Вопрос с выбором':
            document.getElementById("choice").innerHTML = '<p>Введите условие</p> <input type="text" name="situation" id="condition"> <p>Введите верный вариант</p><input type="text" id="f" name="right_option"> <p>Введите второй вариант</p><input type="text" id="s" name="all_options[]"><p>Введите третий вариант</p> <input type="text" id="t"name="all_options[]">';


            break;
    }
}*/