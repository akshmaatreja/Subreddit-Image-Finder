namespace RedditImgDownloader.Models.RedditJson
{
    ///<summary>
    /// <c>PostObject</c> is required during deserializing subreddit json
    ///</summary>
    public class PostObject
    {
        public PostData data { get; set; }
    }
}