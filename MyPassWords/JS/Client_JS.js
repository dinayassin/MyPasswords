

var GlobalPhoto = "";




// for alerts
function showAlertById(id) {
    event.preventDefault();
    $('#' + id).addClass('is-visible');
}

function hideAlertById(id) {
    event.preventDefault();
    $('#' + id).removeClass('is-visible');
}
//end 
$(document).ready(function () {
    $("#loading-div-background").css({ opacity: 1.0 });
});

function WaitDiv(show) {
    if (show)
        $(".loading-div-background").show();
    else
        $(".loading-div-background").hide();
}



function Logout() {
    WaitDiv(true);
    localStorage.token = null;
    $.mobile.changePage('#LoginPage');
    WaitDiv(false);
}

//Login Page
function ForgotPassword() {
    WaitDiv(true);
    LblInfoText_Login("");
    var checkData = "";
    var emailPar = $('#txtEmail_Login').val();
    if (emailPar == "") checkData += "email is empty.<br>";
    if (!validateEmail(emailPar) && emailPar != "") checkData += "email is Wrong value.<br>";
    if (checkData != "") {
        LblInfoText_Login(checkData);
        WaitDiv(false);
        return;
    }



    var prm =
        {
            email: emailPar
        };


    $.ajax({
        url: WebServiceURL + "/ForgotPassword",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(prm),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            LblInfoText_Login("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
        },
        //async: false,
        success: function (data) {
            WaitDiv(false);
            var res = JSON.parse(data.d);
            switch (res) {
                case "UserNotFound":
                    LblInfoText_Login("<label class='Faild'>email not found.</label>");
                    break;
                case "Success":
                    LblInfoText_Login("<label class='Success'>Please check your email inbox.</label>");
                    break;
                    LblInfoText_Login("<label class='Faild'>" + res + "</label>");
                default:
            }
            WaitDiv(false);
        }
    });
}

function LblInfoText_Login(txt) {

    if (txt == "") {
        $('#lblInfoLogin').css("visibility", "hidden");

    } else {
        $('#lblInfoLogin').html(txt);
        $('#lblInfoLogin').css("visibility", "visible");
    }

}
$(document).on('pagecreate', '#LoginPage', function () {

    $('#btnLogin').tap(function () {
        var strError = "";
        var emailPar = $('#txtEmail_Login').val();
        var passPar = $('#txtPassword_Login').val();
        if (emailPar == "") strError += "email is empty.<br>";
        if (passPar == "") strError += "PassWord is empty.<br>";
        if (strError != "") {
            LblInfoText_Login("<label class='Faild'>" + strError + "</label>");
            return;
        }
        WaitDiv(true);

        var prm =
            {
                email: emailPar,
                password: passPar
            };

        $.ajax({
            url: WebServiceURL + "/CheckLogin",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(prm),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                WaitDiv(false);
                var errorStr = formatErrorMessage(jqXHR, exception);
                LblInfoText_Login("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
            },
            //async: false,
            success: function (data) {
                WaitDiv(false);
                var token = JSON.parse(data.d);
                if (token != null) {
                    LblInfoText_Login("<label class='Success'>success.</label>");
                    localStorage.token = JSON.stringify(token);
                    $.mobile.changePage('#MainPage');
                }
                else {
                    LblInfoText_Login("<label class='Faild'>invalid email or password.</label>");
                }
            }
        });
    });
});
$(document).on('pageshow', '#LoginPage', function () {
    LblInfoText_Login("");
    if (getToken() != "null" && getToken() != null)
        $.mobile.changePage('#MainPage');
});







//signUP Page
function LblInfoText_SignUp(txt) {

    if (txt == "") {
        $('#lblInfoSignUP').css("visibility", "hidden");

    } else {
        $('#lblInfoSignUP').html(txt);
        $('#lblInfoSignUP').css("visibility", "visible");
    }

}


