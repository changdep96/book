using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Data;
using my_new_app.Models;

namespace ReactDemo.Controllers
{
    public class CommentListController : Controller
    {
        private static readonly IList<CommentList> _comments;

        static CommentListController()
        {
            _comments = new List<CommentList>
            {
                new CommentList
                {
                    Id = 1,
                    Author = "Daniel Lo Nigro",
                   Title = "Hello ReactJS.NET World!"
                },
                new CommentList
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Title = "This is one comment"
                },
                new CommentList
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Title = "This is *another* comment"
                },
            };
        }

[Route("comments")]
[HttpGet]
        public ActionResult Comments()
        {
            return Json(_comments);
        }
    }
}