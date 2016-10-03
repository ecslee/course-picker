define(
    [
        'backbone'
    ],
    function (Backbone) {
        /**
         * Course Model is a model of a course.
         * It is responsible for: 
         *      - tracking whether this is a selected/unselected course
         *      - managing details
         *      - getting colors for the view
         */
        
        var CourseModel = Backbone.Model.extend({
            defaults: {
                // from catalog
                id: 0,
                name: 'Name',
                author: 'Professor',
                time: ['7am', '4pm'],
                days: ['Monday', 'Friday'],
                dayIndex: [1, 5],
                timeIndex: [7, 16],
                
                // internal
                color: '',
                selected: false,
                conflict: false
            },
            
            initialize: function (attributes) {
                
            },
            
            toggleSelected: function () {
                var selected = !this.get('selected');
                if (selected) {
                    this.checkoutColor();
                } else {
                    this.returnColor();
                }
                
                // this will trigger change event for the view
                this.set('selected', selected);
                this.collection.updateSelections(this, selected);
            },
            
            // get a color when the course is selected
            checkoutColor: function () {
                this.set('color', this.collection.checkoutColor());
                return this.get('color');
            },
            
            // ditch the color when the course is unselected
            returnColor: function (color) {
                this.collection.returnColor(this.get('color'));
                this.set('color', '');
            }
            
        });
        
        return CourseModel;
    }
);