define(
    [
        'backbone',
        'text!tpl/calendar.html'
    ],
    function (Backbone, tpl) {
        /**
         * Calendar View
         * Model: Calendar Model
         * It is responsible for:
         *      - drawing a grid
         *      - filling in cells with color and course titles
         *      - notifying the model when a cell is clicked
         */
        
        var CalendarView = Backbone.View.extend({
            el: '#cal-view',
            
            events: {
                'click .course-calendar': 'alertCourseClicked'
            },
            
            headerTemplate: _.template($(tpl).filter('#day-header').html()),
            
            hourTemplate: _.template($(tpl).filter('#hour-row').html()),
            
            initialize: function (attributes, options) {
                _.bindAll(this, 'render', 'alertCourseClicked');
                this.model.bind('change', this.render);
            },
            
            render: function () {
                this.$el.empty();
                this.$el.append(this.headerTemplate());
                
                var schedule = this.model.schedule;
                for (var h = 7; h < 18; h++) {
                    this.$el.append(this.hourTemplate({
                        hourStart: h + ':00',
                        schedule: schedule[h - 7]
                    }));
                }
            },
            
            remove: function () { },
            
            // notify the model that a filled cell was clicked
            alertCourseClicked: function (evt) {
                this.model.courseClicked($(evt.target).data('courseid'));
            }
            
        });
        
        return CalendarView;
    }
);