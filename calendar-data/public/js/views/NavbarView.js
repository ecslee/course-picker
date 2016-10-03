define(
    [
        'backbone',
        'text!tpl/navbar.html'
    ],
    function (Backbone, tpl) {
        /**
         * Navbar View is inserted at the top of the page.
         * Model: UserModel
         * It is resposible for:
         *      - displaying username
         *      - displaying user's current calendar title
         *      - changing the calendar title
         */
        
        var NavbarView = Backbone.View.extend({
            el: '#navbar',
            
            template: _.template(tpl),
            
            events: {
                'click #title .glyphicon-edit': 'editDetails',
                'click #change-title': 'changeTitle',
                'click #calendar-json': 'calendarJson'
            },
            
            initialize: function (attributes) {
                _.bindAll(this, 'render', 'changeTitle', 'editDetails');
                this.model.bind('change', this.render);
            },
            
            render: function () {
                this.$el.html(this.template({
                    username: this.model.get('username'),
                    title: this.model.get('title')
                }));
                
                var that = this;
                this.$('.navbar-form').keypress(function (evt) {
                    if (evt.which === 13) {
                        that.changeTitle();
                    }
                });
                this.$('.navbar-form').hide();
            },
            
            // notify the user model that the title changed
            changeTitle: function () {
                this.model.set('title', this.$('input').val());
                this.$('.navbar-form').hide();
            },
            
            editDetails: function () {
                this.$('.navbar-form').show();
            },
            
            calendarJson: function () {
                this.model.calendarJson();
            }
            
        });
        
        return NavbarView;
    }
);