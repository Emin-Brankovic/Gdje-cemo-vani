namespace WebAppGdjeCemoVani.Data
{
	public class WebApiExecuter : IWebApiExecuter
	{
		private readonly IHttpClientFactory httpClientFactory;
		private const string ApiName = "HangoutSpotsApi";

		public WebApiExecuter(IHttpClientFactory httpClientFactory)
		{
			this.httpClientFactory = httpClientFactory;
		}
		public async Task<T?> InvokeGet<T>(string relativeUrl)
		{
			var httpClinet = httpClientFactory.CreateClient(ApiName);
			return await httpClinet.GetFromJsonAsync<T>(relativeUrl);
		}

		public async Task<T?> InvokeGetByName<T>(string relativeUrl)
		{
			var httpClinet = httpClientFactory.CreateClient(ApiName);
			return await httpClinet.GetFromJsonAsync<T>(relativeUrl);
		}

		public async Task<T?> InvokeGetCategories<T>(string relativeUrl)
		{
			var httpClinet = httpClientFactory.CreateClient(ApiName);
			return await httpClinet.GetFromJsonAsync<T>(relativeUrl);
		}

		public async Task<T?> InvokeGetTownParts<T>(string relativeUrl)
		{
			var httpClinet = httpClientFactory.CreateClient(ApiName);
			return await httpClinet.GetFromJsonAsync<T>(relativeUrl);
		}
	}
}
