using System.Text.Json;
using WebAppGdjeCemoVani.Models;

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
			//return await httpClinet.GetFromJsonAsync<T>(relativeUrl);

			var request=new HttpRequestMessage(HttpMethod.Get, relativeUrl);
			var response=await httpClinet.SendAsync(request);
			await HandlePotentialError(response);

			return await response.Content.ReadFromJsonAsync<T>();
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

		public async Task<T?> InvokePost<T>(string relativeUrl,T obj)
		{
			var httpClient=httpClientFactory.CreateClient(ApiName);
			var response= await httpClient.PostAsJsonAsync(relativeUrl,obj);

			await HandlePotentialError(response);

			return await response.Content.ReadFromJsonAsync<T>();
		}

		public async Task InvokePut<T>(string relativeUrl,T obj)
		{
			var httpClient = httpClientFactory.CreateClient(ApiName);
			var response= await httpClient.PutAsJsonAsync<T>(relativeUrl,obj);

			await HandlePotentialError(response);

		}

		public async Task InvokeDelete(string relativeUrl)
		{
			var httpClient = httpClientFactory.CreateClient(ApiName);
			var response = await httpClient.DeleteAsync(relativeUrl);
			await HandlePotentialError(response);
		}


		private async Task HandlePotentialError(HttpResponseMessage response)
		{
			if (!response.IsSuccessStatusCode)
			{
				var errorJson = await response.Content.ReadAsStringAsync();// ovo je JSON string koji se mora deserialize
				throw new WepApiException(errorJson);
			}
		}
	}
}

