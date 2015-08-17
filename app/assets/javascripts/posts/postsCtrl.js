angular.module('flapperNews')
// controller used for posts, takes three inputs, scope, stateParams (params
// from the defined states above in the .config block), and posts (from factory)
.controller('PostsCtrl', [
  '$scope',
  'posts',
  'post',
  function($scope, posts, post){
    // Set the scope's single post to the post found from the post state
    $scope.post = post;
    // scope function to add a comment
    $scope.addComment = function(){
      // if empty, don't add the comment
      if($scope.body === '') {return;}
      posts.addComment(post.id, {
        // Assign the comment's body from the scope.body (defined in model)
        body: $scope.body,
        // Assign the author as the user
        author: 'user',
      }).success(function(comment){
        $scope.post.comments.push(comment);
      });
      // Reset the input to empty
      $scope.body = '';
    };
    $scope.incrementUpvotes = function(comment){
      posts.upvoteComment(post, comment);
    };
  }
]);
