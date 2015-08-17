angular.module('flapperNews')
// a service that will be injected into the MainCtrl; defines an empty array for posts
.factory('posts', [
  '$http',
  function($http){
  var o = {
    posts: []
  };
  return o;
  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      angular.copy(data, o.posts);
    });
  };
}]);