function dataConfirm_Register(email, pass, confPass, fName, lName) {
    var result = "";
    if (email == "") result += "email is empty.<br>";
    if (!validateEmail(email) && email != "") result += "email is Wrong value.<br>";
    if (pass == "") result += "PassWord is empty.<br>";
    if (confPass == "") result += "Confirm PassWord is empty.<br>";
    if (fName == "") result += "First Name is empty.<br>";
    if (lName == "") result += "Last Name is empty.<br>";
    if (pass != confPass) result += "Passwords are not the same.<br>";
    return result;
}
$(document).on('pagecreate', '#SignUpPage', function () {

    $('#BackIconSignUp').tap(function () {
        $.mobile.changePage('#LoginPage');
    });

    $('#btnSubmitSignUp').tap(function () {
        LblInfoText_SignUp("");
        WaitDiv(true);
        var emailPar = $('#txtEmail_Register').val();
        var passPar = $('#txtPass_Register').val();
        var confpassPar = $('#txtConfirmPass_Register').val();
        var fNamePar = $('#txtFName_Register').val();
        var lNamePar = $('#txtLName_Register').val();
        var confStr = dataConfirm_Register(emailPar, passPar, confpassPar, fNamePar, lNamePar);
        if (confStr != "") {
            LblInfoText_SignUp("<label class='Faild'>" + confStr + "</label>");
            WaitDiv(false);
            return;
        }

        var UserJSObj =
            {
                email: emailPar,
                password: passPar,
                fName: fNamePar,
                lName: lNamePar
            };


        $.ajax({
            url: WebServiceURL + "/SignUP",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(UserJSObj),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                WaitDiv(false);
                var errorStr = formatErrorMessage(jqXHR, exception);
                LblInfoText_SignUp("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
            },
            //async: false,
            success: function (data) {
                WaitDiv(false);
                var token = JSON.parse(data.d);
                if (token != null) {
                    LblInfoText_SignUp("<label class='Success'>Welcome to the MyPsaaWords family! account.</label>");
                    localStorage.token = JSON.stringify(token);
                    $.mobile.changePage('#MainPage');
                }
                else {
                    LblInfoText_SignUp("<label class='Faild'>the email is exists.</label>");
                }
            }
        });
    });
});
$(document).on('pageshow', '#SignUpPage', function () {
    WaitDiv(false);
    LblInfoText_SignUp("");
    $('#txtEmail_Register').val("");
    $('#txtPass_Register').val("");
    $('#txtConfirmPass_Register').val("");
    $('#txtFName_Register').val("");
    $('#txtLName_Register').val("");
});




//Main Page

