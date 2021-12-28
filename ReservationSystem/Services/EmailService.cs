using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using ReservationSystem.Helpers;
using ReservationSystem.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ReservationSystem.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailServiceSettings _emailServiceSettings;

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
    }
}