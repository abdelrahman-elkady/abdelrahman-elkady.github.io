---
layout: post
title:  "What is .. this ?"
date:   2015-09-07 11:45:37 pm
categories: programming-concepts oop java
author: 'kady'
cover: 'this.png'
reading-time: 10
disqus: true
---

He asked me about that word again, he was happy learning and advancing in his **Java** programming course .. he told me that
he started to reach OOP and the concepts behind it as he said :

> Ok, I think I am getting to grasp the concepts of OOP now,
> I think I am fully understanding what is a class and why we use classes,
> and how to create instances from these classes .. But I can't get what is the use of **this** keyword actually

That brought me years ago when I was watching an online course and got hit by `this` , days later I was in OOP lecture
where the professor explained the same keyword `this` , I felt that I got more info but I thought that this thing is very complicated
, so thought my colleagues !

As many programmers I don't always remember when did I learn specific topics, but I think I know more about OOP now, and I keep receiving the
same question about `this` again and again from fellow colleagues and fresh guys learning programming, Everytime I got asked this question I answer it, I am answering it but with different way of explanation each time, I feel I am missing something while explaining.

Lately I noticed a problem happening each time I explain `this` to someone, people are getting to learn about objects
and it's design, but rarely someone get the concept of instance creation and how **Java** deals with **references** .

Here I am trying to get into that point of `Object` creation in Java, let's try to explain this using cookies !

{% highlight java %}
class Cookie {

  int radius;
  boolean baked;

  public Cookie(int radius,boolean baked) {
    this.radius = radius;
    this.baked = baked;
  }

  public static void main(String[] args) {
    Cookie c1 = new Cookie(10,false);
    Cookie c2 = new Cookie(5,true);
  }

}
{% endhighlight %}

In the previous example we just created a `Cookie` class and created two instances `c1` , `c2` from it, **Java** just allocated space for those 2 instances in memory and stored a **reference** of that instance location in the variables `c1` and `c2` respectively, that means Java doesn't store whole Objects in variables, it just stores a **reference** of that instance .

Referring to [`toString()`][toString] default implementation it states that the returned value of the method is :

{% highlight java %}getClass().getName() + '@' + Integer.toHexString(hashCode()){% endhighlight %}

We can use `hashCode()` in this example, but in general it could be overridden, so we will use the more generic way to get a unique identifier of instances by using [`System.identityHashCode(Object)`][identityHashCode] :


{% highlight java %}

System.out.println(Integer.toHexString(System.identityHashCode(c1)));
System.out.println(Integer.toHexString(System.identityHashCode(c2)));

{% endhighlight %}

That should print something like this to the console, which means we can check the reference of the Objects

{% highlight console %}    

> 2a139a55
> 15db9742

{% endhighlight %}

Now, Let's have some normal changes to our instances, changing their attributes' values

{% highlight java %}

System.out.println(Integer.toHexString(System.identityHashCode(c1)));
System.out.println(Integer.toHexString(System.identityHashCode(c2)));

> 2a139a55
> 15db9742

c1.radius = 120 ;
c2.baked = false;

System.out.println(Integer.toHexString(System.identityHashCode(c1)));
System.out.println(Integer.toHexString(System.identityHashCode(c2)));

> 2a139a55
> 15db9742


{% endhighlight %}

Ok, Nice changing the values and modifying the instance doesn't change the reference saved in the variable, and that makes sense, it still points to the same location in memory, and when we change some value it gets to that location, modifies the values we want and then return back, the memory location is still the same for later modifications/readings, let's try to change the location that the variable is pointing to, for example let's assign the address stored in c2 to c1

{% highlight java %}

c1 = c2;

System.out.println(Integer.toHexString(System.identityHashCode(c1)));
System.out.println(Integer.toHexString(System.identityHashCode(c2)));

> 15db9742
> 15db9742


{% endhighlight %}

This clearly indicates the references thing, now the two variables are pointing to the same location in memory and they read the same values and if we modify any attribute it will modify the same data

Let's go and try to modify our `Cookie` class implementation a bit, by adding a statement to print `this` hashCode into it's constructor :

{% highlight java %}

public Cookie(int radius,boolean baked) {
  this.radius = radius;
  this.baked = baked;
  System.out.println(Integer.toHexString(System.identityHashCode(this)));
}

{% endhighlight %}

and in our main method let's create new instances again :

{% highlight java %}

c1 = new Cookie(12,false);
c2 = new Cookie(32,true);

> 2a139a55
> 15db9742

System.out.println(Integer.toHexString(System.identityHashCode(c1)));

> 2a139a55

System.out.println(Integer.toHexString(System.identityHashCode(c2)));

> 15db9742

{% endhighlight %}

That's pretty interesting, as you can see `this` is pointing to the same memory location of the instance that is using the constructor right now, we can push it to more interesting stuff, like returning `this` from a method, let's make this last modification on our `Cookie` class

{% highlight java %}

public Cookie getMe(){
  return this;
}

{% endhighlight %}

as you compile this it works !, that's because of `this` is carrying the reference of the instance that calls this method, let's test this in our main method

{% highlight java %}

Cookie thisCookie = c1.getMe();

System.out.println(Integer.toHexString(System.identityHashCode(c1)));
System.out.println(Integer.toHexString(System.identityHashCode(thisCookie)));

> 2a139a55
> 2a139a55

{% endhighlight %}

that's why `this` is pretty useful to get a reference to the calling instance in your class, allowing you to modify and manipulate the instance in runtime based on your class definitions and methods .

[1]:http://www.programcreek.com/2011/11/what-do-java-objects-look-like-in-memory/

[toString]:http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html#toString()

[identityHashCode]:http://docs.oracle.com/javase/7/docs/api/java/lang/System.html#identityHashCode(java.lang.Object)
