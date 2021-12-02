import { Component } from "react";

export default class Media extends Component {
  render() {
    const { type, content } = this.props;

    if (type === undefined)
      return (
        <div className="post__media--text post__media">
          <p>{content.text}</p>
        </div>
      );

    if (type === "rich:video")
      return (
        <div
          className="post__media--richVid post__media"
          dangerouslySetInnerHTML={{ __html: decodeHtml(content.richVid) }}
        ></div>
      );

    if (type === "image")
      return (
        <div className="post__media--img post__media">
          <img src={content.url} alt="" loading="lazy" />
        </div>
      );

    if (type === "hosted:video") {
      return (
        <div className="post__media--video post__media">
          <video
            width={content.hostedVid.width}
            height={content.hostedVid.height}
            controls
          >
            <source src={content.hostedVid.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (type === "link") {
      const { type } = content.link;

      if (type === "text")
        return (
          <div className="post__media post__media--link--text">
            <div>
              <img src={content.thumbnail} alt="" />
            </div>
            <div>
              <a href={content.url}>{content.url}</a>
            </div>
          </div>
        );
    }

    return <div>{type}</div>;
  }
}

function decodeHtml(string) {
  const element = document.createElement("div");
  element.innerHTML = string;
  return element.childNodes.length === 0 ? "" : element.childNodes[0].nodeValue;
}
