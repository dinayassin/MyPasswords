function LblInfoText_Login(txt) {

    if (txt == "") {
        $('#lblInfoLogin').css("visibility", "hidden");

    } else {
        $('#lblInfoLogin').html(txt);
        $('#lblInfoLogin').css("visibility", "visible");
    }

}

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

function WaitDiv(show) {

    if (show) {
        document.getElementById("waitPic").style.visibility = "visible";
        document.getElementById("btnLogin").style.visibility = "hidden";
        document.getElementById("lblForgotPassword").style.visibility = "hidden";
    }
    else {
        document.getElementById("waitPic").style.visibility = "hidden";
        document.getElementById("btnLogin").style.visibility = "visible";
        document.getElementById("lblForgotPassword").style.visibility = "visible";
    }
    document.getElementById("txtEmail_Login").disabled = show;
    document.getElementById("txtPassword_Login").disabled = show;

}
$(document).on("pageshow", function (event) { WaitDiv(false); })
$(document).ready(function () {
    $('#txtEmail_Login').on('keydown', function (e) {

        if (e.which == 13)//enter
        {
            Login();
        }
    });
    $('#txtPassword_Login').on('keydown', function (e) {
        if (e.which == 13) //enter
        {
            Login();
        }
    });
    $('#btnLogin').tap(function () {
        Login();
    });
});

function Login() {
    var strError = "";
    var emailPar = $('#txtEmail_Login').val();
    var passPar = $('#txtPassword_Login').val();

    if (emailPar == "") strError += "email is empty.<br>";
    if (!validateEmail(emailPar) && emailPar != "") strError += "email is Wrong value.<br>";
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
        url: WebServiceURL + "/AdminCheckLogin",
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
                LblInfoText_Login("<label class='Success'>success, please wait ...</label>");
                localStorage.adminToken = JSON.stringify(token);
                location.href = "Main.aspx";
            }
            else {
                LblInfoText_Login("<label class='Faild'>invalid email or password.</label>");
            }
        }
    });
}