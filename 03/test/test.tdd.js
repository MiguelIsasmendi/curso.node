var StudentModule = require(__dirname+'/../../01/modules/Student.js');
var TeacherModule = require(__dirname+'/../../01/modules/Teacher.js');
var CourseModule = require(__dirname+'/../../01/modules/Course.js');

var assert = require('chai').assert;

var course = null;

suite('CourseModule', function(){
  setup(function(){
  });

 assert(CourseModule.Course, 'The Course class is not imported!!!!');


suite('Course', function(){
  setup(function(){
    course = new CourseModule.Course();
  });

  suite('Basic Initialization', function(){



assert(Array.isArray([]), 'empty arrays are arrays'

    test('should return null on initialization', function(){
      assert.equal(null, course.name);
    };
    
	test('should returnnull on initialization', function(){
      assert.equal(0, course.students.len);
    };

    test('should returnnull on initialization', function(){
      assert.equal(0, course.students.len);
    };

    test('should returnnull on initialization', function(){
      assert.equal(null, course.name);
    };
    );


	this.name = newName;
	this.students = [];
	this.minimum_avg_grade = 0;

  });
});