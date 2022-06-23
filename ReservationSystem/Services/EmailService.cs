using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using ReservationSystem.Entities;
using ReservationSystem.Helpers;
using ReservationSystem.Interfaces;
using System;

namespace ReservationSystem.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailServiceSettings _emailServiceSettings;
        private readonly static TimeZoneInfo localZone = TimeZoneInfo.Local;

        public EmailService(IOptions<EmailServiceSettings> emailServiceSettings)
        {
            _emailServiceSettings = emailServiceSettings.Value;
        }

        public async void SendEmail(string to, string subject, string html)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_emailServiceSettings.SmtpUser));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            using var smtp = new SmtpClient();
            smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;
            smtp.Connect(_emailServiceSettings.SmtpHost, _emailServiceSettings.SmtpPort, SecureSocketOptions.StartTlsWhenAvailable);
            smtp.Authenticate(_emailServiceSettings.SmtpUser, _emailServiceSettings.SmtpPass);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }

        public string GetCustomerReservationMessage(Reservation reservation)
        {
            return string.Format(
               "<div>Hei {0}!</div> " +
               "<p>Olemme vastaanottaneet varauksenne: {1} ajalle {2} - {3}</p>" +
               "<p>Vuokraavan yrityksen tiedot:</p>" +
               "<p>{4}</p>" +
               "<p>{5}</p>" +
               "<br>" +
               "<p>Mukavaa paljuilua toivottaa, </p>" +
               "<p>Paljumies, www.paljumies.fi</p>",
               reservation.Name, reservation.Id, GetLocalTime(reservation.StartTime).ToString(),
               GetLocalTime(reservation.EndTime).ToString(), reservation.Product.Name, reservation.Product.City);
        }

        public string GetCompanyReservationMessage(string companyName, Reservation reservation)
        {
            return string.Format(
            "<div>Hei {0}!</div> " +
            "<p>Paljunne on varattu ajalle {1} - {2}</p>" +
            "<p>Varausnumero: {3}</p>" +
            "<p>Varaajan tiedot:</p>" +
            "<p>Nimi: {4} </p>" +
            "<p>Puhelinnumero: {5}</p>" +
            "<p>Sähköposti: {6}</p>" +
            "<p>Viesti: {7}</p>" +
            "<br>" +
            "<p>Paljujen paras välittäjä</p>" +
            "<p>Paljumies, www.paljumies.fi</p>",
            companyName, GetLocalTime(reservation.StartTime).ToString(), GetLocalTime(reservation.EndTime).ToString(),
            reservation.Id, reservation.Name, reservation.PhoneNumber, reservation.Email, reservation.ExtraInfo);
        }

        public string GetReservationMessage(string companyName, Reservation reservation)
        {
            return string.Format(
        "<div>Hei {0}!</div> " +
        "<p>Vuokranantaja on peruuttanut varauksenne ajalle {1} - {2}</p>" +
        "<p>Jos asiasta heräsi kysyttävää, olkaa yhteydessä vuokraavaan yritykseen </p>" +
        "<p>Vuokraavan yrityksen tiedot:</p>" +
        "<p>{3}</p>" +
        "<br>" +
        "<p>Paljumies, www.paljumies.fi</p>",
        reservation.Name, GetLocalTime(reservation.StartTime).ToString(), GetLocalTime(reservation.EndTime).ToString(), companyName);
        }


        private static DateTime GetLocalTime(DateTime time)
        {
            return TimeZoneInfo.ConvertTime(time, localZone);
        }
    }
}