function GetRecordsData() {
    WaitDiv(true);
    $("#DataShow").html("");
    var tokenPrm = getToken();


    var UserJSObj =
        {
            token: tokenPrm
        };
    $.ajax({
        url: WebServiceURL + "/returnRecordsData",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(UserJSObj),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            var errorStr = formatErrorMessage(jqXHR, exception);
            ShowData_MainPage(null);
            alert(errorStr);
        },
        //async: false,
        success: function (data) {
            var res = JSON.parse(data.d);
            ShowData_MainPage(res);
        }
    });

}
function ShowData_MainPage(data) {
    var DivData = "<div data-role='collapsible-set' data-filter='true' data-collapsed-icon='carat-r' data-expanded-icon='carat-d' data-inset='true' data-iconpos='right'>";
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            var imageUrl = UploadPhotoDir + "rec_" + data[i].RID + ".jpg";

            var cont = "<table>" +
                "        <tr><td  colspan='2'><center>";

            if (data[i].isFavorite) {
                cont += "<img class='favIcon' src='images/favFill.png' onclick='FavoriteRec(" + data[i].RID + ",\"" + data[i].Title + "\");' />";
            } else {
                cont += "<img class='favIcon' src='images/fav.png' onclick='FavoriteRec(" + data[i].RID + ",\"" + data[i].Title + "\");' />";
            }
            cont += "<img class='editIcon' src='images/edit.png' onclick='EditRec(" + data[i].RID + ",\"" + data[i].Title + "\");' />" +
                "<img class='shareIcon' src='images/share.png' onclick='ShareRecord(" + data[i].RID + ",\"" + data[i].Title + "\");' />" +
                "<img class='deleteIcon' src='images/rec_delete.png' onclick='DeleteRec(" + data[i].RID + ",\"" + data[i].Title + "\");' />" +
                "</center></td></tr>" +
                "        <tr><td class='PropName'>WebSite:</td><td class='PropValue' style='word-break: break-all;'><a href='" + data[i].URL + "'>" + data[i].URL + "</a></td></tr>" +
                "        <tr><td class='PropName'>UserName:</td><td class='PropValue'>" + data[i].UserName + "</td></tr>" +
                "        <tr><td class='PropName'>PassWord:</td><td class='PropValue'>" + data[i].PassWord + "</td></tr>" +
                "        <tr><td class='PropName'>Notes:</td><td class='PropValue'>" + data[i].Notes.replace(/\n/g, '<br>') + "</td></tr>" +
                "</table>";


            DivData += "<div data-role='collapsible'><h1><table class='tblDataTitle'><tr><td><img class='SiteLogo' src='" + imageUrl + "' onError='this.onerror = null; this.src = \"images/cam.png\";' />" +
                "</td><td class='SiteName'>" + data[i].Title + "</td></tr></table></h1><table class='tblData'><tr>" +
                "<td class='recContant'>" + cont + "</td><td class='colEditData'>" +
                "</td></tr></table></div>";
        }
    }
    DivData += "</div>";
    $("#DataShow").html(DivData);
    $("#DataShow").collapsibleset().trigger('create');
    WaitDiv(false);
}
function FavoriteRec(id, recTitle) {
    sessionStorage.RecordID = id;
    sessionStorage.RecordTitle = recTitle;
    WaitDiv(true);
    var tokenPrm = getToken();

    var prm =
        {
            token: tokenPrm,
            recId: id
        };
    $.ajax({
        url: WebServiceURL + "/ChangeFavorite",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(prm),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            alert(errorStr);
        },
        //async: false,
        success: function (data) {
            if (JSON.parse(data.d)) {
                GetRecordsData();
            } else {
                alert("Unexpected error !");
            }
            WaitDiv(false);
        }
    });
}
function DeleteRec(id, recTitle) {
    sessionStorage.RecordID = id;
    sessionStorage.RecordTitle = recTitle;

    $('#Title_Alert').html('Delete Record<br> <center><lable class="DeleteAlertTitle">' + recTitle + '</lable></center>');
    showAlertById('DeleteRecordAlert');
}
function ShareRecord(id, recTitle) {
    sessionStorage.RecordID = id;
    sessionStorage.RecordTitle = recTitle;
    $.mobile.changePage('#ShareRecordPage');
}
function EditRec(id, recTitle) {
    sessionStorage.RecordID = id;
    sessionStorage.RecordTitle = recTitle;

    $.mobile.changePage('#EditRecordPage');
}

function checkToken_Main() {
    WaitDiv(true);
    var res = false;
    if (localStorage.token == null)
        return false;
    var tokenPrm = getToken();

    var UserJSObj =
        {
            token: tokenPrm
        };
    $.ajax({
        url: WebServiceURL + "/checkToken",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(UserJSObj),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            alert(errorStr);
        },
        //async: false,
        success: function (data) {
            if (JSON.parse(data.d)) {
                WaitDiv(false);
            } else {
                Logout();
            }
        }
    });
}

$(document).on('pagecreate', '#MainPage', function () {

    $('#AddNewRecordIcon').tap(function () {
        $.mobile.changePage('#AddNewRecordPage');
    });

    $('#btnNo_DeleteRec').tap(function () {
        hideAlertById('DeleteRecordAlert');
    });

    $('#btnYes_DeleteRec').tap(function () {
        hideAlertById('DeleteRecordAlert');
        var tokenPrm = getToken();
        var UserJSObj =
            {
                token: tokenPrm,
                recId: sessionStorage.RecordID
            };
        WaitDiv(true);

        $.ajax({

            url: WebServiceURL + "/DeleteRecord",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(UserJSObj),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                var errorStr = formatErrorMessage(jqXHR, exception);
                WaitDiv(false);
                alert("Server error: " + errorStr);
            },
            //async: false,
            success: function (data) {
                var token = JSON.parse(data.d);
                if (token != null) {
                    GetRecordsData();
                }
                else {
                    WaitDiv(false);
                    alert("Delete Faild.");
                }
                WaitDiv(false);

            }
        });

    });
});

