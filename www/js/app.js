// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app=angular.module('starter', ['ionic', 'starter.controllers',  'starter.services','ngAnimate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider) {
  
$ionicConfigProvider.platform.ios.tabs.style('standard');
$ionicConfigProvider.platform.ios.tabs.position('bottom');
$ionicConfigProvider.platform.android.tabs.style('standard');
$ionicConfigProvider.platform.android.tabs.position('bottom');
$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
$ionicConfigProvider.platform.android.navBar.alignTitle('center');
$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
$ionicConfigProvider.platform.ios.views.transition('ios');
$ionicConfigProvider.platform.android.views.transition('android'); 
$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
    .state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'ClassCtrl'
      }
    }
  })
  //课表的视图
  .state('tab.classTable', {
    url: '/class-table/:classId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/class-table.html',
        controller: 'ClassTableCtrl'
      }
    }
  })
 //教室信息的视图
  .state('tab.classDetail', {
    url: '/dash/:classId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/class-detail.html',
        controller: 'ClassDetailCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});


app.filter('myFilter',function($http)  
{
  return function(input,day,no)
  {  
    var output=[];
    
     for(var i=0;i<input.length;i++)
     {
      $http.post('http://localhost:3000/check',{roomNo:input[i].roomNo,day:day,no:no}).success(function(item)
        { 
          if(!item)
            output.push(input[i]);

        });
     }

     return output;
  }
})

app.filter('shFilter',function($http)  
{
  return function(input)
  {  

    
     for(var i=0;i<input.length;i++)
     {
        console.log(input.length);
        //input[i].status="审核中";
        input[i].createdAt=input[i].createdAt.substr(0,10);
        switch(input[i].status)
        {
          case 0:input[i].status="审核";break;
          case 1:input[i].status="成功";break;
          case -1:input[i].status="失败";
        }
     }

     return input;
  }
})

app.filter('dateFilter',function()  
{
  return function(input,day,no)
  {  
     if(!day)
     {
      return input;
     }
     
     var temp=day+no+',';
     

     var output=[];
     for(var i=0;i<input.length;i++)
     {   
         var time=input[i].busyTime;
         if(no.length==7)
         {  
            if(time.indexOf(day+"1-2-3"+',')!=-1||time.indexOf(day+"1-2"+',')!=-1||
              time.indexOf(day+"3-4"+',')!=-1)
                continue;
         }
         if(no.length==5)
         {  
            if(no=="1-2-3")
            {
               if(time.indexOf(day+'1-2'+',')!=-1||time.indexOf(day+'3-4'+',')!=-1
                ||time.indexOf(day+'1-2-3-4'+',')!=-1)
                 continue;    
            }
            if(no=="5-6-7")
            {
               if(time.indexOf(day+'5-6'+',')!=-1)
                 continue;    
            }
            if(no=="8-9-A")
            {
               if(time.indexOf(day+'8-9'+',')!=-1)
                 continue;    
            }            
       
         } 
         if(no.length==3)
         {
           if(no=="1-2")
           {  
              if(time.indexOf(day+"1-2-3"+',')!=-1||time.indexOf(day+'1-2-3-4'+',')!=-1)
                continue;
           }

           if(no=="3-4")
           {  
              if(time.indexOf(day+"1-2-3"+',')!=-1||time.indexOf(day+'1-2-3-4'+',')!=-1)
                continue;
           }
           if(no=="5-6")
           {  
              if(time.indexOf(day+"5-6-7"+',')!=-1)
                continue;
           }
           if(no=="8-9")
           {  
              console.log("fuck ");
              if(time.indexOf(day+"8-9-A"+',')!=-1)
                continue;
           }                                        
         } 
        if(input[i].busyTime.indexOf(temp)==-1)
           output.push(input[i]);

     }
     return output;
  }
})

app.filter('statusFilter',function($http)  
{
  return function(input)
  {  
     if(input)
        input="管理员";
     else
        input="我";
    
   
     return input;
  }
})