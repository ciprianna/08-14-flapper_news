angular.module('flapperNews')
// a service that will be injected into the MainCtrl; defines an empty array for posts
.factory('posts', [function(){
  var o = {
    posts: []
  };
  return o;
}]);