$(document).on('pageshow', '#MainPage', function () {
    checkToken_Main();
    GetRecordsData();
});




//MyAccount Page




function dataConfirm_MyAccount(pass, fName, lName) {
    var result = "";
    if (pass == "") result += "PassWord is empty.<br>";
    if (fName == "") result += "First Name is empty.<br>";
    if (lName == "") result += "Last Name is empty.<br>";
    return result;
}
function MyAccountPageShowData(user) {
    WaitDiv(false);

    $('#lblEmail_MyAccount').text(user.Email);
    $('#txtPass_MyAccount').val(user.PassWord);
    $('#txtFName_MyAccount').val(user.FirstName);
    $('#txtLName_MyAccount').val(user.SurName);
}
function checkToken_MyAccountPage() {
    var res = false;
    if (localStorage.token == null)
        return false;
    var tokenPrm = getToken();

    var UserJSObj =
        {
            token: tokenPrm
        };
    $.ajax({
        url: WebServiceURL + "/checkTokenPlus",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(UserJSObj),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            alert(errorStr);
        },
        //async: false,
        success: function (data) {
            if (JSON.parse(data.d) != null) {
                MyAccountPageShowData(JSON.parse(data.d));
            } else {
                Logout();
            }
        }
    });
}
function LblInfoText_MyAccount(txt) {

    if (txt == "") {
        $('#lblInfoMyAccount').css("visibility", "hidden");

    } else {
        $('#lblInfoMyAccount').html(txt);
        $('#lblInfoMyAccount').css("visibility", "visible");
    }

}


$(document).on('pagecreate', '#MyAccountPage', function () {
    $("#toggle_password_MyAccount").click(function () {

        var input = $("#txtPass_MyAccount");
        var icon = $("#showHidePass");

        if (input.attr("type") == "password") {
            input.attr("type", "text");
            icon.attr("src", "images/PassWordHide.png");
        } else {
            input.attr("type", "password");
            icon.attr("src", "images/PassWordShow.png");
        }
    });

    $('#btnNo_MyAccountAlert').tap(function () {
        document.getElementById("close_Alert_MyAccount").click();
    });

    $('#btnYes_MyAccountAlert').tap(function () {
        document.getElementById("close_Alert_MyAccount").click();
        var tokenPrm = getToken();
        var UserJSObj =
            {
                token: tokenPrm
            };


        $.ajax({
            url: WebServiceURL + "/DeleteAccount",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(UserJSObj),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                WaitDiv(false);
                var errorStr = formatErrorMessage(jqXHR, exception);
                LblInfoText_MyAccount("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
            },
            //async: false,
            success: function (data) {
                WaitDiv(false);
                var token = JSON.parse(data.d);
                if (token != null) {
                    LblInfoText_MyAccount("<label class='Success'>delete success.</label>");
                    WaitDiv(false);
                    Logout();
                }
                else {
                    WaitDiv(false);
                    LblInfoText_MyAccount("<label class='Faild'>Save error.</label>");
                }

            }
        });

    });



    $('#btnSubmitMyAccount').tap(function () {
        debugger;
        LblInfoText_MyAccount("");
        WaitDiv(true);
        var passPar = $('#txtPass_MyAccount').val();
        var fNamePar = $('#txtFName_MyAccount').val();
        var lNamePar = $('#txtLName_MyAccount').val();
        var confStr = dataConfirm_MyAccount(passPar, fNamePar, lNamePar);
        if (confStr != "") {
            LblInfoText_MyAccount("<label class='Faild'>" + confStr + "</label>");
            WaitDiv(false);
            return;
        }

        var tokenPrm = getToken();
        var UserJSObj =
            {
                password: passPar,
                fName: fNamePar,
                lName: lNamePar,
                token: tokenPrm
            };


        $.ajax({
            url: WebServiceURL + "/UpdateUserInfo",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(UserJSObj),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                WaitDiv(false);
                var errorStr = formatErrorMessage(jqXHR, exception);
                LblInfoText_MyAccount("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
            },
            //async: false,
            success: function (data) {
                WaitDiv(false);
                var token = JSON.parse(data.d);
                if (token != null) {
                    LblInfoText_MyAccount("<label class='Success'>Save success.</label>");
                    localStorage.token = JSON.stringify(token);
                    WaitDiv(false);
                }
                else {
                    WaitDiv(false);
                    LblInfoText_MyAccount("<label class='Faild'>Save error.</label>");
                    $.mobile.changePage('#MainPage');
                }
            }
        });
    });
});
$(document).on('pageshow', '#MyAccountPage', function () {
    LblInfoText_MyAccount("");
    //for hide password
    $("#txtPass_MyAccount").attr("type", "password");
    $("#showHidePass").attr("src", "images/PassWordShow.png");


    checkToken_MyAccountPage();
});


