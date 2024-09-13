
using System.Net;
using System.Net.Mail;

namespace WebAppGdjeCemoVani.Data
{
    public class MailSender : IMailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            var config=new ConfigurationBuilder()
                .AddUserSecrets<Program>()
                .Build();

            var mail = config["email"];
            var pw = config["password"];
            

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(mail, pw)
            };

            return client.SendMailAsync(new MailMessage(
                from:mail,
                to: email,
                subject,
                message
                ));
        }
    }
}
