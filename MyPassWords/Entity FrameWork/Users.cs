namespace MyPassWords
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tblUsers")]
    public partial class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UID { get; set; }
        [StringLength(150)]
        public string Email { get; set; }
        public string PassWord { get; set; }
        public string Token { get; set; }
        [Column(TypeName = "NVARCHAR")]
        public string FirstName { get; set; }
        [Column(TypeName = "NVARCHAR")]
        public string SurName { get; set; }
        public bool IsBlocked { get; set; }
        public bool IsAdmin { get; set; }
    }
}
