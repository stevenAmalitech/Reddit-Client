import { Component } from "react";
import "./App.css";
import Post from "../Post/Post";
import Search from "../Search/Search";
import { getAllRedditPosts, searchReddit } from "../api/reddit";

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
          <Post key={post.name} post={post} />
        ))}
      </div>
    );
  }

  async componentDidMount() {
    const posts = await getAllRedditPosts("r/all");

    this.setState({ posts });
  }

  async search(e) {
    e.preventDefault();
    this.setState({ posts: [] });

    const posts = await searchReddit(this.state.searchTerm);
    this.setState({ posts });
  }

  searchInputOnChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  getQuery() {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    console.log(params.get("q"));
  }
}
