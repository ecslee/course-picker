require.config({
    baseUrl: '.',
    paths: {
        'tpl': '/tpl',
        'text': '/js/text',
        'jquery': '/js/jquery.min',
        'underscore': '/js/underscore-min',
        'backbone': '/js/backbone-min',
        'bootstrap': '/js/bootstrap.min',
        'models': '/js/models',
        'views': '/js/views',
        'collections': '/js/collections'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require(
    [
        'jquery',
        'underscore',
        'backbone',
        'bootstrap'
    ],
    function () {
        console.log('ready to go!');

        require(
            [
                'models/UserModel',
                'views/NavbarView',
                'models/CalendarModel',
                'views/CalendarView',
                'models/CourseModel',
                'views/CourseSingleView',
                'views/CourseCollectionView',
                'collections/CourseCollection'
            ],
            function (UserModel, NavbarView,
                      CalendarModel, CalendarView,
                      CourseModel, CourseSingleView, CourseCollectionView, CourseCollection) {

                /**
                 * Grab catalog contents
                 * If success, set up courses and calendar
                 * If error, alert
                 */
                var catalog = $.ajax({
                    url: '/catalog', //'/bigCatalog',
                    success: fillCatalog,
                    error: catalogError
                });
                
                var calModel, courseCollection;
                
                function fillCatalog(data, status, jqxhr) {
                    // Calendar grid - create a model and attach it to a view
                    calModel = new CalendarModel({});
                    var calView = new CalendarView({model: calModel}).render();
                    
                    // Course catalog sidebar - create a collection and attach it to an overall view
                    courseCollection = new CourseCollection(data.courses, {
                        calendarModel: calModel
                    });
                    var coursesView = new CourseCollectionView({
                        collection: courseCollection
                    }).render();

                    /**
                     * Grab a user's data.
                     * For this app, there is no real backend, so it's just sample data.
                     */
                    $.ajax({
                        url: '/users',
                        success: retrieveUser,
                        error: catalogError
                    });
                }
                
                function retrieveUser(data, status, jqxhr) {
                    // Navbar - create a user model and attach it to a navbar view
                    var user = new UserModel({
                        username: data[0].username,
                        title: data[0].title,
                        courseCollection: courseCollection
                    });
                    var navbarView = new NavbarView({model: user}).render();
                }
                
                function catalogError(jqxhr, status, errorMsg) {
                    alert('Get catalog error: ' + errorMsg);
                }
            }
        );
    }
);