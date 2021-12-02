import { Component } from "react";
import { FaReddit } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Search.css";

export default class Search extends Component {
  render() {
    return (
      <nav>
        <Link id="logo" to="/">
          <FaReddit id="logo__icon" />
          <p id="logo__name">
            Reddit<span>Minimal</span>
          </p>
        </Link>
        <form id="search" onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={this.props.searchTerm}
            onChange={this.props.onChange}
          />

          <input type="submit" value="Search" />
        </form>
      </nav>
    );
  }
}
