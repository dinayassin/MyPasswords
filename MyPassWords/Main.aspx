<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Main.aspx.cs" Inherits="Main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MyPassWords Admin Site .:. Main</title>

    <!-- Bootstrap -->
    <link href="CSS_Admin/bootstrap.min.css" rel="stylesheet" />
    <link href="CSS_Admin/font-awesome.min.css" rel="stylesheet" />
    <link href="CSS_Admin/animate.css" rel="stylesheet" />
    <link href="CSS_Admin/prettyPhoto.css" rel="stylesheet" />
    <link href="CSS_Admin/style.css" rel="stylesheet" />
    <link href="CSS_Admin/MyCSS.css" rel="stylesheet" />


    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>

    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/run_prettify.min.js"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.9/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap3-dialog/1.34.9/js/bootstrap-dialog.min.js"></script>
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <style type="text/css">
            .floating-menu {
                background-color: gray;
                border: 1px solid blue;
                padding: 20px;
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 9999;
            }
        </style>
    
</head>
<body id="AdminSiteMain" style="visibility:hidden;">
    <form id="form1" runat="server">
        <div>
            <header>
                <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div class="navigation">
                        <div class="container">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse.collapse">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <div class="navbar-brand">
                                    <a href="#">
                                        <h1>
                                            <img src="images/Logo.png" id="BarLogo" /><span> My</span>PassWords</h1>
                                    </a>
                                </div>
                            </div>

                            <div class="navbar-collapse collapse">
                                <div class="menu">
                                    <ul id="UserInfoBar" class="nav nav-tabs" role="tablist">
                                        <li role="presentation"><a>
                                            <label id="fullName">Full Name</label></a></li>
                                        <li role="presentation"><a ><label onclick="ChangePassWordShowModal();">Change PassWord</label></a></li>
                                        <li role="presentation"><a>
                                            <label onclick="Logout();">Logout</label></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <section id="main-slider" class="no-margin">
                <br />
                <br />
                <br />
                <br />
                <br />
                <div style="padding: 20px;">
                    <img src="images/Users.png" />

                    <asp:GridView ID="GridView1" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#E7E7FF" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataKeyNames="UID" DataSourceID="SqlDataSource1" GridLines="Horizontal" EnableModelValidation="False" EnablePersistedSelection="True" EnableSortingAndPagingCallbacks="True" HorizontalAlign="Justify" Width="1146px">
                        <AlternatingRowStyle BackColor="#F7F7F7" />
                        <Columns>
                            <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                            <asp:BoundField DataField="UID" HeaderText="ID" InsertVisible="False" ReadOnly="True" SortExpression="UID">
                                <ControlStyle BorderColor="Black" BorderStyle="Solid" />
                            </asp:BoundField>
                            <asp:BoundField DataField="Email" HeaderText="Email" SortExpression="Email" />
                            <asp:BoundField DataField="PassWord" HeaderText="PassWord" SortExpression="PassWord" Visible="False">
                                <ControlStyle BorderColor="Red" BorderStyle="Solid" BorderWidth="1px" Width="5px" />
                                <FooterStyle BorderColor="#0000CC" BorderStyle="Solid" BorderWidth="1px" Width="5px" Wrap="true" />
                                <HeaderStyle BorderColor="#006600" BorderStyle="Solid" BorderWidth="1px" Width="5px" Wrap="true" />
                                <ItemStyle BorderColor="Black" BorderStyle="Solid" BorderWidth="1px" Width="5px" Wrap="true" />
                            </asp:BoundField>
                            <asp:BoundField DataField="Token" HeaderText="Token" SortExpression="Token" Visible="False">
                                <ControlStyle BorderColor="Red" BorderStyle="Solid" BorderWidth="1px" Width="5px" />
                                <FooterStyle BorderColor="#0000CC" BorderStyle="Solid" BorderWidth="1px" Width="5px" Wrap="true" />
                                <HeaderStyle BorderColor="#006600" BorderStyle="Solid" BorderWidth="1px" Width="5px" Wrap="true" />
                                <ItemStyle BorderColor="Black" BorderStyle="Solid" BorderWidth="1px" Width="5px" Wrap="true" />
                            </asp:BoundField>
                            <asp:BoundField DataField="FirstName" HeaderText="First Name" SortExpression="FirstName" />
                            <asp:BoundField DataField="SurName" HeaderText="Sur Name" SortExpression="SurName" />
                            <asp:CheckBoxField DataField="IsBlocked" HeaderText="Is Blocked" SortExpression="IsBlocked" />
                            <asp:CheckBoxField DataField="IsAdmin" HeaderText="Is Admin" SortExpression="IsAdmin" />
                        </Columns>
                        <FooterStyle BackColor="#B5C7DE" ForeColor="#4A3C8C" />
                        <HeaderStyle BackColor="#4A3C8C" Font-Bold="True" ForeColor="#F7F7F7" />
                        <PagerStyle BackColor="#E7E7FF" ForeColor="#4A3C8C" HorizontalAlign="Right" />
                        <RowStyle BackColor="#E7E7FF" ForeColor="#4A3C8C" />
                        <SelectedRowStyle BackColor="#738A9C" Font-Bold="True" ForeColor="#F7F7F7" />
                        <SortedAscendingCellStyle BackColor="#F4F4FD" />
                        <SortedAscendingHeaderStyle BackColor="#5A4C9D" />
                        <SortedDescendingCellStyle BackColor="#D8D8F0" />
                        <SortedDescendingHeaderStyle BackColor="#3E3277" />
                    </asp:GridView>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:DbConnectionString %>" DeleteCommand="DELETE FROM [tblUsers] WHERE [UID] = @UID" InsertCommand="INSERT INTO [tblUsers] ([Email], [PassWord], [Token], [FirstName], [SurName], [IsBlocked], [IsAdmin]) VALUES (@Email, @PassWord, @Token, @FirstName, @SurName, @IsBlocked, @IsAdmin)" SelectCommand="SELECT * FROM [tblUsers]" UpdateCommand="UPDATE [tblUsers] SET [Email] = @Email, [PassWord] = @PassWord, [Token] = @Token, [FirstName] = @FirstName, [SurName] = @SurName, [IsBlocked] = @IsBlocked, [IsAdmin] = @IsAdmin WHERE [UID] = @UID">
                        <DeleteParameters>
                            <asp:Parameter Name="UID" Type="Int32" />
                        </DeleteParameters>
                        <InsertParameters>
                            <asp:Parameter Name="Email" Type="String" />
                            <asp:Parameter Name="PassWord" Type="String" />
                            <asp:Parameter Name="Token" Type="String" />
                            <asp:Parameter Name="FirstName" Type="String" />
                            <asp:Parameter Name="SurName" Type="String" />
                            <asp:Parameter Name="IsBlocked" Type="Boolean" />
                            <asp:Parameter Name="IsAdmin" Type="Boolean" />
                        </InsertParameters>
                        <UpdateParameters>
                            <asp:Parameter Name="Email" Type="String" />
                            <asp:Parameter Name="PassWord" Type="String" />
                            <asp:Parameter Name="Token" Type="String" />
                            <asp:Parameter Name="FirstName" Type="String" />
                            <asp:Parameter Name="SurName" Type="String" />
                            <asp:Parameter Name="IsBlocked" Type="Boolean" />
                            <asp:Parameter Name="IsAdmin" Type="Boolean" />
                            <asp:Parameter Name="UID" Type="Int32" />
                        </UpdateParameters>
                    </asp:SqlDataSource>

                    <br />
                    <br />
                    <img src="images/Records.png" />

                    <asp:GridView ID="GridView2" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#E7E7FF" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataKeyNames="RID" DataSourceID="SqlDataSource2" GridLines="Horizontal" EnableModelValidation="False" EnablePersistedSelection="True" EnableSortingAndPagingCallbacks="True" HorizontalAlign="Justify" Width="1146px">
                        <AlternatingRowStyle BackColor="#F7F7F7" />
                        <Columns>
                            <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                            <asp:BoundField DataField="RID" HeaderText="ID" InsertVisible="False" ReadOnly="True" SortExpression="RID"></asp:BoundField>
                            <asp:BoundField DataField="Title" HeaderText="Title" SortExpression="Title" />
                            <asp:BoundField DataField="URL" HeaderText="URL" SortExpression="URL"></asp:BoundField>
                            <asp:BoundField DataField="UserName" HeaderText="UserName" SortExpression="UserName"></asp:BoundField>
                            <asp:BoundField DataField="PassWord" HeaderText="PassWord" SortExpression="PassWord" Visible="False" />
                            <asp:BoundField DataField="Notes" HeaderText="Notes" SortExpression="Notes" />
                            <asp:BoundField DataField="RInsertDT" HeaderText="Insert Time" SortExpression="RInsertDT" />
                        </Columns>
                        <FooterStyle BackColor="#B5C7DE" ForeColor="#4A3C8C" />
                        <HeaderStyle BackColor="#4A3C8C" Font-Bold="True" ForeColor="#F7F7F7" />
                        <PagerStyle BackColor="#E7E7FF" ForeColor="#4A3C8C" HorizontalAlign="Right" />
                        <RowStyle BackColor="#E7E7FF" ForeColor="#4A3C8C" />
                        <SelectedRowStyle BackColor="#738A9C" Font-Bold="True" ForeColor="#F7F7F7" />
                        <SortedAscendingCellStyle BackColor="#F4F4FD" />
                        <SortedAscendingHeaderStyle BackColor="#5A4C9D" />
                        <SortedDescendingCellStyle BackColor="#D8D8F0" />
                        <SortedDescendingHeaderStyle BackColor="#3E3277" />
                    </asp:GridView>
                    <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:DbConnectionString %>" DeleteCommand="DELETE FROM [tblRecords] WHERE [RID] = @RID" InsertCommand="INSERT INTO [tblRecords] ([Title], [URL], [UserName], [PassWord], [Notes], [RInsertDT]) VALUES (@Title, @URL, @UserName, @PassWord, @Notes, @RInsertDT)" SelectCommand="SELECT * FROM [tblRecords]" UpdateCommand="UPDATE [tblRecords] SET [Title] = @Title, [URL] = @URL, [UserName] = @UserName, [PassWord] = @PassWord, [Notes] = @Notes, [RInsertDT] = @RInsertDT WHERE [RID] = @RID">
                        <DeleteParameters>
                            <asp:Parameter Name="RID" Type="Int32" />
                        </DeleteParameters>
                        <InsertParameters>
                            <asp:Parameter Name="Title" Type="String" />
                            <asp:Parameter Name="URL" Type="String" />
                            <asp:Parameter Name="UserName" Type="String" />
                            <asp:Parameter Name="PassWord" Type="String" />
                            <asp:Parameter Name="Notes" Type="String" />
                            <asp:Parameter Name="RInsertDT" Type="DateTime" />
                        </InsertParameters>
                        <UpdateParameters>
                            <asp:Parameter Name="Title" Type="String" />
                            <asp:Parameter Name="URL" Type="String" />
                            <asp:Parameter Name="UserName" Type="String" />
                            <asp:Parameter Name="PassWord" Type="String" />
                            <asp:Parameter Name="Notes" Type="String" />
                            <asp:Parameter Name="RInsertDT" Type="DateTime" />
                            <asp:Parameter Name="RID" Type="Int32" />
                        </UpdateParameters>
                    </asp:SqlDataSource>

                    <br />
                    <br />
                    <br />
                    <img src="images/RecordsForUser.png" />

                    <asp:GridView ID="GridView3" runat="server" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#E7E7FF" BorderStyle="None" BorderWidth="1px" CellPadding="3" DataKeyNames="RFUID" DataSourceID="SqlDataSource3" GridLines="Horizontal" EnableModelValidation="False" EnablePersistedSelection="True" EnableSortingAndPagingCallbacks="True" HorizontalAlign="Justify" Width="1146px">
                        <AlternatingRowStyle BackColor="#F7F7F7" />
                        <Columns>
                            <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                            <asp:BoundField DataField="RFUID" HeaderText="ID" InsertVisible="False" ReadOnly="True" SortExpression="RFUID"></asp:BoundField>
                            <asp:CheckBoxField DataField="isFavorite" HeaderText="Favorite" SortExpression="isFavorite" />
                            <asp:BoundField DataField="RFUInsertDT" HeaderText="Insert Time" SortExpression="RFUInsertDT" />
                            <asp:BoundField DataField="Record_RID" HeaderText="Record ID" SortExpression="Record_RID"></asp:BoundField>
                            <asp:BoundField DataField="User_UID" HeaderText="User ID" SortExpression="User_UID"></asp:BoundField>
                        </Columns>
                        <FooterStyle BackColor="#B5C7DE" ForeColor="#4A3C8C" />
                        <HeaderStyle BackColor="#4A3C8C" Font-Bold="True" ForeColor="#F7F7F7" />
                        <PagerStyle BackColor="#E7E7FF" ForeColor="#4A3C8C" HorizontalAlign="Right" />
                        <RowStyle BackColor="#E7E7FF" ForeColor="#4A3C8C" />
                        <SelectedRowStyle BackColor="#738A9C" Font-Bold="True" ForeColor="#F7F7F7" />
                        <SortedAscendingCellStyle BackColor="#F4F4FD" />
                        <SortedAscendingHeaderStyle BackColor="#5A4C9D" />
                        <SortedDescendingCellStyle BackColor="#D8D8F0" />
                        <SortedDescendingHeaderStyle BackColor="#3E3277" />
                    </asp:GridView>
                    <asp:SqlDataSource ID="SqlDataSource3" runat="server" ConnectionString="<%$ ConnectionStrings:DbConnectionString %>" DeleteCommand="DELETE FROM [tblRecordForUser] WHERE [RFUID] = @RFUID" InsertCommand="INSERT INTO [tblRecordForUser] ([isFavorite], [RFUInsertDT], [Record_RID], [User_UID]) VALUES (@isFavorite, @RFUInsertDT, @Record_RID, @User_UID)" SelectCommand="SELECT * FROM [tblRecordForUser]" UpdateCommand="UPDATE [tblRecordForUser] SET [isFavorite] = @isFavorite, [RFUInsertDT] = @RFUInsertDT, [Record_RID] = @Record_RID, [User_UID] = @User_UID WHERE [RFUID] = @RFUID">
                        <DeleteParameters>
                            <asp:Parameter Name="RFUID" Type="Int32" />
                        </DeleteParameters>
                        <InsertParameters>
                            <asp:Parameter Name="isFavorite" Type="Boolean" />
                            <asp:Parameter Name="RFUInsertDT" Type="DateTime" />
                            <asp:Parameter Name="Record_RID" Type="Int32" />
                            <asp:Parameter Name="User_UID" Type="Int32" />
                        </InsertParameters>
                        <UpdateParameters>
                            <asp:Parameter Name="isFavorite" Type="Boolean" />
                            <asp:Parameter Name="RFUInsertDT" Type="DateTime" />
                            <asp:Parameter Name="Record_RID" Type="Int32" />
                            <asp:Parameter Name="User_UID" Type="Int32" />
                            <asp:Parameter Name="RFUID" Type="Int32" />
                        </UpdateParameters>
                    </asp:SqlDataSource>
                </div>
            </section>
            <!--/#main-slider-->
            <footer>
                <div class="footer">
                    <div class="container">

                        <div class="col-md-4 col-md-offset-4">
                            <div class="copyright">
                                &copy; MyPassWords Application. All Rights Reserved.
                        <div class="credits">
                        </div>
                            </div>
                        </div>
                    </div>

                    <div class="pull-right">
                    </div>
                </div>
            </footer>

            <script src="JS/Global_JS.js"></script>
            <script src="JS/Main_Admin_JS.js"></script>
        </div>
    </form>

</body>
</html>
