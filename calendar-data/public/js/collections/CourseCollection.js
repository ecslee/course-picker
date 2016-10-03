define(
    [
        'backbone',
        'models/CourseModel'
    ],
    function (Backbone, CourseModel) {
        /**
         * Course Collection is a collection of course models.
         * This colelciton is resposible for:
         *      - assigning different colors to selections
         *      - updating selections when the calendar is clicked
         *      - notifying the calendar model when a course is un/selected
         */
        
        var CourseCollection = Backbone.Collection.extend({
            model: CourseModel,
            
            initialize: function (models, options) {
                this.calendarModel = options.calendarModel;
                this.calendarModel.set('courseCollection', this);
                
                this.courseColors = [
                    'aquamarine',
                    'beige',
                    'cornsilk',
                    'honeydew',
                    'lavender',
                    'lavenderblush',
                    'lemonchiffon',
                    'lightcyan',
                    'lightsteelblue',
                    'mistyrose',
                    'papayawhip',
                    'powderblue',
                    'thistle',
                    'gold',
                    'lawngreen',
                    'salmon',
                    'orchid',
                    'darkseagreen'
                ];
            },
            
            // assign different colors to each course as they are selected
            checkoutColor: function () {
                return this.courseColors.pop();
            },
            
            returnColor: function (color) {
                this.courseColors.push(color);
            },
            
            getSelections: function () {
                var selections = [];
                this.each(function (courseModel) {
                    if (courseModel.get('selected')) {
                        selections.push(courseModel.toJSON());
                    }
                });
                
                return selections;
            },
            
            // notify calendar model that a course is un/selected
            updateSelections: function (courseModel, selected) {
                this.calendarModel.updateSelections(courseModel, selected);
            },
            
            // notify a course model when it has been unselected via the calendar
            courseClicked: function (courseId) {
                var courseModel = this.get(courseId);
                courseModel.toggleSelected();
                
                // notify course collection view to update
                this.trigger('change');
            } 
            
        });
        
        return CourseCollection;
    }
);