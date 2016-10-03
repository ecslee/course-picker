define(
    [
        'backbone',
        'text!tpl/courses.html'
    ],
    function (Backbone, tpl) {
        /**
         * Course Single View is one course listing in the catalog.
         * Model: Course Model
         * It is resposible for notifying its model if it is clicked.
         */
        
        var CourseSingleView = Backbone.View.extend({
            template: _.template($(tpl).filter('#course-listing').html()),
            
            events: {
                'click': 'toggleCourse'
            },
            
            initialize: function (attributes, options) {
                _.bindAll(this, 'render', 'toggleCourse');
                this.model.bind('change', this.render);
            },
            
            render: function () {
                this.$el.html(this.template({
                    id: this.model.get('id'),
                    name: this.model.get('name'),
                    author: this.model.get('author'),
                    days: this.model.get('days').join(', '),
                    time: this.model.get('time').join(' - '),
                    color: this.model.get('color'),
                    isSelected: this.model.get('selected'),
                    conflict: this.model.get('conflict')
                }));
            },
            
            remove: function () { },
            
            // notify the model that this was clicked
            toggleCourse: function (evt) {
                this.model.toggleSelected();
            }
            
        });
        
        return CourseSingleView;
    }
);