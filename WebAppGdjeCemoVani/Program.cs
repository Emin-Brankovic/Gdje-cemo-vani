using WebAppGdjeCemoVani.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient("HangoutSpotsApi", client =>
{
	client.BaseAddress = new Uri("https://localhost:7170");
	client.DefaultRequestHeaders.Add("Accept", "application/json");
});

builder.Services.AddTransient<IWebApiExecuter, WebApiExecuter>();
builder.Services.AddTransient<IMailSender, MailSender>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=HangoutSpots}/{action=Index}/{id?}");

app.Run();
