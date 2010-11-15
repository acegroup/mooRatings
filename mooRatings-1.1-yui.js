/*
---
description: MooTools star rating system. Based on ripter/jquery.rating.

version: 1.1

license: GPL

copright: 2010 Ace Group (bv) <http://www.acegroup.nl>

authors:
- Guido Gautier

inspiration:
  - ripter/jquery.rating (https://github.com/ripter/jquery.rating) Copyright (c) 2010 Chris Richards

requires:
- core:1.2.4/Core
- core:1.2.4/Array
- core:1.2.4/Function
- core:1.2.4/Event
- core:1.2.4/Class
- core:1.2.4/Class.Extras
- core:1.2.4/Element
- core:1.2.4/Element.Style
- core:1.2.4/Element.Event

provides: 
- mooRatings

...
*/
var mooRatings=new Class({Implements:Options,options:{showSelectBox:false,container:null,defaultRating:null},selectBox:null,container:null,initialize:function(b,a){this.setOptions(a);this.selectBox=b;if(!this.options.showSelectBox){this.selectBox.setStyle("display","none")}this.setContainer();this.selectBox.getElements("option").each(this.createStar.bind(this));this.container.addEvents({mouseover:this.mouseOver.bind(this),mouseout:this.mouseOut.bind(this),click:this.click.bind(this)});if(this.options.showSelectBox){this.selectBox.addEvent("change",this.change.bind(this))}this.setRating(this.options.defaultRating)},setContainer:function(){if(document.id(this.options.container)){this.container=document.id(this.options.container);return}this.createContainer()},createContainer:function(){this.container=new Element("div",{"class":"ui-rating"}).inject(this.selectBox,"after")},createStar:function(a){new Element("a",{"class":"ui-rating-star ui-rating-empty",title:"ui-rating-value-"+a.get("html"),value:a.get("value")}).inject(this.container)},mouseOver:function(a){a.target.addClass("ui-rating-hover").getAllPrevious().addClass("ui-rating-hover")},mouseOut:function(a){a.target.removeClass("ui-rating-hover").getAllPrevious().removeClass("ui-rating-hover")},click:function(b){var a=b.target.get("title").replace("ui-rating-value-","");this.setRating(a);this.selectBox.set("value",a)},change:function(b){var a=b.target.get("value");this.setRating(a)},setRating:function(a){if(!a){a=this.selectBox.get("value");if(!a){a=this.selectBox.getElement("option[value!=]").get("value")}}var b=this.container.getElement("a[title=ui-rating-value-"+a+"]");b.set("class","ui-rating-star ui-rating-full").getAllPrevious().set("class","ui-rating-star ui-rating-full");b.getAllNext().set("class","ui-rating-star ui-rating-empty");this.selectBox.set("value",a)}});