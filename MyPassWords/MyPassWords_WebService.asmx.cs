using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace MyPassWords
{
    /// <summary>
    /// Summary description for MyPassWords_WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class MyPassWords_WebService : System.Web.Services.WebService
    {
        JavaScriptSerializer serializer = new JavaScriptSerializer();



        //string strCon = string.Empty;
        public MyPassWords_WebService()
        {
        }

        [WebMethod]
        public string HelloWorld()
        {
            using (var db = new MyPassWordsContext())
            {
                return serializer.Serialize(db.Users.ToList());
            }
        }
        [WebMethod]
        public string ForgotPassword(string email)
        {
            try
            {
                using (var db = new MyPassWordsContext())
                {
                    var user = db.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
                    if (user == null)
                        return serializer.Serialize("UserNotFound");
                    string newPass = Security.randPassword();
                    user.PassWord = Security.Encrypt(newPass);
                    user.Token = Security.SetToken(user.Email, newPass);
                    db.SaveChanges();
                    Email.sendForgotPassWordEmail(user.Email, "MyPassWord .:. Reset your password", user.FirstName + " " + user.SurName, newPass);
                }
                return serializer.Serialize("Success");
            }
            catch (Exception ex)
            { return serializer.Serialize(ex.Message); }

        }
        [WebMethod]
        public string returnRecordsData(string token)
        {
            using (var db = new MyPassWordsContext())
            {
                var user = db.Users.FirstOrDefault(u => u.Token == token);
                if (user != null)
                {
                    var recforUser = db.RecordForUser.Where(rfu => rfu.User.UID == user.UID);
                    if (recforUser == null)
                        return serializer.Serialize(null);

                    var result = from c in recforUser
                                 where c.User.UID == user.UID
                                 orderby c.isFavorite descending
                                 select new
                                 {
                                     c.Record.PassWord,
                                     c.Record.RID,
                                     c.Record.RInsertDT,
                                     c.Record.Title,
                                     c.Record.URL,
                                     c.Record.UserName,
                                     c.Record.Notes,
                                     c.isFavorite
                                 };
                    return serializer.Serialize(result);
                }
            }
            return serializer.Serialize(null);
        }
        [WebMethod]
        public string ChangeFavorite(string token, string recId)
        {
            try
            {
                int rid = int.Parse(recId);
                using (var db = new MyPassWordsContext())
                {
                    Users user = db.Users.FirstOrDefault(u => u.Token == token);
                    if (user != null)
                    {
                        var recforUser = db.RecordForUser.FirstOrDefault(rfu => rfu.User.UID == user.UID && rfu.Record.RID == rid);
                        if (recforUser != null)
                        {
                            recforUser.isFavorite = !recforUser.isFavorite;
                            db.SaveChanges();
                            return serializer.Serialize(true);
                        }
                    }
                }
            }
            catch (Exception)
            { }
            return serializer.Serialize(false);
        }
        [WebMethod]
        public string checkTokenAndRecord(string token, string recId)
        {
            try
            {
                int rid = int.Parse(recId);
                using (var db = new MyPassWordsContext())
                {
                    Users user = db.Users.FirstOrDefault(u => u.Token == token && !u.IsBlocked);
                    if (user != null)
                    {
                        var recforUser = db.RecordForUser.Where(rfu => rfu.User.UID == user.UID && rfu.Record.RID == rid);
                        if (recforUser != null)
                        {
                            return serializer.Serialize(db.Records.FirstOrDefault(r => r.RID == rid));
                        }
                    }
                }
            }
            catch (Exception)
            { }
            return serializer.Serialize(null);
        }

        [WebMethod]
        public string DeleteRecord(string token, string recId)
        {
            Users user = null;
            var rid = -1;
            try
            {
                rid = int.Parse(recId);
                using (var db = new MyPassWordsContext())
                {
                    user = db.Users.FirstOrDefault(u => u.Token == token);
                    if (user != null)
                    {
                        var recforUser = db.RecordForUser.Where(rfu => rfu.User.UID == user.UID && rfu.Record.RID == rid);
                        if (recforUser != null)
                        {
                            foreach (var item in recforUser)
                            {
                                db.RecordForUser.Remove(db.RecordForUser.FirstOrDefault(i => i.RFUID == item.RFUID));
                            }
                            db.SaveChanges();
                        }
                    }

                    int userForRecCount = db.RecordForUser.Where(rfu => rfu.Record.RID == rid).Count();
                    if (userForRecCount == 0)
                        db.Records.Remove(db.Records.FirstOrDefault(r => r.RID == rid));

                    db.SaveChanges();

                    return serializer.Serialize(true);
                }
            }
            catch (Exception)
            {
                return serializer.Serialize(false);
            }
        }

        [WebMethod]
        public string DeleteAccount(string token)
        {
            try
            {
                Users user = null;
                List<int> recToDel = new List<int>();

                using (var db = new MyPassWordsContext())
                {
                    user = db.Users.FirstOrDefault(u => u.Token == token);
                    if (user != null)
                    {
                        var recforUser = db.RecordForUser.Where(rfu => rfu.User.UID == user.UID);
                        foreach (var item in recforUser)
                        {
                            recToDel.Add(item.Record.RID);
                            db.RecordForUser.Remove(item);
                        }
                        db.SaveChanges();
                    }

                    foreach (var item in recToDel)
                    {
                        var data = db.RecordForUser.Where(rfu => rfu.Record.RID == item);
                        if (data.ToList().Count == 0)
                        {
                            var rec = db.Records.FirstOrDefault(r => r.RID == item);
                            db.Records.Remove(rec);
                        }
                    }


                    db.Users.Remove(user);
                    db.SaveChanges();

                    return serializer.Serialize(true);
                }
            }
            catch (Exception)
            {
                return serializer.Serialize(false);
            }


        }
        [WebMethod]
        public string EditRecord(string title, string userName, string pass, string notes, string url, string token, string rec_Id)
        {
            try
            {
                int recId = int.Parse(rec_Id);
                using (var db = new MyPassWordsContext())
                {
                    Users user = db.Users.FirstOrDefault(u => u.Token == token);
                    if (user == null)
                    {
                        return serializer.Serialize("tokenError");
                    }
                    RecordForUser checkPermissions = db.RecordForUser.FirstOrDefault(rfu => rfu.User.UID == user.UID &&
                      rfu.Record.RID == recId);

                    if (checkPermissions == null)
                    {
                        return serializer.Serialize("PermissionsDenied");
                    }
                    Records recUpdate = db.Records.FirstOrDefault(r => r.RID == recId);
                    if (recUpdate == null)
                    {
                        return serializer.Serialize("RecordNotFound");
                    }
                    recUpdate.Title = title;
                    recUpdate.UserName = userName;
                    recUpdate.PassWord = pass;
                    recUpdate.Notes = notes;
                    recUpdate.URL = url;
                    db.SaveChanges();
                    return serializer.Serialize("Success");
                }
            }
            catch (Exception ex)
            { return serializer.Serialize(ex.Message); }
        }
        [WebMethod]
        public string AddSharedUser(string token, string userShare, string rec_Id)
        {

            try
            {
                int recId = int.Parse(rec_Id);
                using (var db = new MyPassWordsContext())
                {
                    Users user = db.Users.FirstOrDefault(u => u.Token == token);
                    if (user == null)
                    {
                        return serializer.Serialize("tokenError");
                    }
                    RecordForUser checkPermissions = db.RecordForUser.FirstOrDefault(rfu => rfu.User.UID == user.UID &&
                      rfu.Record.RID == recId);

                    if (checkPermissions == null)
                    {
                        return serializer.Serialize("PermissionsDenied");
                    }
                    Users NewUser = db.Users.FirstOrDefault(u => u.Email.ToLower() == userShare.ToLower());
                    if (NewUser == null)
                    {
                        return serializer.Serialize("ShareUserNotFound");
                    }
                    RecordForUser checkRecordForUser = db.RecordForUser.FirstOrDefault(rfu => rfu.User.UID == NewUser.UID
                    && rfu.Record.RID == recId);
                    if (checkRecordForUser != null)
                        return serializer.Serialize("ExistsUser");

                    db.RecordForUser.Add(new RecordForUser()
                    {
                        Record = db.Records.FirstOrDefault(r => r.RID == recId),
                        User = db.Users.FirstOrDefault(u => u.UID == NewUser.UID),
                        RFUInsertDT = DateTime.Now
                    });
                    db.SaveChanges();
                    return serializer.Serialize("Success");
                }
            }
            catch (Exception ex)
            { return serializer.Serialize(ex.Message); }

        }

        [WebMethod]
        public string RemoveSharedUser(string token, string removeUserShareID, string rec_Id)
        {

            try
            {
                int recId = int.Parse(rec_Id);
                int removeUserID = int.Parse(removeUserShareID);
                using (var db = new MyPassWordsContext())
                {
                    Users user = db.Users.FirstOrDefault(u => u.Token == token);
                    if (user == null)
                    {
                        return serializer.Serialize("tokenError");
                    }
                    RecordForUser checkPermissions = db.RecordForUser.FirstOrDefault(rfu => rfu.User.UID == user.UID &&
                          rfu.Record.RID == recId);
                    if (checkPermissions == null)
                    {
                        return serializer.Serialize("PermissionsDenied");
                    }
                    Users removeUser = db.Users.FirstOrDefault(u => u.UID == removeUserID);
                    if (removeUser == null)
                    {
                        return serializer.Serialize("removeUserNotFound");

                    }
                    db.RecordForUser.Remove(db.RecordForUser.FirstOrDefault(rfu => rfu.Record.RID == recId &&
                                rfu.User.UID == removeUserID));

                    db.SaveChanges();
                    return serializer.Serialize("Success");
                }
            }
            catch (Exception ex)
            { return serializer.Serialize(ex.Message); }

        }

        [WebMethod]
        public string UsersSharedByRecord(int recId, string token)
        {
            try
            {
                using (var db = new MyPassWordsContext())
                {
                    var res = from rfu in db.RecordForUser
                              where rfu.Record.RID == recId && !(rfu.User.Token == token)
                              orderby rfu.RFUInsertDT
                              select new { rfu.User.Email, rfu.User.FirstName, rfu.User.SurName, rfu.User.UID };
                    return serializer.Serialize(res.ToList());
                }
            }
            catch (Exception)
            { }
            return serializer.Serialize(null);
        }

        [WebMethod]
        public string AdminCheckLogin(string email, string password)
        {
            try
            {
                using (var db = new MyPassWordsContext())
                {
                    var passEnc = Security.Encrypt(password);
                    var res = db.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower() && u.PassWord == passEnc && u.IsAdmin &&!u.IsBlocked);
                    if (res != null)
                    {
                        return serializer.Serialize(res.Token);
                    }
                }
            }
            catch (Exception)
            { }
            return serializer.Serialize(null);
        }

        [WebMethod]
        public string CheckLogin(string email, string password)
        {
            try
            {
                using (var db = new MyPassWordsContext())
                {
                    var passEnc = Security.Encrypt(password);
                    var res = db.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower() && u.PassWord == passEnc && !u.IsBlocked);
                    if (res != null)
                    {
                        return serializer.Serialize(res.Token);
                    }
                }
            }
            catch (Exception)
            { }
            return serializer.Serialize(null);
        }

        [WebMethod]
        public string checkToken(string token)
        {
            using (var db = new MyPassWordsContext())
            {
                var res = db.Users.FirstOrDefault(u => u.Token == token && !u.IsBlocked);
                if (res != null)
                {
                    return serializer.Serialize(true);
                }
            }
            return serializer.Serialize(false);
        }
        [WebMethod]
        public string UserByTokenAdmin(string token)
        {
            using (var db = new MyPassWordsContext())
            {
                var res = db.Users.FirstOrDefault(u => u.Token == token && u.IsAdmin);
                if (res != null)
                {
                    var result = new { FullName = res.FirstName + " " + res.SurName, email = res.Email };
                    return serializer.Serialize(result);
                  
                }
            }
            return serializer.Serialize(null);
        }

        [WebMethod]
        public string changePassWord(string token,string newPass)

        {
            using (var db = new MyPassWordsContext())
            {
                var res = db.Users.FirstOrDefault(u => u.Token == token);
                if (res != null)
                {
                    res.PassWord = Security.Encrypt(newPass);
                    res.Token = Security.SetToken(res.Email, newPass);
                    db.SaveChanges();
                    return serializer.Serialize(res.Token);
                }
            }
            return serializer.Serialize(null);
        }
        [WebMethod]
        public string checkTokenPlus(string token)
        {
            using (var db = new MyPassWordsContext())
            {
                var res = db.Users.FirstOrDefault(u => u.Token == token && !u.IsBlocked);
                if (res != null)
                {
                    res.PassWord = Security.Decrypt(res.PassWord);
                    return serializer.Serialize(res);
                }
            }
            return serializer.Serialize(null);
        }
        [WebMethod]
        public string UpdateUserInfo(string password, string fName, string lName, string token)
        {
            using (var db = new MyPassWordsContext())
            {
                var res = db.Users.FirstOrDefault(u => u.Token == token);
                if (res != null)
                {
                    res.PassWord = Security.Encrypt(password);
                    res.FirstName = fName;
                    res.SurName = lName;
                    res.Token = Security.SetToken(res.Email, password);
                    db.SaveChanges();
                    return serializer.Serialize(res.Token);
                }
            }
            return serializer.Serialize(null);
        }
        [WebMethod]
        public string SignUP(string email, string password, string fName, string lName)
        {
            using (var db = new MyPassWordsContext())
            {
                var res = db.Users.FirstOrDefault(u => u.Email.ToLower() == email.ToLower());
                if (res == null)
                {
                    res = new Users()
                    {
                        IsBlocked = false,
                        IsAdmin = false,
                        Email = email,
                        FirstName = fName,
                        SurName = lName,
                        PassWord = Security.Encrypt(password),
                        Token = Security.SetToken(email, password)
                    };
                    db.Users.Add(res);
                    db.SaveChanges();
                    return serializer.Serialize(res.Token);
                }
            }
            return serializer.Serialize(null);
        }

        [WebMethod]
        public string AddNewRecord(string title, string userName, string pass, string notes, string url, string token)
        {
            string res = string.Empty;
            using (var db = new MyPassWordsContext())
            {
                try
                {
                    Users user = db.Users.FirstOrDefault(u => u.Token == token);
                    if (user != null)
                    {
                        Records rec = new Records()
                        {
                            Title = title,
                            UserName = userName,
                            PassWord = pass,
                            Notes = notes,
                            URL = url,
                            RInsertDT = DateTime.Now
                        };
                        db.Records.Add(rec);
                        db.RecordForUser.Add(
                            new RecordForUser()
                            {
                                Record = rec,
                                User = user,
                                RFUInsertDT = DateTime.Now
                            });
                        db.SaveChanges();
                        res = rec.RID.ToString();
                    }
                }
                catch (Exception)
                { }
            }
            return serializer.Serialize(res);
        }
    }
}