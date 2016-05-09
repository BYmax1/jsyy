angular.module('starter.services', [])

.factory('Chats', function($http) {
  

  var Info={};


  return {
    all: function() {
      return $http.get("http://192.168.1.104:3000/e");
    },
    login:function(account)
    {
      Info.account=account;
    },
    IsLogin:function()
    {
      return Info.account;
    }
  };
});
