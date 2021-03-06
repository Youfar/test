/**
 * Created by cho.oh on 西暦17/07/18.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { deleteTweet } from '../actions/TweetAction'
import classnames from 'classnames'

export default class Tweet extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        tweetId: PropTypes.number.isRequired,
        token: PropTypes.string,
        tweetContent: PropTypes.string.isRequired,
        // deleteTweet: PropTypes.func.isRequired,
        // favoriteTweet: PropTypes.func.isRequired
    }

    render() {
        const { token, dispatch, tweetContent, tweetId, favoriteTweet } = this.props

        // let element
        //     element = (
        //         <div className="view">
        //             <label> {} </label>
        //         </div>
        //     )
        // return (
        //     <li>
        //         {tweetContent} <button onClick={() => deleteTweet(tweetId)}>delete</button>
        //     </li>
        // )

        let element;
        element = (
            <div>
                <label>
                    {tweetContent}
                </label>
                <button onClick={() => dispatch(deleteTweet(token, tweetId))}>delete</button>
            </div>
        )

        return (
            <li>
                {element}
            </li>
        )
    }
}