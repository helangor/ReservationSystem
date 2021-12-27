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

        public void Send(string from, string to, string subject, string html)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(from));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = html };

            // send email
            using (var client = new SmtpClient())
            {
                client.Connect(_emailServiceSettings.SmtpHost, _emailServiceSettings.SmtpPort, SecureSocketOptions.None);

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate(_emailServiceSettings.SmtpUser, _emailServiceSettings.SmtpPass);

                client.Send(email);
                client.Disconnect(true);
            }
        }
    }
}