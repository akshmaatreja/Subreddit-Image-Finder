using System;

namespace RedditImgDownloader.Extensions
{
    public static class ImageExtension
    {
        ///<summary>
        /// Checks if given byte array includes jpeg header
        ///</summary>
        /// <param name="image">
        ///   A <see cref="byte[]"/> type representing a value.
        /// </param>
        /// <returns>A <see cref="bool"/></returns>
        public static bool EndWithJpg(this string url)
        {
            if (url == null) return false;
            return url.EndsWith(".jpg") || url.EndsWith(".jpeg");
        }
    }
}