angular.module('starter.controllers', [])

.controller('ClassTableCtrl', function($scope,$stateParams,$http) {
   $scope.item={};
   $http
  ({
        method  : 'POST',
        url     : 'http://192.168.1.104:3000/table',
        params  :{classId:$stateParams.classId},
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }     
  }).success(function(data)
    {   
         for(var i=0;i<data.length; i++)
         {
           $scope.item[data[i].day+data[i].no]=data[i].courseName+","+data[i].teacherName;
         }
    })
   



})

.controller('ClassDetailCtrl', function($scope,$location,$http,$ionicPopup, Chats,$stateParams, $ionicLoading) {

   $scope.flag=false;

   $scope.show=function()
   {
      $scope.flag=!$scope.flag;


   }

     $http.get('http://192.168.1.104:3000?flag=1').success(function(classes)
   {
      $scope['classes']=classes;
      for(var i=0;i<$scope['classes'].length;i++)
      {
        if($stateParams.classId==$scope['classes'][i]['roomId'])
        {
          $scope.item=$scope['classes'][i];
          $scope.item.img="http://192.168.1.104:3000/files/"+$scope['classes'][i].roomId+".jpg";
          break;
        }  
      }
   });
  
   


  $scope.reserve=function()
  {
    
    if(!Chats.IsLogin())
    {  
            var myPopup = $ionicPopup.show({
               template: '请登录您的用户',
               title: '错误',
               buttons: [
                 { text: '取消' },
                 {
                   text: '确定',
                   type: 'button-positive',
                   onTap: function() {
                        console.log("123");
                        $location.url('/');
                     }
                   
                 },
               ]
             });
       

    }
    else
    {  
         var course=document.getElementById("course").value;
         var number=document.getElementById("number").value;
         var teacher=document.getElementById("teacher").value;
         var day=document.getElementById("day").value;
         var no=document.getElementById("no").value;
        

        $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
        });
        //console.log($scope.studentNumber);
        $http({
        method  : 'POST',
        url     : 'http://192.168.1.104:3000/reserve',
        params  :{courseName:course,studentNumber:number,
                  teacherName:teacher,day:day,no:no,classId:$stateParams.classId,
                  roomNo:$scope.item.roomId,teacherId:Chats.IsLogin()},
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }     
    

    }).success(function(data)
    {    
        if(data=="success")
        {    
             $ionicLoading.hide();
             var alertPopup = $ionicPopup.alert({
               template: '<p style="color:red">已提交，请等待管理员审核</p>'
             });
             alertPopup.then(function(res) {
                 
             });
        }
    })


    }

  }

   
   //console.log($('left').width());

})


.controller('ChatsCtrl', function($scope,$http,Chats) {

  var teacherId=Chats.IsLogin();
   $scope.$on('$ionicView.enter', function(e) {
      teacherId=Chats.IsLogin();
      $http.post("http://192.168.1.104:3000/status?teacherId="+teacherId,{teacherId:teacherId}).success(function(items)
     {
       $scope.items=items;

     }) 
  });


  $scope.doRefresh = function() {
    $http.post("http://192.168.1.104:3000/status?teacherId="+teacherId,{teacherId:teacherId}).success(function(items)
    {
       $scope.items=items;

    }).finally(function() {
                  $scope.$broadcast('scroll.refreshComplete');
              });
      };
})

//消息控制
.controller('ChatDetailCtrl', function($scope, $stateParams,$ionicPopup,$http,$location,Chats) {
     
    
  var teacherId=Chats.IsLogin();
   $scope.$on('$ionicView.enter', function(e) {
      teacherId=Chats.IsLogin();
      $http.get("http://192.168.1.104:3000/message?teacherId="+teacherId).success
     (function(items)
     {
       $scope.items=items;
     });
  });



    //true代表管理员，false代表老师
    //$scope.items=[{status:true,content:"日你哥哥啊"},{status:false,content:"cnm"}];
   

   $scope.send=function()
   { 
     var message=document.getElementById("message").value;
     document.getElementById("message").value="";
     if(!message)
     {
        var alertPopup = $ionicPopup.alert({
               template: '<p style="color:red">消息不允许为空</p>'
             });
             alertPopup.then(function(res) {
                 
             });
        return;     
     }
     if(!teacherId)
     {
          var myPopup = $ionicPopup.show({
               template: '请登录您的用户',
               title: '错误',
               buttons: [
                 { text: '取消' },
                 {
                   text: '确定',
                   type: 'button-positive',
                   onTap: function() {
                        console.log("123");
                        $location.url('/');
                     }
                   
                 },
               ]
             });
        return;          
     }

     $http.post("http://192.168.1.104:3000/message?teacherId="+teacherId+"&&content="+message
      +"&&status=0");

     $scope.items.push({status:false,content:message});
   }

})

//登录还需要修改
.controller('LoginCtrl', function($scope,$location,$http,$ionicPopup, Chats, $ionicLoading) {

   


  $scope.submit=function()
  {

    if(!$scope.account||!$scope.password)
    {
            var alertPopup = $ionicPopup.alert({
               title: '错误',
               template: '<p style="color:red">请输入用户名或密码</p>'
             });


             alertPopup.then(function(res) {
               
             });
             return;             
    }



    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
     $http({
        method  : 'POST',
        url     : 'http://192.168.1.104:3000/login',
        params  :{account:$scope.account,password:$scope.password},
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
    })
     .success(function(data) {
            console.log(data);
            $ionicLoading.hide();
            if(data=='success')
            {
              Chats.login($scope.account);
              $location.url('/tab/dash');
            }
               
            else
            {
              $location.url('/');
              var alertPopup = $ionicPopup.alert({
               title: '抱歉',
               template: '<p style="color:red">密码错误或者用户不存在</p>'
             });


             alertPopup.then(function(res) {
               console.log('Thank you for not eating my delicious ice cream cone');
             });             

            }
      });
  };
})



.controller('ClassCtrl', function($scope,Chats,$http,$ionicLoading) {
   
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
    });
   

   $http.get('http://192.168.1.104:3000?flag=1').success(function(classes)
   {
      $scope['classes']=classes;
      for(var i=0;i<$scope['classes'].length;i++)
      { 
 
        $scope['classes'][i].img="http://192.168.1.104:3000/files/"+$scope['classes'][i].roomId+".jpg";
     
        $ionicLoading.hide();
        
      }
   });
})





.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});


