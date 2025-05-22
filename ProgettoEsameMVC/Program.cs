using ProgettoEsameMVC.WSSoap;
using SoapCore;

namespace ProgettoEsameMVC
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddRazorPages();

            builder.Services.AddSoapCore();
            builder.Services.AddScoped<IUNIFEAccessPoint, ServizioUNIFEAccessPoint>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.MapRazorPages();

            app.UseEndpoints(endpoints =>
            {
                endpoints.UseSoapEndpoint<IUNIFEAccessPoint>(path: "/ServizioUNIFEAccessPoint.wsdl", new SoapEncoderOptions(), SoapSerializer.XmlSerializer);
            });

            app.Run();
        }
    }
}
