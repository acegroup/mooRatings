/*
---
description: MooTools star rating system. Based on ripter/jquery.rating.

license: MIT

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
var mooRatings = new Class({

    selectBox : null,
    
    container : null,

    initialize : function(selectBox) {
        // make the selectbox available through the class
        this.selectBox = selectBox.setStyle('display', 'none');

        // create the container for the rating stars
        this.createContainer();

        // add stars based on selectBox options
        this.selectBox.getElements('option').each(this.createStar.bind(this));

        // bind events to the rating container
        this.container.addEvents({
            mouseover : this.mouseOver.bind(this),
            mouseout : this.mouseOut.bind(this),
            click : this.click.bind(this)
        });
        
        // set the initial rating
        this.setRating(this.selectBox.get('value'));
    },
    
    // create the html container for the rating stars
    createContainer : function() {
        this.container = new Element('div', {
            'class' : 'ui-rating'
        }).inject(this.selectBox, 'after');
    },
    
    // create the html reating stars
    createStar : function(option) {
        new Element('a', {
            'class' : 'ui-rating-star ui-rating-empty',
            title : option.get('html'),
            value : option.get('value')
        }).inject(this.container);
    },
    
    // handle mouseover event
    mouseOver : function(e) {
        var element = e.target;
        element.addClass('ui-rating-hover')
            .getAllPrevious()
            .addClass('ui-rating-hover');
    },
    
    // handle mouseout event
    mouseOut : function(e) {
        var element = e.target;
        element.removeClass('ui-rating-hover')
            .getAllPrevious()
            .removeClass('ui-rating-hover');
    },
    
    // handle click event   
    click : function(e) {
        var element = e.target;
        this.setRating(element.get('title'));
    },
    
    // set the current rating
    setRating : function(rating) {
        // use rating 1 if none supplied
        if (!rating) rating = 1;
        
        // get the current selected rating star
        var current = this.container.getElement('a[title=' + rating + ']');

        // highlight current and previous stars in yellow
        current.set('class', 'ui-rating-star ui-rating-full')
            .getAllPrevious()
            .set('class', 'ui-rating-star ui-rating-full');

        // remove highlight from higher ratings
        current.getAllNext()
            .set('class', 'ui-rating-star ui-rating-empty');

        // copy the rating to the selectbox
        this.selectBox.set('value', rating);
    }
});