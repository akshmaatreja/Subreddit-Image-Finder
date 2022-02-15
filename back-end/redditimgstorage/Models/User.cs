using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RedditImgDownloader.Models
{
    ///<summary>
    /// The <c>WebImage</c> model holds selected image url and date
    ///</summary>
    public class User
    {
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        public List<string> imageUrls { get; init; }
    }
}