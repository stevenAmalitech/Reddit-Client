import { Component } from "react";
// import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Post from "../Post/Post";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  render() {
    return (
      <div className="contents">
        {this.state.posts.map((post) => (
          <Post key={post.name} post={post} />
        ))}
      </div>
    );
  }

  async componentDidMount() {
    const posts = await getPopularPosts();

    this.setState({ posts });
  }
}

async function getPopularPosts() {
  try {
    const response = await fetch("https://www.reddit.com/r/all.json");

    if (!response.ok) throw Error("Fetch error");

    const data = await response.json();

    return formatPost(data);
  } catch (error) {
    console.error(error);
  }
}

async function formatPost(data) {
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

// selftext
