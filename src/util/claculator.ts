import { SessionData } from "../models/SessionData";
import config from '../config/config.json'

var calculator = {
    calulate: calulate
}

function calulate(session_data: SessionData): SessionData{
    console.log("Calculating...");
    var result_types = getAllResultsOfType(session_data.value_type);
    console.log(result_types);

    var decimal_mean = 0;
    result_types.forEach((element: any) => {
        var result = Number(session_data.value) / element.value_of_one;
        decimal_mean = decimal_mean + getDecimals(result);
        element["result"] = result;

        // if result name is set -> return result without selecting a new one 
        if(element.name == session_data.result_name){
            session_data.result_value = result;
            return session_data;
        }

    });

    decimal_mean = decimal_mean / result_types.length;

    var finalist:any = [];
    result_types.forEach((element: any) => {
        if(element.result % 1 == 0){
            finalist.push(element);
        }
        else if(getDecimals(element.result) <= decimal_mean){
            finalist.push(element);
        }
    });
    console.log(finalist);
    var final_result = finalist[Math.floor(Math.random()*finalist.length)];
    session_data.result_name = final_result.name;
    session_data.result_value = final_result.result;
    return session_data;
}

function getAllResultsOfType(value_type: String){
    var data: any = [];

    config.result_types.forEach(type => {
        type.values.forEach(value => {
            if(value.value_type == value_type){
                data.push({name: type.name, value_type: value.value_type, value_of_one: value.value_of_one});
            }
        });
    });

    return data;
}

function getDecimals(value: Number){
    if(value.toString().includes("e")) return 0;
    if(Math.floor(Number(value)) == Number(value)) return 0;
    return value.toString().split(".")[1].length || 0;
}

export default calculator;
