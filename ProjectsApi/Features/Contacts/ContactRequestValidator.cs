using System.Net.Mail;
using System.Text.RegularExpressions;

namespace ProjectsApi.Features.Contacts;

public sealed partial class ContactRequestValidator
{
    public Dictionary<string, string[]> Validate(ContactRequest request)
    {
        var errors = new Dictionary<string, string[]>();
        var name = request.Name.Trim();
        var phone = NormalizePhone(request.Phone);
        var email = request.Email.Trim();
        var service = request.Service.Trim();
        var message = request.Message.Trim();

        if (name.Length is < 2 or > 80 || !NamePattern().IsMatch(name))
            errors["name"] = ["Въведете валидно име."];
        if (!PhonePattern().IsMatch(phone))
            errors["phone"] = ["Въведете валиден български телефонен номер."];
        if (!IsValidEmail(email))
            errors["email"] = ["Въведете валиден email адрес."];
        if (service.Length is < 2 or > 120)
            errors["service"] = ["Изберете валидна услуга."];
        if (message.Length is < 20 or > 2000)
            errors["message"] = ["Съобщението трябва да съдържа между 20 и 2000 символа."];
        if (new[] { name, request.Phone, email, service, message }.Any(HasUnsafeText))
            errors["message"] = ["Не използвайте HTML тагове или невалидни символи."];

        return errors;
    }

    public static string NormalizePhone(string value) => PhoneFormattingPattern().Replace(value.Trim(), "");

    private static bool IsValidEmail(string value)
    {
        if (value.Length is 0 or > 254) return false;
        try { return new MailAddress(value).Address.Equals(value, StringComparison.OrdinalIgnoreCase); }
        catch (FormatException) { return false; }
    }

    private static bool HasUnsafeText(string value) =>
        value.Contains('<') || value.Contains('>') ||
        value.Any(character => character < 32 && character is not '\t' and not '\n' and not '\r');

    [GeneratedRegex(@"^[\p{L}][\p{L}\p{M}' -]*$")]
    private static partial Regex NamePattern();
    [GeneratedRegex(@"^(?:\+359|359|0)\d{8,9}$")]
    private static partial Regex PhonePattern();
    [GeneratedRegex(@"[\s().-]")]
    private static partial Regex PhoneFormattingPattern();
}
