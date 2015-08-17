angular.module('flapperNews')
// a service that will be injected into the MainCtrl; defines an empty array for posts
.factory('posts', [
  '$http',
  function($http){
  var o = {
    posts: []
  }

  o.getAll = function() {
    return $http.get('/posts.json').success(function(data){
      angular.copy(data, o.posts);
    });
  }
  o.create = function(post) {
    return $http.post('/posts.json', post).success(function(data){
      o.posts.push(data);
    })
  }
  return o;
}]);
