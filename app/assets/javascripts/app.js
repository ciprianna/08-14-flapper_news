// creates the module and names it flapperNews; injects (reliant upon) the ui.router import
angular.module('flapperNews', ['ui.router', 'templates'])
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
        templateUrl: "home/_home.html",
        controller: 'MainCtrl'
      })
      // sets up posts state
      .state('posts', {
        url: '/posts/{id}', // Single bracket means the id is a param
        templateUrl: 'posts/_posts.html',
        controller: 'PostsCtrl'
      });
      // what to do for everything else
      $urlRouterProvider.otherwise('home'); // Routes all bad paths to home
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
