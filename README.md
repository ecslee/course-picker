# Course Picker app

This project uses a Node/Express skeleton and Backbone to manage models and views.

## Deployment

From the project root directory:

0. Navigate to calendar-data: `cd calendar-data`
1. Install dependencies: `npm install`
2. Run project:
    * production mode: `grunt prod`
    * dev mode: `grunt` (with livereload for editing files)
3. Open project in a browser: `localhost:3000`

## Details

When the project loads, you will see three components:

1. _Navbar_ : header with user details, including an editable schedule title
2. _Course catalog_ : listing of available courses, with name, professor, and schedule details
    * _All_ : listing of all available course
    * _Selected_ : simpler listing of just selected course titles
3. _Calendar_ : grid displaying days Monday - Friday, with hours between 7am and 6pm

### Navbar

Clicking the edit icon will reveal a form to change the schedule's title.

### Course catalog

Clicking a course in the catalog will assign it a color and display it in the calendar grid.  This course will also now be visible under the _Selected_ tab.

Clicking a selected course in the _All_ tab will remove the course from the calendar.  It will also remove it from the selected list.  When viewing the _Selected_ tab however, courses cannot be removed by clicking them in the list.

Courses that have a conflict will display an alert icon in the top-right corner.

### Calendar grid

When courses are added to the calendar, they will be inserted in the grid with the same color that they were assigned in the course catalog.

Clicking a course in the calendar will remove it from the grid and set it to unselected in the catalog.

Courses that have a conflict will be displayed with a border corresponding to the color of the conflicting class.

_Calendar favicon from [Google images](http://www.gocfs.net/image/calendarIcon.png)_
