import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostItem extends Component {
  render() {
    const { post } = this.props
    var author = ''
    if (post.author) {
      author = (
        <p className="blog-post-meta">{post.created_at} by { author.name || author.email }</p>
      )
    }
    return (
      <div className="blog-post">
        <h2 className="blog-post-title">{post.title}</h2>
        {author}
        <p>{post.content}</p>
      </div>
    )
  }
}

export default PostItem;
