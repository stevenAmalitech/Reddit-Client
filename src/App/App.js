import { Component } from "react";
import "./App.css";
import Post from "../Post/Post";
import { getPosts } from "../api/reddit";

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
    const posts = await getPosts("/r/all");

    this.setState({ posts });
  }
}
