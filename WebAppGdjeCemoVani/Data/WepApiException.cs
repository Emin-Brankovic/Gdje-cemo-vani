using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WebAppGdjeCemoVani.Data
{
	public class WepApiException:Exception
	{
        public ErrorResponse? ErrorResponse { get; }
        public WepApiException(string errorJson)
        {
            ErrorResponse= JsonSerializer.Deserialize<ErrorResponse>(errorJson);
		}
    }
}
