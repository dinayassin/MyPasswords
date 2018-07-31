var userData = null;
var prm =
    {
        token: getTokenAdmin()
    };
$.ajax({
    url: WebServiceURL + "/UserByTokenAdmin",
    dataType: "json",
    type: "POST", //use only POST!
    data: JSON.stringify(prm),
    contentType: "application/json; charset=utf-8",
    error: function (jqXHR, exception) {
        var errorStr = formatErrorMessage(jqXHR, exception);
        alert(errorStr);
        gotoDefaultPage();
    },
    async: false,
    success: function (data) {
        var res = JSON.parse(data.d);
        if (res == null)
            Logout();
        else {
            userData = res;
            $("#fullName").text(res.FullName);
            $("#AdminSiteMain").css("visibility", "visible");
        }
    }
});//ajax

function changePassWord(newPass) {
    var prm =
        {
            token: getTokenAdmin(),
            newPass: newPass
        };
    $.ajax({
        url: WebServiceURL + "/changePassWord",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(prm),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            var errorStr = formatErrorMessage(jqXHR, exception);
            alert(errorStr);
        },
        async: false,
        success: function (data) {
            var res = JSON.parse(data.d);
            if (res == null)
                alert("Change PassWord is faild !");
            else {
                localStorage.adminToken = res;
                alert("Change PassWord is Success.");
            }
        }
    });//ajax
}

function Logout() {
    localStorage.adminToken = null;
    gotoDefaultPage();
}

function gotoDefaultPage() {
    location.replace("Admin.html");
}

function ChangePassWordShowModal() {
    BootstrapDialog.closeAll();

    var dialog = BootstrapDialog.show({
        title: 'Change PassWord',
        //message: $('Email: ' + userData.email+'<br><textarea class="form-control" placeholder="Try to input multiple lines here..."></textarea>'),
        message: 'Email: ' + userData.email + '<br>New PassWord:<input id="ChangePassWord_NewPass" type="Password" class="form-control">',
        buttons: [{
            label: 'Go',
            cssClass: 'btn-primary',
            hotkey: 13, // Enter.
            action: function () {
                if ($("#ChangePassWord_NewPass").val() == "")
                    Alert("Password is empty!");
                else {
                    changePassWord($("#ChangePassWord_NewPass").val());
                    BootstrapDialog.closeAll();
                }

            }
        }]
    });
    dialog.open();
}
