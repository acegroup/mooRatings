/*
---
description: MooTools star rating system. Based on ripter/jquery.rating.

license: GPL

copright: 2010 Ace Group (bv) <http://www.acegroup.nl>

authors:
- Guido Gautier

inspiration:
  - ripter/jquery.rating (https://github.com/ripter/jquery.rating) Copyright (c) 2010 Chris Richards

requires:
- core:1.3/Core
- core:1.3/Array
- core:1.3/Function
- core:1.3/Event
- core:1.3/Class
- core:1.3/Class.Extras
- core:1.3/Element
- core:1.3/Element.Style
- core:1.3/Element.Event

provides: 
- mooRatings

...
*/
var mooRatings=new Class({selectBox:null,container:null,initialize:function(a){this.selectBox=a.setStyle("display","none");this.createContainer();this.selectBox.getElements("option").each(this.createStar.bind(this));this.container.addEvents({mouseover:this.mouseOver.bind(this),mouseout:this.mouseOut.bind(this),click:this.click.bind(this)});this.setRating(this.selectBox.get("value"))},createContainer:function(){this.container=new Element("div",{"class":"ui-rating"}).inject(this.selectBox,"after")},createStar:function(a){new Element("a",{"class":"ui-rating-star ui-rating-empty",title:a.get("html"),value:a.get("value")}).inject(this.container)},mouseOver:function(b){var a=b.target;a.addClass("ui-rating-hover").getAllPrevious().addClass("ui-rating-hover")},mouseOut:function(b){var a=b.target;a.removeClass("ui-rating-hover").getAllPrevious().removeClass("ui-rating-hover")},click:function(b){var a=b.target;this.setRating(a.get("title"))},setRating:function(a){if(!a){a=1}var b=this.container.getElement("a[title="+a+"]");b.set("class","ui-rating-star ui-rating-full").getAllPrevious().set("class","ui-rating-star ui-rating-full");b.getAllNext().set("class","ui-rating-star ui-rating-empty");this.selectBox.set("value",a)}});