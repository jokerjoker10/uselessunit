import { Request, Result } from "../models/SessionData";
import config from '../config/data.json'

var calculator = {
    getResultList: getResultList
}

function getResultList(request: Request): Array<Result>{
    var result_types = getAllResultsOfType(request.value_type);

    var decimal_mean = 0;
    result_types.forEach((element: any) => {
        var result = Number(request.value) / element.value_of_one;
        decimal_mean = decimal_mean + getDecimals(result);
        element.result = result;
    });
    
    var result_list: Array<Result> = result_types;
    return result_list;
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
