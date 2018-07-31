//Global
var local = true;
var WebServiceURL = "http://mypasswords.nashef-90.com/MyPassWords_WebService.asmx";
var UploadPhotoDir = "http://mypasswords.nashef-90.com/RecordsImg/";

if (local) {
    WebServiceURL = "MyPassWords_WebService.asmx";
}

function getTokenAdmin() {
    var tokenPrm = "null";
    try {
        tokenPrm = JSON.parse(localStorage.adminToken);
    } catch (e) { }
    return tokenPrm;
}
function getToken() {
    var tokenPrm = "null";
    try {
        tokenPrm = JSON.parse(localStorage.token);
    } catch (e) { }
    return tokenPrm;
}
function formatErrorMessage(jqXHR, exception) {
    if (jqXHR.status === 0) {
        return ('code: 0 - Not connected.\nPlease verify your network connection.');
    } else if (jqXHR.status == 404) {
        return ('code: 404 - The requested page not found.');
    } else if (jqXHR.status == 500) {
        return ('code: 500 - Internal Server Error.');
    } else if (exception === 'parsererror') {
        return ('parsererror - Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        return ('timeout - Time out error.');
    } else if (exception === 'abort') {
        return ('abort - Ajax request aborted.');
    } else {
        return ('Uncaught Error.\n' + jqXHR.responseText);
    }
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}