//AddNewRecord
var photoURIGlobal;
function checkToken_AddNewRecord() {
    var res = false;
    if (localStorage.token == null)
        return false;
    var tokenPrm = getToken();

    var UserJSObj =
        {
            token: tokenPrm
        };
    $.ajax({
        url: WebServiceURL + "/checkToken",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(UserJSObj),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            alert(errorStr);
        },
        //async: false,
        success: function (data) {
            if (JSON.parse(data.d)) {
                WaitDiv(false);
            } else {
                $.mobile.changePage('#LoginPage');
            }
        }
    });
}
function LblInfoText_AddNewRecord(txt) {

    if (txt == "") {
        $('#lblInfoAddNewRecord').css("visibility", "hidden");

    } else {
        $('#lblInfoAddNewRecord').html(txt);
        $('#lblInfoAddNewRecord').css("visibility", "visible");
    }

}

function dataConfirm_AddNewRecord(title, user, pass, notes) {
    var result = "";
    if (title == "") result += "Title is empty.<br>";
    return result;
}
$(document).on('pagecreate', '#AddNewRecordPage', function () {

    $('#imgLogo_AddNewRecord').tap(function () {
        showAlertById('AlertTakeImg_AddNewRecord');
    });
    $('#BackIconAddNewRecord').tap(function () {
        $.mobile.changePage('#MainPage');
    });

    $('#btnSubmitAddNewRecord').tap(function () {
        LblInfoText_AddNewRecord("");
        WaitDiv(true);

        var tokenPrm = getToken();
        var title = $('#txttitle_AddNewRecord').val();
        var url = $('#txtURL_AddNewRecord').val();
        var username = $('#txtUserName_AddNewRecord').val();
        var password = $('#txtPass_AddNewRecord').val();
        var notes = $('#txtNote_AddNewRecord').val();
        var confStr = dataConfirm_AddNewRecord(title, username, password, notes);
        if (confStr != "") {
            LblInfoText_AddNewRecord("<label class='Faild'>" + confStr + "</label>");
            WaitDiv(false);
            return;
        }

        var prm =
            {
                title: title,
                userName: username,
                pass: password,
                notes: notes,
                url: url,
                token: tokenPrm
            };

        $.ajax({
            url: WebServiceURL + "/AddNewRecord",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(prm),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                WaitDiv(false);
                var errorStr = formatErrorMessage(jqXHR, exception);
                LblInfoText_AddNewRecord("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
            },
            //async: false,
            success: function (data) {
                var res = JSON.parse(data.d);
                if (res != "") {
                    WaitDiv(false);
                    $.mobile.changePage('#MainPage');
                    //uploadPhoto(res);
                }
                else {
                    WaitDiv(false);
                    LblInfoText_AddNewRecord("<label class='Faild'>faild.</label>");
                }
            }
        });
    });
});
$(document).on('pageshow', '#AddNewRecordPage', function () {
    WaitDiv(false);
    checkToken_AddNewRecord();
    LblInfoText_AddNewRecord("");
    //clear data
    $("#imgLogo_AddNewRecord").attr('src', 'images/cam.png');
    $('#txttitle_AddNewRecord').val("");
    $("#txtURL_AddNewRecord").val("");
    $('#txtUserName_AddNewRecord').val("");
    $('#txtPass_AddNewRecord').val("");
    $('#txtNote_AddNewRecord').val("");
});



