export var url_fun = {
    getQuerryString : getQuerryString
}

function getQuerryString(q_obj: Object): String{
    var querry_string = "";

    Object.keys(q_obj).forEach((key) => {
        if(querry_string != ""){
            querry_string += "&";
        }
        querry_string += key + "=" + encodeURIComponent((q_obj as any)[key]);
    });

    return querry_string;
}
