var index = 0;
}

function changeQuestionType(question_id, question_type) { //смена тела вопроса 
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
    document.getElementById("tr[" + index + "]").appendChild(fl);
    var rd;
    var options = document.createElement("input");
    options.type = "text";
    options.name = `${question_id}[condition]`;
    document.getElementById("tr[" + index + "]").appendChild(options);
    for (var i = 0; i < question_count; i++) {
        rd = document.createElement("input");
        rd.type = "checkbox";
        rd.name = `${question_id}[all_options${i}[isRight]]`;
        document.getElementById("tr[" + index + "]").appendChild(rd);
        options = document.createElement("input");
        options.type = "text";
        options.name = `${question_id}[all_options${i}[text]]`;
        document.getElementById("tr[" + index + "]").appendChild(options);
    }
    kostil++;

}