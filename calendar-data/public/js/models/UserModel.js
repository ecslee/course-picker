define(
    [
        'backbone'
    ],
    function (Backbone) {
        /**
         * User Model contains user details.
         * These deatils will be popuplated in the Navbar View.
         */
        
        var UserModel = Backbone.Model.extend({
            defaults: {
                username: 'John Doe',
                title: 'Course selections',
                courseCollection: null
            },
            
            initialize: function (attributes) {
                
            },
            
            calendarJson: function () {
                if (this.get('courseCollection')) {
                    console.log(JSON.stringify(this.get('courseCollection').getSelections()));
                }
            }
            
        });
        
        return UserModel;
    }
);