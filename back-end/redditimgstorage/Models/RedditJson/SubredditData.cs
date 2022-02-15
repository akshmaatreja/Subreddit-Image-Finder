using System.Collections.Generic;

namespace RedditImgDownloader.Models.RedditJson
{
    ///<summary>
    /// <c>SubredditData</c> is required during deserializing subreddit json
    ///</summary>
    public class SubredditData
    {
        public IList<PostObject> children { get; set; }
    }
}