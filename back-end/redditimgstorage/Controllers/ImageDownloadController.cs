using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using RedditImgDownloader.Models;
using RedditImgDownloader.Repositories;

namespace RedditImgDownloader.Controllers
{
    ///<summary>
    /// The <c>ImageDownloadController</c> provides two method to
    /// first method selects random image from given repository and saves it's select date,
    /// second method returns all selected images and its selected date as json
    ///</summary>
    [ApiController]
    [Route("")]
    public class ImageDownloadController : ControllerBase
    {
        private readonly IDownloadRepository repository;

        ///<summary>
        /// Initializes a new instance of a
        /// <c>ImageDownloadController</c> type
        ///</summary>
        /// <param name="repository">
        ///   A <see cref="IDownloadRepository"/> type representing a value.
        /// </param>
        public ImageDownloadController(IDownloadRepository repository) //Inject the repository dependency
        {
            this.repository = repository;
        }

        ///<summary>
        /// Returns selected images and their select dates.
        /// In case of error, it returns error message.
        ///</summary>
        /// <exception cref="Exception">
        ///   if repository.ReturnJsonFiles method throws an exception.
        /// </exception>
        /// <returns>A <see cref="ContentResult" or A <see cref="NotFoundObjectResult"/></returns>
        [HttpPost]
        [Route("history")]
        public ActionResult<string> ReturnHistory([FromBody] string username)
        {
            try
            {
                var images = repository.ReturnHistory(username);
                return Content(string.Join(", ", images.ToArray()));
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        [Route("register")]
        public ActionResult Register(User user)
        {
            var isCreated = repository.CreateUser(user.username, user.password);
            if (isCreated)
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }
        [HttpPost]
        [Route("login")]
        public ActionResult Login(User user)
        {
            var isLog = repository.Login(user.username, user.password);
            if (isLog)
            {
                return Ok(true);
            }
            else
            {
                return NotFound(false);
            }
        }

        ///<summary>
        /// Takes subreddit as argument and saves image and its select date.
        /// In case of error, it returns error message.
        ///</summary>
        /// <param name="subreddit">
        ///   A <see cref="string"/> type representing a value.
        /// </param>
        ///</summary>
        /// <exception cref="Exception">
        ///   if repository.CreateJsonFile method throws an exception.
        /// </exception>
        /// <returns>A <see cref="CreatedAtActionResult" or A <see cref="NotFoundObjectResult"/></returns>
        [HttpPost]
        [Route("random")]
        public ActionResult<string> CreateRandom([FromBody] string data)
        {
            var datas = data.Split(",");
            string subreddit = datas[0];
            string username = datas[1];
            try
            {
                var image = repository.AddRandomPost(subreddit, username);
                return Content(image);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }

        }


    }
}