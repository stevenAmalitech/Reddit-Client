export async function formatPostData(data) {
  const posts = data.data.children;

  return posts.map(({ data }) => ({
    subredditName: data.subreddit_name_prefixed,
    title: data.title,
    score: data.score,
    author: data.author,
    numComments: data.num_comments,
    numAwards: data.total_awards_received,
    commentUrl: data.permalink,
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

export async function formatCommentData(data) {
  const [postData, commentData] = data;

  const post = await formatPostData(postData);

  const comments = commentData.data.children.map((comment) => {
    const { body: reply, author, name } = comment.data;

    return { reply, author,name };
  });

  return [post, comments];
}
