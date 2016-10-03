define(
    [
        'backbone',
        'views/CourseSingleView',
        'text!tpl/courses.html'
    ],
    function (Backbone, CourseSingleView, tpl) {
        /**
         * Course Collection View manages the course catalog tabs.
         * Collection: Course Collection
         * It is responsible for:
         *      - adding individual courses to the catalog
         *      - updating the selected tab
         */
        
        var CourseCollectionView = Backbone.View.extend({
            el: '#course-view',
            
            template: _.template($(tpl).filter('#course-tabs').html()),
            
            selectionsTemplate: _.template($(tpl).filter('#course-selections').html()),
            
            // listen for tab-switching
            events: {
                'shown.bs.tab a[data-toggle="tab"]': 'populateSelected'
            },
            
            courseViews: [ ],
            
            initialize: function (attributes, options) {
                var that = this;
                this.collection.each(function (courseModel, i) {
                    that.courseViews.push(new CourseSingleView({
                        model: courseModel
                    }));
                });
                
                _.bindAll(this, 'render', 'populateSelected');
                this.collection.bind('change', this.populateSelected);
            },
            
            remove: function () { },
            
            // add all courses to the All tab
            render: function () {
                this.$el.empty();
                
                this.$el.append(this.template());
                
                var that = this;
                this.courseViews.forEach(function (view, i) {
                    view.render();
                    that.$('.tab-pane#all').append(view.el);
                });
            },
            
            // update the Selected tab with all selected courses
            populateSelected: function () {
                this.$('.tab-pane#selected').empty();
                
                var that = this;
                this.courseViews.forEach(function (view, i) {
                    if (view.model.get('selected')) {
                        that.$('.tab-pane#selected').append(that.selectionsTemplate({
                            id: view.model.get('id'),
                            name: view.model.get('name'),
                            color: view.model.get('color'),
                            conflict: view.model.get('conflict')
                        }));
                    }
                });
            }
            
        });
        
        return CourseCollectionView;
    }
);