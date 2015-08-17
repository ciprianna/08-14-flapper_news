// creates the module and names it flapperNews; injects (reliant upon) the ui.router import
angular.module('flapperNews', ['ui.router', 'templates', 'Devise'])
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
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      // sets up posts state
      .state('posts', {
        url: '/posts/{id}', // Single bracket means the id is a param
        templateUrl: 'posts/_posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      })
      // sets up login state
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: [
          '$state',
          'Auth',
          function($state, Auth) {
            Auth.currentUser().then(function(){
              $state.go('home');
            })
          }
        ]
      })
      // sets up registration state
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: [
          '$state',
          'Auth',
          function($state, Auth) {
            Auth.currentUser().then(function(){
              $state.go('home');
            })
          }
        ]
      })
      // what to do for everything else
      $urlRouterProvider.otherwise('home'); // Routes all bad paths to home
  }
]);
