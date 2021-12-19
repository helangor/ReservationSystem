﻿using System.ComponentModel.DataAnnotations.Schema;

namespace ReservationSystemBackend.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}