angular.module('flapperNews')
// controller used for posts, takes three inputs, scope, stateParams (params
// from the defined states above in the .config block), and posts (from factory)
.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){
    // Set the scope's single post to the id from params
    $scope.post = posts.posts[$stateParams.id];
    // scope function to add a comment
    $scope.addComment = function(){
      // if empty, don't add the comment
      if($scope.body === '') {return;}
      // push the comment to the identified post's comments
      $scope.post.comments.push({
        // Assign the comment's body from the scope.body (defined in model)
        body: $scope.body,
        // Assign the author as the user
        author: 'user',
        upvotes: 0
      });
      // Reset the input to empty
      $scope.body = '';
    }
  }
]);
