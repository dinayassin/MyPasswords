namespace MyPassWords
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Data.Entity.ModelConfiguration.Conventions;

    public partial class MyPassWordsContext : DbContext
    {
        public MyPassWordsContext() : base("name=MyPassWordsEntities")
        {
        }

        public virtual DbSet<RecordForUser> RecordForUser { get; set; }
        public virtual DbSet<Records> Records { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyPassWordsContext, MyPassWordsConfiguration>());
            Database.SetInitializer<MyPassWordsContext>(new MyPassWordsInitializer<MyPassWordsContext>());

            //without s in tbl name
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Entity<Records>()
                .Property(e => e.Notes)
                .IsUnicode(false);



            modelBuilder.Entity<Users>()
                .Property(e => e.Token)
                .IsUnicode(false);

        }


        private class MyPassWordsInitializer<T> : DropCreateDatabaseIfModelChanges<MyPassWordsContext>
        {

            protected override void Seed(MyPassWordsContext context)
            {
                //users
                #region users
                Users AdminUser =
                new Users()
                {
                    IsBlocked = false,
                    IsAdmin = true,
                    Email = Security.email,
                    FirstName = Security.fName,
                    SurName = Security.lName,
                    PassWord = Security.Encrypt(Security.password),
                    Token = Security.SetToken(Security.email, Security.password)
                };

                context.Users.Add(AdminUser);
                #endregion


                base.Seed(context);
                //context.SaveChanges();
            }// end Seed
        }// end Initializer
    }// end context
}
