
namespace WebAppGdjeCemoVani.Data
{
	public interface IWebApiExecuter
	{
		Task<T?> InvokeGet<T>(string relativeUrl);
		Task<T?> InvokeGetByName<T>(string relativeUrl);
		Task<T?> InvokeGetCategories<T>(string relativeUrl);
		Task<T?> InvokeGetTownParts<T>(string relativeUrl);
	}
}