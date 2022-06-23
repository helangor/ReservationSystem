using ReservationSystem.Entities;

namespace ReservationSystemBackend.Entities
{
    public class Photo : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        public virtual Product Product { get; set; }
    }
}