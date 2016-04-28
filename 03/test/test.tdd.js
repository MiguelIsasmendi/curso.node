var StudentModule = require(__dirname+'/../../01/modules/Student.js');
var TeacherModule = require(__dirname+'/../../01/modules/Teacher.js');
var CourseModule = require(__dirname+'/../../01/modules/Course.js');

var assert = require('chai').assert;



suite('CourseModule', function(){
	test('Course class', function(){
		assert(CourseModule.Course, 'The Course class is not imported!!!!');
	});

	suite('Course function existence', function(){
		var Course = null;
		setup(function(){
			Course = CourseModule.Course;
		});

		test('checking expected functions existence', function(){
			assert.notEqual(null, Course.prototype.setTeacher,'#setTeacher has to exists in the definition of the Teacher class');
			assert.notEqual(null, Course.prototype.addStudent,'#addStudent has to exists in the definition of the Teacher class');
			assert.notEqual(null, Course.prototype.removeStudent,'#removeStudent has to exists in the definition of the Teacher class');
		});
		
	});


	suite('Course empty initialization', function(){
		var course = null;

		setup(function(){
			course = new CourseModule.Course();
		});

		test('variables status', function(){
			assert.equal(null, course.name,'property name should return null on initialization!!!');
			assert.notEqual(null, course.students,'property students should not return null on initialization!!!');

			assert.equal([], course.students.length,'property students should return an empty Array on initialization!!!');
			
			assert.equal(0, course.minimum_avg_grade,'property minimum_avg_grade should return an empty Array on initialization!!!');
		});
		
	});

});
