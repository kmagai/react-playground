var React = require('react');
var CommentBox = require('./comment.jsx');
React.renderComponent(
  <CommentBox url="./comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
