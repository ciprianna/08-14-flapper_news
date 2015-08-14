// creates the module and names it flapperNews; injects (reliant upon) the ui.router import
angular.module('flapperNews', ['ui.router'])
// config used for the 'states', or the route handling using ui.router
.config([
  // import these variables to use in a function
  // stateProvider used to determine specific route actions
  // urlRouterProvider used to handle all else
  '$stateProvider',
  '$urlRouterProvider',
  // function dictating how to handle routes/set states, takes the two params
  function($stateProvider, $urlRouterProvider){
    // Sets up a home state
    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "/home.html",
        controller: 'MainCtrl'
      })
      // sets up posts state
      .state('posts', {
        url: '/posts/{id}', // Single bracket means the id is a param
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });
      // what to do for everything else
      $urlRouterProvider.otherwise('home'); // Routes all bad paths to home
  }
])
// a service that will be injected into the MainCtrl; defines an empty array for posts
.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}])
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
      $scope.posts.push({
        // $scope.title (defined in model - html tag)
        title: $scope.title,
        // $scope.innk (defined in model)
        link: $scope.link,
        // upvotes set to 0
        upvotes: 0,
        // mock data for testing
        comments: [
          {author: 'Cat', body: 'Purrrrific!', upvotes: 0},
          {author: 'Kitten', body: 'Meowzors!', upvotes: 0}
        ]
      });
      // reset input boxes to empty
      $scope.title = '';
      $scope.link = '';
    };
    // $scope function to add one to the upvote count
    $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
    }
  }
])
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
