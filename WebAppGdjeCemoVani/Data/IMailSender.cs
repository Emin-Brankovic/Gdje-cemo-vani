namespace WebAppGdjeCemoVani.Data
{
    public interface IMailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
