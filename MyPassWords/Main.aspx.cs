using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft;
using System.Web.Script.Serialization;
using System.Text;
using System.Data;
using System.Net.Http;
using System.Net.Http.Formatting;


using System.Configuration;
using System.Data.SqlClient;



public partial class Main : System.Web.UI.Page
{
 //   HttpClient client = null;

    private string getUserDataByToken(string token)
    {
        if (token != null && token != "" && token.ToLower() != "null")
        {
            //JavaScriptSerializer seralizer = new JavaScriptSerializer();
            //client.DefaultRequestHeaders.Accept.Clear();
            //client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //HttpResponseMessage response = client.PostAsJsonAsync("UserCredntials/UserByTokenAdmin", token).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    return seralizer.Deserialize<string>(response.Content.ReadAsAsync<string>().Result);
            //}
        }
        return null;
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        //if (!Page.IsPostBack)
        //{
        //    HttpCookie cookie = Request.Cookies["adminToken"];
        //    if (cookie == null)
        //    {
        //        Page.Visible = false;
        //        Response.Redirect("Admin.html");
        //    }

        //    string adminToken = cookie.Value;
        //    var res = getUserDataByToken(adminToken);

        //    if (res == null)
        //    {
        //        Page.Visible = false;
        //        Response.Redirect("Admin.html");
        //    }

        //}
    }

   
}