//EditRecord
function uploadPhoto(imageURI) {
    WaitDiv(true);
    //   Load(); // Start the spinning "working" animation
    var options = new FileUploadOptions(); // PhoneGap object to allow server upload
    options.fileKey = "file";
    options.fileName = "rec_" + sessionStorage.RecordID; // file name
    options.mimeType = "image/jpeg"; // file type
    var params = {}; // Optional parameters
    params.value1 = "test";
    params.value2 = "param";

    options.params = params; // add parameters to the FileUploadOptions object
    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI(UploadPhotoDir + "ReturnValue.ashx"), win, fail, options); // Upload
} // Upload Photo

function win(r) {
    var path = r.response;
    WaitDiv(false);
} // win (upload success)

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    WaitDiv(false);
}

function checkTokenAndRecord_EditRecord() {
    WaitDiv(true);
    var res = false;
    if (localStorage.token == null)
        return false;
    var tokenPrm = getToken();

    var UserJSObj =
        {
            token: tokenPrm,
            recId: sessionStorage.RecordID
        };
    $.ajax({
        url: WebServiceURL + "/checkTokenAndRecord",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(UserJSObj),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            alert(errorStr);
        },
        //async: false,
        success: function (data) {
            var obj = JSON.parse(data.d);
            if (obj != null) {

                var imageUrl = UploadPhotoDir + "rec_" + obj.RID + ".jpg";
                $('#imgLogo_EditRecord').attr('src', imageUrl);
                $('#txttitle_EditRecord').val(obj.Title);
                $("#txtURL_EditRecord").val(obj.URL);
                $('#txtUserName_EditRecord').val(obj.UserName);
                $('#txtPass_EditRecord').val(obj.PassWord);
                $('#txtNote_EditRecord').val(obj.Notes);
                WaitDiv(false);
            } else {
                $.mobile.changePage('#LoginPage');
            }
        }
    });
}
function LblInfoText_EditRecord(txt) {

    if (txt == "") {
        $('#lblInfoEditRecord').css("visibility", "hidden");

    } else {
        $('#lblInfoEditRecord').html(txt);
        $('#lblInfoEditRecord').css("visibility", "visible");
    }

}

