import React from 'react'
import { connect } from 'react-redux'
import PostItem from './PostItem.react'
import * as actions from '../../ducks/post'
import { Scrollbars } from 'react-custom-scrollbars'
import { bindActionCreators } from 'redux'
import './posts.scss'

class Posts extends React.Component {

  componentDidMount() {
    this.props.actions.getPosts()
  }

  renderPost = () => {
    const { posts } = this.props.post
    if (!posts.length) return null

    return posts.map(post => (
      <PostItem key={post.id} post={post} />
    ))
  }

  handleScroll = () => {
    const scroll = this.refs.posts
    const { top } = scroll.getValues()
    if (top === 1) {
      const { actions, post: { page, totalPages } } = this.props
      if (page < totalPages) {
        actions.updatePagePost(page + 1)
        actions.getPosts()
      }
    }
  }

  render() {
    const { post: { isLoading } } = this.props
    return (
      <Scrollbars className="blog-main" ref="posts" onScroll={this.handleScroll}>
        {this.renderPost()}
        {isLoading && <div className="text-center pd-5"><img src="images/loading.gif" /></div>}
      </Scrollbars>
    )
  }
}

const mapStateToProps = state => ({
  post: state.post
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
