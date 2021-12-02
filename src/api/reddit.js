const baseUrl = "https://www.reddit.com";

export async function getPosts(string) {
  try {
    const response = await fetch(baseUrl + string + ".json");

    if (!response.ok) throw Error("fetch error");

    const data = await response.json();

    return formatPostData(data);
  } catch (error) {
    console.error(error);
  }
}

async function formatPostData(data) {
  const posts = data.data.children;

  return posts.map(({ data }) => ({
    subredditName: data.subreddit_name_prefixed,
    title: data.title,
    score: data.score,
    author: data.author,
    // mediaUrl: data.url,
    numComments: data.num_comments,
    numAwards: data.total_awards_received,
    commentUrl:
      "https://www.reddit.com" + data.permalink.replace(/.$/, ".json"),
    name: data.name,
    postHint: data.post_hint,
    postMedia: {
      text: data.selftext,
      richVid: data?.media?.oembed?.html,
      url: data.url,
      thumbnail: data?.thumbnail,
      hostedVid: {
        src: data?.secure_media?.reddit_video?.fallback_url,
        height: data?.secure_media?.reddit_video?.height,
        width: data?.secure_media?.reddit_video?.width,
      },
      link: {
        type: data.link_flair_type,
      },
    },
  }));
}
