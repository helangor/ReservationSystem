using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Enums
{
    public enum ReservationStatus
    {
        New,
        Confirmed,
        Rejected,
        Cancelled,
        NotAvailable
    }

    public enum PriceTableTimePeriod
    {
        Day,
        Week,
        Weekend,
        WeekendDay,
        Special
    }
}
