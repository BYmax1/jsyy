
function f2()
{
	this.sex="f";
}

f2.prototype.q="123";

function f1()
{
	this.name="1";
}

f1.prototype=f2.prototype;

var x=new f1();
console.log(x.q);