function dataConfirm_EditRecord(title, user, pass, notes) {
    var result = "";
    if (title == "") result += "Title is empty.<br>";
    return result;
}
$(document).on('pagecreate', '#EditRecordPage', function () {
    $("#imgLogo_EditRecord").on("error", function () {
        $("#imgLogo_EditRecord").attr('src', './images/cam.png');
    });
    $('#imgLogo_EditRecord').tap(function () {
        showAlertById('AlertTakeImg_EditRecord');
    });
    $('#BackIconEditRecord').tap(function () {
        $.mobile.changePage('#MainPage');
    });

    $('#btnSubmitEditRecord').tap(function () {
        LblInfoText_EditRecord("");
        WaitDiv(true);

        var tokenPrm = getToken();
        var title = $('#txttitle_EditRecord').val();
        var url = $('#txtURL_EditRecord').val();
        var username = $('#txtUserName_EditRecord').val();
        var password = $('#txtPass_EditRecord').val();
        var notes = $('#txtNote_EditRecord').val();
        var confStr = dataConfirm_EditRecord(title, username, password, notes);
        if (confStr != "") {
            LblInfoText_EditRecord("<label class='Faild'>" + confStr + "</label>");
            WaitDiv(false);
            return;
        }

        var prm =
            {
                rec_Id: sessionStorage.RecordID,
                title: title,
                userName: username,
                pass: password,
                notes: notes,
                url: url,
                token: tokenPrm,
            };


        $.ajax({
            url: WebServiceURL + "/EditRecord",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(prm),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                WaitDiv(false);
                var errorStr = formatErrorMessage(jqXHR, exception);
                LblInfoText_EditRecord("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
            },
            //async: false,
            success: function (data) {

                var res = JSON.parse(data.d);
                switch (res) {
                    case "tokenError":
                        Logout();
                        break;
                    case "PermissionsDenied":
                        Logout();
                        break;
                    case "RecordNotFound":
                        LblInfoText_EditRecord("<label class='Faild'>Record not Found.</label>");
                        break;
                    case "Success":
                        //uploadPhoto();
                        $.mobile.changePage('#MainPage');
                        break;
                    default:
                        LblInfoText_EditRecord("<label class='Faild'>" + res + "</label>");
                }
                WaitDiv(false);
            }
        });
    });
    $('#btnTakeImgFromCamera_EditRec').tap(function () {
        hideAlertById('AlertTakeImg_EditRecord');
        navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
            quality: 50,
            correctOrientation: true,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onCameraSuccess(imageURI) {
            $('#imgLogo_EditRecord').attr('src', imageURI);
            //  sendFile(imageURI);
            uploadPhoto(imageURI);
        }

        function onCameraFail(message) {
            if (message != 'Selection cancelled.' && message != 'Camera cancelled.')
                alert('Failed because: ' + message);
        }
    });





    $('#btnTakeImgFromGallery_EditRec').tap(function () {
        hideAlertById('AlertTakeImg_EditRecord');
        navigator.camera.getPicture(onSuccess, onFail,
            {
                quality: 50,
                //destinationType: Camera.DestinationType.DATA_URL,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }
        );

        function onSuccess(imageURI) {
            $('#imgLogo_EditRecord').attr('src', imageURI);
            uploadPhoto(imageURI);
        }

        function onFail(message) {
            if (message != 'Selection cancelled.' && message != 'Camera cancelled.')
                alert('Failed because: ' + message);
        }
    });



});//end create page event


$(document).on('pageshow', '#EditRecordPage', function () {
    WaitDiv(true);
    $('#lblTitle_EditRecord').text(sessionStorage.RecordTitle);

    LblInfoText_EditRecord("");
    //clear data
    $("#imgLogo_EditRecord").attr('src', 'images/cam.png');
    $('#txttitle_EditRecord').val("");
    $("#txtURL_EditRecord").val("");
    $('#txtUserName_EditRecord').val("");
    $('#txtPass_EditRecord').val("");
    $('#txtNote_EditRecord').val("");

    checkTokenAndRecord_EditRecord();
});


//share record page
function RemoveShare(user, id) {
    sessionStorage.removeShareUser = id;
    $('#text_Alert_ShareRecord').text(' are you sure to remove share for ' + user + '?');
    showAlertById("AlertRemoveShared_ShareRecord");

}
function RemoveShareFunc() {
    WaitDiv(true);
    var tokenPrm = getToken();
    var prm =
        {
            rec_Id: sessionStorage.RecordID,
            removeUserShareID: sessionStorage.removeShareUser,
            token: tokenPrm
        };

    $.ajax({
        url: WebServiceURL + "/RemoveSharedUser",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(prm),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            LblInfoText_ShareRecord("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
        },
        //async: false,
        success: function (data) {
            var res = JSON.parse(data.d);
            switch (res) {
                case "tokenError":
                    Logout();
                    break;
                case "PermissionsDenied":
                    Logout();
                    break;
                case "removeUserNotFound":
                    LblInfoText_ShareRecord("<label class='Faild'>remove User not Found.</label>");
                    break;
                case "Success":
                    updateTable_ShareRecordPage();
                    break;
                default:
                    LblInfoText_ShareRecord("<label class='Faild'>" + res + "</label>");
            }
            WaitDiv(false);
        }
    });
}
$(document).on('pageshow', '#ShareRecordPage', function () {
    $('#UserTableDiv_ShareRecord').html("");
    $('#txt_EmailShare_ShareRecord').val("");
    LblInfoText_ShareRecord("");
    $('#lblTitle_ShareRecord').text(sessionStorage.RecordTitle);
    updateTable_ShareRecordPage();
});

$(document).on('pagecreate', '#ShareRecordPage', function () {
    $('#BackIconShareRecord').tap(function () {
        $.mobile.changePage('#MainPage');
    });
    $('#btnYesAlert_ShareRecord').tap(function () {
        hideAlertById("AlertRemoveShared_ShareRecord");
        RemoveShareFunc();
    });
    $('#btnNoAlert_ShareRecord').tap(function () {
        hideAlertById("AlertRemoveShared_ShareRecord");
    });
    $('#btn_Add_ShareRecord').tap(function () {
        LblInfoText_ShareRecord("");
        WaitDiv(true);
        var userSharePrm = $('#txt_EmailShare_ShareRecord').val();
        if (userSharePrm == "") {
            LblInfoText_ShareRecord("<label class='Faild'>Email Share is empty.</label>");
            WaitDiv(false);
            return;
        }
        var tokenPrm = getToken();
        var prm =
            {
                token: tokenPrm,
                userShare: userSharePrm,
                rec_Id: sessionStorage.RecordID
            };

        $.ajax({
            url: WebServiceURL + "/AddSharedUser",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(prm),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                WaitDiv(false);
                var errorStr = formatErrorMessage(jqXHR, exception);
                LblInfoText_ShareRecord("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
            },
            //async: false,
            success: function (data) {
                var res = JSON.parse(data.d);
                switch (res) {
                    case "tokenError":
                        Logout();
                        break;
                    case "PermissionsDenied":
                        Logout();
                        break;
                    case "ShareUserNotFound":
                        LblInfoText_ShareRecord("<label class='Faild'>User not Found.</label>");
                        break;
                    case "ExistsUser":
                        LblInfoText_ShareRecord("<label class='Faild'>User previously shared.</label>");
                        break;
                    case "Success":
                        updateTable_ShareRecordPage();
                        break;
                    default:
                        LblInfoText_ShareRecord("<label class='Faild'>" + res + "</label>");
                }
                WaitDiv(false);
            }
        });
    });
});
function LblInfoText_ShareRecord(txt) {

    if (txt == "") {
        $('#lblInfoShareRecord').css("visibility", "hidden");

    } else {
        $('#lblInfoShareRecord').html(txt);
        $('#lblInfoShareRecord').css("visibility", "visible");
    }

}



function updateTable_ShareRecordPage() {
    WaitDiv(true);
    var tokenPrm = getToken();
    var prm =
        {
            recId: sessionStorage.RecordID,
            token: tokenPrm
        };

    $.ajax({
        url: WebServiceURL + "/UsersSharedByRecord",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(prm),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            WaitDiv(false);
            var errorStr = formatErrorMessage(jqXHR, exception);
            LblInfoText_ShareRecord("<center><label class='ServerErrorTitle'>Server error</label></center><label class='ServerErrorContent'>" + errorStr + "</label>");
        },
        //async: false,
        success: function (data) {
            var res = JSON.parse(data.d);
            if (res != "") {
                var htmlDiv = " <table id='tbl2_ShareRecord'> " +
                    "<thead>" +
                    "<tr><th>#</th><th>User</th><th>Action</th></tr>" +
                    "</thead>" +
                    "<tfoot>" +
                    "<tr><th colspan='3'></th></tr>" +
                    "</tfoot>" +
                    "<tbody>";
                for (var i = 0; i < res.length; i++) {
                    htmlDiv += "<tr><th>" + (i + 1) + "</th><td><center>" + res[i].FirstName + "&nbsp;" + res[i].SurName + "<br>" + res[i].Email + "</center></td><td><label class='btn btn-danger' onclick='RemoveShare(\"" + res[i].Email + "\", " + res[i].UID + ");'> X </label></td></tr>";
                }

                htmlDiv += "</tbody> </table>";
                $('#UserTableDiv_ShareRecord').html(htmlDiv);
            }
            else {
                $('#UserTableDiv_ShareRecord').html("<center><div class='EmptyData_shareRecord'>No shared users yet.</div></center>");
            }
            WaitDiv(false);
        }
    });
}