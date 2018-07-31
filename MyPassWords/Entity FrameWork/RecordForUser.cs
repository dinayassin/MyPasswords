namespace MyPassWords
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tblRecordForUser")]
    public partial class RecordForUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RFUID { get; set; }
        public virtual Records Record { get; set; }
        public virtual Users User { get; set; }
        [DefaultValue("false")]
        public bool isFavorite { get; set; }
        public DateTime RFUInsertDT { get; set; }
    }
}
