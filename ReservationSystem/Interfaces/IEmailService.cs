using ReservationSystem.Entities;

namespace ReservationSystem.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(string to, string subject, string html);
        string GetCustomerReservationMessage(Reservation reservation);
        string GetCompanyReservationMessage(string companyName, Reservation reservation);
        string GetReservationMessage(string companyName, Reservation reservation);
    }
}
