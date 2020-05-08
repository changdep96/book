using System.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

using my_new_app.Models;
using Microsoft.Extensions.DependencyInjection;

namespace my_new_app.Controllers
{
    [Route("attach/google")]
    [ApiController]
    [ActivatorUtilitiesConstructor]
    public class HomController : ControllerBase
    {
        private IConfiguration config;

      
        public object env { get; private set; }

        public HomController(IConfiguration config)
        {
            this.config = config;
            this.env = env;
        }
        [HttpGet]
        public IActionResult Index()
        {

            var clientId = config.GetValue<string>
        ("GoogleDrive:ClientId");
            var clientSecret = config.GetValue<string>
        ("GoogleDrive:ClientSecret");
            var userName = config.GetValue<string>
        ("GoogleDrive:UserName");

            var clientSecrets = new ClientSecrets()
            {
                ClientId = clientId,
                ClientSecret = clientSecret
            };

            string[] scopes = new string[] {
            DriveService.Scope.Drive,
            DriveService.Scope.DriveFile
                  };

            var userCredential = GoogleWebAuthorizationBroker.
            AuthorizeAsync
                (clientSecrets,
                scopes,
                userName,
                CancellationToken.None).Result;

            var driveService = new DriveService(new
        BaseClientService.Initializer()
            {
                HttpClientInitializer = userCredential,
                ApplicationName = "Google Drive API Demo",
            });

        var googleDriveFiles= new
        List<GoogleDriveFileEntry>();
        FilesResource.ListRequest listRequest = 
       driveService.Files.List();
       listRequest.PageSize = 1000;
        FileList fileList = listRequest.Execute();

            while (fileList.Files != null)
            {
                foreach (Google.Apis.Drive.v3.Data.File file in fileList.Files)
                {
                    googleDriveFiles.Add(new
            GoogleDriveFileEntry()
                    {
                        FileId = file.Id,
                        FileName = file.Name
                    });
                }

                if (fileList.NextPageToken == null)
                {
                    break;
                }

                listRequest.PageToken =
                fileList.NextPageToken;
                fileList = listRequest.Execute();
            }
           return Ok(googleDriveFiles);
        }
           
        



    }
}
