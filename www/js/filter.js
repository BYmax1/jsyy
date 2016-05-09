angular.module('starter.filter', [])

.filter('myFilter',function()  
{
  return function(input,day,order)
  {
     var time=day+order;
     var output=[];
     for(var i=0;i<input.length;i++)
     { 
         var n=input[i].freeTime.indexOf(time);
     //    console.log(n);
     //    console.log(input[i].freeTime.charAt(n+time.length));
       if(n!=-1)//如果能找到
       {
         if(input[i].freeTime.charAt(n+time.length)==',')
         //这样做是为了防止1-2与1-2-3是一样的结果
              output.push(input[i]);
       }
     }
     return output;
  }
})