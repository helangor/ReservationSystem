using System.ComponentModel.DataAnnotations.Schema;

namespace ReservationSystemBackend.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public Company Company { get; set; }
        public int CompanyId { get; set; }
    }
}