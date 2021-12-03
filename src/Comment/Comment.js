import { Component } from "react";
import { getPostComment } from "../api/reddit";
import Post from "../Post/Post";
import { formatCommentData } from "../utils";
import ReactMarkdown from "react-markdown";
import "./Comment.css";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { post: {}, comments: [], loaded: false };
  }
  render() {
    return (
      <div className="contents ">
        <button id="back" onClick={() => window.history.back()}>
          Go back
        </button>
        {this.state.loaded && <Post post={this.state.post} />}
        {this.state.loaded &&
          this.state.comments.map((comment) => {
            return (
              <div key={comment.name} className="comment">
                <p className="comment__author">u/{comment.author}</p>
                <ReactMarkdown
                  children={comment.reply}
                  className="comment__text"
                />
              </div>
            );
          })}
      </div>
    );
  }

  async componentDidMount() {
    const data = await getPostComment(this.commentUrl());

    const [post, comments] = await formatCommentData(data);

    this.setState({ post: post[0], comments, loaded: true });

    document.title = this.state.post.title;
  }

  commentUrl() {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    return params.get("url");
  }
}
