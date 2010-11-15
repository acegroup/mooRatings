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
var mooRatings = new Class({
	Implements : Options,

	options : {
		showSelectBox : false,
		container : null,
		defaultRating : null
	},

    selectBox : null,
    
    container : null,

    initialize : function(selectBox, options) {
		// set the custom options
		this.setOptions(options);
		
		// set the selectbox
        this.selectBox = selectBox;
		
		// hide the selectbox
		if (!this.options.showSelectBox) {
			this.selectBox.setStyle('display', 'none');
		}

        // set the container
		this.setContainer();

        // add stars
        this.selectBox.getElements('option').each(
			this.createStar.bind(this)
		);

        // bind events
        this.container.addEvents({
            mouseover : this.mouseOver.bind(this),
            mouseout : this.mouseOut.bind(this),
            click : this.click.bind(this)
        });
		
		// bind change event for selectbox if shown
		if (this.options.showSelectBox) {
			this.selectBox.addEvent('change', this.change.bind(this));
		}
        
        // set the initial rating
        this.setRating(this.options.defaultRating);
    },
	
	// set the container from options or create default
	setContainer : function() {
		if (document.id(this.options.container)) {
			this.container = document.id(this.options.container);
			return;
		}
		this.createContainer();
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
            title : 'ui-rating-value-' + option.get('html'),
            value : option.get('value')
        }).inject(this.container);
    },
    
    // handle mouseover event
    mouseOver : function(e) {
        e.target.addClass('ui-rating-hover')
            .getAllPrevious()
            .addClass('ui-rating-hover');
    },
    
    // handle mouseout event
    mouseOut : function(e) {
        e.target.removeClass('ui-rating-hover')
            .getAllPrevious()
            .removeClass('ui-rating-hover');
    },
    
    // handle click event   
    click : function(e) {
		var rating = e.target.get('title').replace('ui-rating-value-', '');
        this.setRating(rating);
		this.selectBox.set('value', rating);
    },

	// handle change event
	change : function(e) {
		var rating = e.target.get('value');
        this.setRating(rating);
	},
    
    // set the current rating
    setRating : function(rating) {
        // use selected rating if none supplied
        if (!rating) {
			rating = this.selectBox.get('value');
			// use first rating option if none selected
			if (!rating) {
				rating = this.selectBox.getElement('option[value!=]').get('value');
			}
		}
        
        // get the current selected rating star
        var current = this.container.getElement('a[title=ui-rating-value-' + rating + ']');

        // highlight current and previous stars in yellow
        current.set('class', 'ui-rating-star ui-rating-full')
            .getAllPrevious()
            .set('class', 'ui-rating-star ui-rating-full');

        // remove highlight from higher ratings
        current.getAllNext()
            .set('class', 'ui-rating-star ui-rating-empty');
		
		// synchronize the rate with the selectbox
		this.selectBox.set('value', rating);
    }
});