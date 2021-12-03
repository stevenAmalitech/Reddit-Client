import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Post.css";
import Media from "./Media";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.onClick) this.setState({ clicked: true });
  }

  commentUrl() {
    return "/comments?url=" + this.props.post.commentUrl;
  }

  className() {
    return this.props.onClick ? "post " : "post not-link";
  }

  render() {
    const { post } = this.props;

    {
      console.log(this.className());
    }

    return (
      <article className={this.className()} onClick={this.handleClick}>
        {this.state.clicked && <Navigate to={this.commentUrl()} />}
        <div className="meta">
          <span className="subreddit__name">{post.subredditName}</span>
          <span>•</span>
          <span className="author">Posted by u/{post.author}</span>
        </div>
        <Link to={this.commentUrl()} className="title">
          <header>{post.title}</header>
        </Link>
        <div className="post__media--wrapper">
          <Media type={post.postHint} content={post.postMedia} />
        </div>
        <div className="post__other">
          <div>{formatScore(post.score)} Score</div>
          <div>{post.numComments} Comments</div>
          <div>{post.numAwards} Awards</div>
        </div>
      </article>
    );
  }
}

function formatScore(score) {
  score = score.toString();

  if (score.length <= 3) return score;

  return score.replace(/\d{3}$/, (string) => "." + string.charAt(0) + "k");
}
