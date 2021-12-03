import { Component } from "react";
import "./App.css";
import Post from "../Post/Post";
import Search from "../Search/Search";
import { getAllRedditPosts, searchReddit } from "../api/reddit";
import { formatPostData } from "../utils";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchTerm: "",
    };

    this.search = this.search.bind(this);
    this.searchInputOnChange = this.searchInputOnChange.bind(this);
  }

  render() {
    return (
      <div className="contents">
        <Search
          handleSubmit={this.search}
          searchTerm={this.state.searchTerm}
          onChange={this.searchInputOnChange}
        />
        {this.state.posts.map((post) => (
          <Post key={post.name} post={post} onClick={true} />
        ))}
      </div>
    );
  }

  async componentDidMount() {
    let posts = await getAllRedditPosts();
    posts = await formatPostData(posts);

    this.setState({ posts });

    document.title = "Reddit Client"
  }

  async search(e) {
    e.preventDefault();
    this.setState({ posts: [] });

    let posts = await searchReddit(this.state.searchTerm);
    posts = await formatPostData(posts)
    this.setState({ posts });
  }

  searchInputOnChange(e) {
    this.setState({ searchTerm: e.target.value });
  }
}
