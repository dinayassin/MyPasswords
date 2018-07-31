namespace MyPassWords
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    [Table("tblRecords")]
    public partial class Records
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RID { get; set; }
        [Column(TypeName = "NVARCHAR")]
        public string Title { get; set; }
        public string URL { get; set; }
        [Column(TypeName = "NVARCHAR")]
        public string UserName { get; set; }
        public string PassWord { get; set; }
        [Column(TypeName = "NVARCHAR")]
        public string Notes { get; set; }
        public DateTime RInsertDT { get; set; }

    }
}
