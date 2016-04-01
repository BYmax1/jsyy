angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var chats;
  Chats.all().success(function(data)
  {
    $scope.chats = data;
  })
  $scope.remove = function(chat) {
     $scope.chats.splice($scope.chats.indexOf(chat), 1);
  };
  

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  Chats.all().success(function(data)
  {
    $scope.chats = data;
     var get=function(chatId) {
      for (var i = 0; i < $scope.chats.length; i++) {
        if ($scope.chats[i].id === parseInt(chatId)) {
          return $scope.chats[i];
        }
      }
      return null;
    }
    $scope.chat = get($stateParams.chatId);
  })
})

//登录还需要修改
.controller('LoginCtrl', function($scope,$location,$http,$ionicPopup) {

  
  $scope.submit=function()
  {

    console.log($scope.account);
    console.log($scope.password); 
     $http({

        method  : 'POST',
        url     : 'http://localhost:3000/login',
        data    : {a:"123",b:"234"},
        params  :{account:$scope.account,password:$scope.password},
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
    })
     .success(function(data) {
            console.log(data);
            if(data=='success')
               $location.url('/tab/dash');
            else
            {
              $location.url('/');
      var alertPopup = $ionicPopup.alert({
       title: '抱歉',
       template: '<p style="color:red">密码错误</p>'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });             

            }
      });
  };
})

.controller('ClassDetailCtrl', function($scope) {

   $scope.flag=false;
   $scope.show=function()
   {
      $scope.flag=!$scope.flag;
   }
})

/*.controller('ClassListCtrl', function($scope,$location) {
  $location.url('/tab/dash/class-list');
    $scope.fun=function()
  {
    $location.url('/tab/dash/class-table');
  }
})

.controller('ClassTableCtrl', function($scope,$location) {
  $scope.fun=function()
  {
    $location.url('/tab/dash/class-list');
  }
  
})
*/


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


