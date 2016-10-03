define(
    [
        'backbone'
    ],
    function (Backbone, tpl) {
        /**
         * Calendar Model is the model for the calendar grid.
         * It is responsible for:
         *      - tracking which grid cells are occupied by courses
         *      - notifying courses of conflicts
         *      - notify course collection when a course is unselected
         */
        
        var CalendarModel = Backbone.Model.extend({
            defaults: {
                courseCollection: null
            },
            
            schedule: [],
            
            initialize: function (attributes) {
                /**
                 * Create a selection matrix
                 *      one row per hour (7am to 6pm)
                 *      one column per day (Monday to Friday)
                 */
                for (var h = 7; h < 18; h++) {
                    this.schedule.push([]);
                    for (var d = 1; d < 6; d++) {
                        this.schedule[h - 7].push({});
                    }
                }
            },
            
            // update the hour/day matrix with course info
            updateSelections: function (courseModel, selected) {
                var hours = courseModel.get('timeIndex'),
                    days = courseModel.get('dayIndex');
                for (var h = hours[0]; h < hours[1]; h++) {
                    for (var d = 0; d < days.length; d++) {
                        var cell = this.schedule[h - 7][days[d] - 1];
                        
                        if (selected) {
                            if (typeof cell.id !== 'undefined') {
                                // the cell is already occupied, so add a conflict
                                
                                cell.conflicts.push({
                                    id: courseModel.get('id'),
                                    name: h === hours[0] ? courseModel.get('name') : '',
                                    color: courseModel.get('color')
                                });
                                courseModel.set('conflict', true);
                                this.setConflict(cell.id, true);
                            } else {
                                // the cell is empty, so add new course info
                                
                                cell = {
                                    id: courseModel.get('id'),
                                    name: h === hours[0] ? courseModel.get('name') : '',
                                    color: courseModel.get('color'),
                                    conflicts: []
                                };
                                courseModel.set('conflict', false);
                            }
                        } else {
                            if (cell.conflicts.length > 0) {
                                // the cell has conflicts...
                                
                                if (cell.id === courseModel.get('id')) {
                                    // ...and remove the original course
                                    // so replace it with the first conflict's info
                                    
                                    var newInfo = cell.conflicts.pop();
                                    cell.id = newInfo.id;
                                    cell.name = newInfo.name;
                                    cell.color = newInfo.color;
                                    courseModel.set('conflict', false);
                                } else {
                                    // ...and remove one of the conflicts
                                    
                                    cell.conflicts = _.filter(cell.conflicts, function (course) {
                                        return course.id !== courseModel.get('id');
                                    });
                                    courseModel.set('conflict', false);
                                }
                                
                                // if after dealing with conflicts there are no more,
                                // notify the course collection to remove the conflict flag
                                if (cell.conflicts.length === 0) {
                                    this.setConflict(cell.id, false);
                                }
                            } else {
                                // the cell has no conflicts, so empty it of data
                                
                                cell = {};
                                courseModel.set('conflict', false);
                            }
                        }
                        
                        this.schedule[h - 7][days[d] - 1] = cell;
                    }
                }
                
                // notify calendar view to update
                this.trigger('change');
            },
            
            // notify course collection when a course is unselected in the grid
            courseClicked: function (courseId) {
                this.get('courseCollection').courseClicked(courseId);
            },
            
            // notify course colelction to add/remove conflict flag from a course
            setConflict: function (courseId, isConflict) {
                this.get('courseCollection').get(courseId).set('conflict', isConflict);
            }
            
        });
        
        return CalendarModel;
    }
);