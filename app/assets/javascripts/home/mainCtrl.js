angular.module('flapperNews')
// Controller (should generally be slim), called MainCtrl; relies on two params
// $scope (where the model is) and posts (from the factory/service)
.controller('MainCtrl', [
  '$scope',
  'posts',
  // using the passed attributes, function determines what the scope should do
  function($scope, posts){
    // Sets a scope var called posts to the return of posts.posts (the array)
    $scope.posts = posts.posts;
    // Creates a scope function called addPost
    $scope.addPost = function(){
      // If title is nil or empty, don't do anything
      if(!$scope.title || $scope.title === '') {return;}
      // push to the $scope.posts Array
      posts.create({
        // $scope.title (defined in model - html tag)
        title: $scope.title,
        // $scope.innk (defined in model)
        link: $scope.link
      });
      // reset input boxes to empty
      $scope.title = '';
      $scope.link = '';
    };
    // $scope function to add one to the upvote count
    $scope.incrementUpvotes = function(post){
      posts.upvote(post);
    }
  }
]);
