namespace RedditImgDownloader.Models.RedditJson
{
    ///<summary>
    /// <c>PostData</c> is required during deserializing subreddit json
    /// and holds information about title, name and image url
    ///</summary>
    public class PostData
    {
        public string url { get; set; }
        public string title { get; set; }
        public string name { get; set; }
    }
}