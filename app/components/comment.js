import React from 'react';
import {Link} from 'react-router';
import {unixTimeToString} from '../util';
import {likeComment, unlikeComment} from '../server';
export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        // The FeedItem's initial state is what the Feed passed to us.
        this.state = props.data;
    }

    didUserLike() {
        var likeCounter = this.state.likeCounter;
        var liked = false;
        // Look for a likeCounter entry with userId 4 -- which is the
        // current user.
        for (var i = 0; i < likeCounter.length; i++) {
            if (likeCounter[i]._id === 4) {
                liked = true;
                break;
            }
        }
        return liked;

    }

    handleLikeClick(clickEvent) {
        // Stop the event from propagating up the DOM
        // tree, since we handle it here. Also prevents
        // the link click from causing the page to scroll to the top.
        clickEvent.preventDefault();
        // 0 represents the 'main mouse button' --
        // typically a left click
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        if (clickEvent.button === 0) {
            // Callback function for both the like and unlike cases.
            var callbackFunction = (updatedLikeCounter) => {
                // setState will overwrite the 'likeCounter'
                // field on the current state, and will keep
                // the other fields in-tact. This is called a
                // shallow merge:
                // https://facebook.github.io/react/docs/component-api.html#setstate
                this.setState({likeCounter: updatedLikeCounter});
            };
            if (this.didUserLike()) {
                // User clicked 'unlike' button.
                unlikeComment(this.props.feedItemId, this.props.commentIndex, 4, callbackFunction);
            } else {
                // User clicked 'like' button.
                likeComment(this.props.feedItemId, this.props.commentIndex, 4, callbackFunction);
            }
        }
    }
    render() {
        var likeButtonText = "Like";
        if (this.didUserLike()) {
            likeButtonText = "Unlike";
        }

        return ( < div > < div className = "media-left media-top" > PIC < /div> <
            div className = "media-body" >

            <Link to={"/profile / " + this.props.author._id}>
 {
            this.props.author.fullName
        } < /Link>

            {this.props.children} <
            br / > <a href="#" onClick={(e) => this.handleLikeClick(e)}>
            <span className="glyphicon glyphicon-thumbs-up"></span>
            {likeButtonText}
        </a> {this.state.likeCounter.length} likes· < a href = "#" > Reply < /a > · {
            unixTimeToString(this.props.postDate)
        } < /div > < /div >)
    }
}
