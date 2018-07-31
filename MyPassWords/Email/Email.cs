using System;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Serialization;

namespace MyPassWords
{
    public class Email
    {



        public static bool sendForgotPassWordEmail(string to, string subject, string FullName, string passWord)
        {
            string body = "Hi </span><span style='font-family:\"Helvetica\",sans-serif;" +
                            "    mso-fareast-font-family:\"Times New Roman\";color:#0070C0'>##UserFullName##</span><span class=GramE><span" +
                            "    style='font-family:\"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#404040'>,</span></span><span style='font-family:\"Helvetica\",sans-serif;" +
                            "    mso-fareast-font-family:\"Times New Roman\";color:#404040'><br>" +
                            "    <br>" +
                            "    Someone recently requested a password change for your <span class=SpellE>MyPassWords</span>" +
                            "    account. <o:p></o:p></span></p>" +
                            "    <p class=MsoNormal style='line-height:19.5pt'><span style='font-family:" +
                            "    \"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#404040'>the new password is: </span><span style='font-family:\"Helvetica\",sans-serif;" +
                            "    mso-fareast-font-family:\"Times New Roman\";color:#0070C0'>##Password##</span><span" +
                            "    style='font-family:\"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#404040'><o:p></o:p></span></p>" +
                            "    <p class=MsoNormal style='line-height:19.5pt'><span style='font-family:" +
                            "    \"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#404040'><o:p>&nbsp;</o:p></span></p>" +
                            "    <p class=MsoNormal style='line-height:19.5pt'><span style='font-family:" +
                            "    \"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#404040'>To keep your account secure, please don't forward this email" +
                            "    to anyone and delete this message.<o:p></o:p></span></p>" +
                            "    <p class=MsoNormal style='line-height:19.5pt'><span style='font-family:" +
                            "    \"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#404040'><o:p>&nbsp;</o:p></span></p>" +
                            "    <p class=MsoNormal style='line-height:19.5pt'><span style='font-family:" +
                            "    \"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#00B050'>Happy <span class=SpellE>MyPassWords</span>!</span><span" +
                            "    style='font-family:\"Helvetica\",sans-serif;mso-fareast-font-family:\"Times New Roman\";" +
                            "    color:#404040'>";
            return sendEmail(to, subject, body.Replace("##UserFullName##", FullName).Replace("##Password##", passWord));
            
        }
        public static bool sendEmail(string to, string subject, string Body)
        {
            try
            {
                MailMessage message = new MailMessage();
                message.From = new MailAddress("ruppin2017application@gmail.com", "MyPassWords Application");
                message.To.Add(to);
                message.Subject = subject;
                message.IsBodyHtml = true;
                message.Body = GetBodyString(Body);

                SmtpClient smtpClient = new SmtpClient();
                smtpClient.UseDefaultCredentials = true;
                smtpClient.Host = "smtp.gmail.com";
                smtpClient.Port = 587;
                smtpClient.EnableSsl = true;
                smtpClient.Credentials = new System.Net.NetworkCredential("Ruppin2017Application", "MyPassWords2017md");
                smtpClient.Send(message);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static string GetBodyString(string Body)
        {
            string result = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/Email/EmptyMail.html"));
            return result.Replace("##message##", Body);
        }


    }
}