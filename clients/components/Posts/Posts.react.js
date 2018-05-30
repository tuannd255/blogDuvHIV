import React from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem.react'
import { getPosts } from '../../ducks/post'
import './posts.scss'

class Posts extends React.Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts } = this.props.posts
    var postItems = ''
    if (posts.length > 0) {
      postItems = posts.map(postItem => {
        return (
          <PostItem
            key={postItem.id}
            post={postItem}
          />
        )
      })
    }

    return (
      <div className="blog-main">
        { postItems }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.post
})

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
