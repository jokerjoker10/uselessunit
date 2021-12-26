export interface Result{
    name: String;
    value_type: String;
    value_of_one: Number;
    result: Number;
}

export interface Request {
    value_type: String;
    value: Number;
    result_name?: String;
}
