var PersonModule = require(__dirname+'/../../01/modules/Person.js');
var StudentModule = require(__dirname+'/../../01/modules/Student.js');
var TeacherModule = require(__dirname+'/../../01/modules/Teacher.js');
var CourseModule = require(__dirname+'/../../01/modules/Course.js');

var assert = require('chai').assert;

suite('PersonModule', function(){
	test('exported objects', function(){
		assert(PersonModule.Person, 'The Person class is not exported!!!!');
	});
	
	suite('Person function existence', function(){
		var Person = null;
		setup(function(){
			Person = PersonModule.Person;
		});

		test('checking expected own domain functions existence', function(){
			assert.notEqual(null, Person.prototype.getName,'#getName has to exists in the definition of the Person class');
			assert.notEqual(null, Person.prototype.getAge,'#getAge has to exists in the definition of the Person class');
			assert.notEqual(null, Person.prototype.addCourse,'#addCourse has to exists in the definition of the Person class');
			assert.notEqual(null, Person.prototype.removeCourse,'#removeCourse has to exists in the definition of the Person class');
		});

		test('checking expected events functions existence', function(){
			assert.notEqual(null, Person.prototype.on,'#on has to exists in the definition of the Person class');
			assert.notEqual(null, Person.prototype.emit,'#emit has to exists in the definition of the Person class');
		});
	});

	suite('Person empty initialization', function(){
		var person = null;

		setup(function(){
			person = new PersonModule.Person();
		});

		test('own variables status', function(){
			assert.equal(null, person.name,'property name should return null on initialization!!!');
			assert.equal(null, person.address,'property address should return null on initialization!!!');
			assert.equal(null, person.birth_date,'property birth_date should return null on initialization!!!');
			
			assert.notEqual(null, person.friends,'property friends should not return null on initialization!!!');
			assert.equal([], person.friends.length,'property friends should return an empty Array on initialization!!!');

			assert.notEqual(null, person.courses,'property courses should not return null on initialization!!!');
			assert.equal([], person.courses.length,'property courses should return an empty Array on initialization!!!');
			
		});
		
	});

	suite('Person name initialization', function(){
		var person = null;

		setup(function(){
			person = new PersonModule.Person('pepe');
		});

		test('own variables status', function(){
			assert.equal('pepe', person.name,'property name should return null on initialization!!!');
			assert.equal(null, person.address,'property address should return null on initialization!!!');
			assert.equal(null, person.birth_date,'property birth_date should return null on initialization!!!');
			
			assert.notEqual(null, person.friends,'property friends should not return null on initialization!!!');
			assert.equal([], person.friends.length,'property friends should return an empty Array on initialization!!!');

			assert.notEqual(null, person.courses,'property courses should not return null on initialization!!!');
			assert.equal([], person.courses.length,'property courses should return an empty Array on initialization!!!');
		});
		
	});

	suite('Person name and address initialization', function(){
		var person = null;

		setup(function(){
			person = new PersonModule.Person('pepe','address');
		});

		test('own variables status', function(){
			assert.equal('pepe', person.name,'property name should return the value received has parameter on initialization!!!');
			assert.equal('address', person.address,'property address should return the value received has parameter on initialization!!!');
			assert.equal(null, person.birth_date,'property birth_date should return null on initialization!!!');
			
			assert.notEqual(null, person.friends,'property friends should not return null on initialization!!!');
			assert.equal([], person.friends.length,'property friends should return an empty Array on initialization!!!');

			assert.notEqual(null, person.courses,'property courses should not return null on initialization!!!');
			assert.equal([], person.courses.length,'property courses should return an empty Array on initialization!!!');	
		});
		
	});

		suite('Person name, address and day of birth initialization', function(){
		var person = null;
		var dayOfBirth = new Date();

		setup(function(){
			person = new PersonModule.Person('pepe','address', dayOfBirth);
		});

		test('own variables status', function(){
			assert.equal('pepe', person.name,'property name should return the value received has parameter on initialization!!!');
			assert.equal('address', person.address,'property address should return the value received has parameter on initialization!!!');
			assert.equal(dayOfBirth, person.birth_date,'property birth_date should return the value received has parameter on initialization!!!');
			
			assert.notEqual(null, person.friends,'property friends should not return null on initialization!!!');
			assert.equal([], person.friends.length,'property friends should return an empty Array on initialization!!!');

			assert.notEqual(null, person.courses,'property courses should not return null on initialization!!!');
			assert.equal([], person.courses.length,'property courses should return an empty Array on initialization!!!');	
		});
		
	});
});

suite('StudentModule', function(){
	test('exported objects', function(){
		assert(StudentModule.Student, 'The Student class is not exported!!!!');
	});

	suite('Student function existence', function(){
		var Student = null;
		setup(function(){
			Student = StudentModule.Student;
		});

		test('checking expected own domain functions existence', function(){
			assert.notEqual(null, Student.prototype.enrollToCourse,'#enrollToCourse has to exists in the definition of the Student class');
			assert.notEqual(null, Student.prototype.leaveCourse,'#leaveCourse has to exists in the definition of the Student class');
			assert.notEqual(null, Student.prototype.setCourseGrade,'#setCourseGrade has to exists in the definition of the Student class');
		});

		test('checking expected inherited domain functions existence', function(){
			assert.notEqual(null, Student.prototype.getName,'#getName has to exists in the definition of the Student class');
			assert.notEqual(null, Student.prototype.getAge,'#getAge has to exists in the definition of the Student class');
			assert.notEqual(null, Student.prototype.addCourse,'#addCourse has to exists in the definition of the Student class');
			assert.notEqual(null, Student.prototype.removeCourse,'#removeCourse has to exists in the definition of the Student class');
		});

		test('checking expected events functions existence', function(){
			assert.notEqual(null, Student.prototype.on,'#on has to exists in the definition of the Student class');
			assert.notEqual(null, Student.prototype.emit,'#emit has to exists in the definition of the Student class');
		});
	});

	suite('Student empty initialization', function(){
		var student = null;

		setup(function(){
			student = new StudentModule.Student();
		});

		test('own variables status', function(){
			assert.notEqual(null, student.id,'property id should not return null on initialization!!!');
			assert.equal(0, student.avg_grade,'property avg_grade should return null on initialization!!!');
			assert.notEqual(null, student.current_grades,'property current_grades should return null on initialization!!!');						
		});
		
	});
});

suite('TeacherModule', function(){
	test('exported objects', function(){
		assert(TeacherModule.Teacher, 'The Teacher class is not exported!!!!');
	});

	suite('Teacher function existence', function(){
		var Teacher = null;
		setup(function(){
			Teacher = TeacherModule.Teacher;
		});

		test('checking expected own domain functions existence', function(){
			assert.notEqual(null, Teacher.prototype.teachCourse,'#teachCourse has to exists in the definition of the Teacher class');
			assert.notEqual(null, Teacher.prototype.stopTeachingCourse,'#stopTeachingCourse has to exists in the definition of the Teacher class');
			assert.notEqual(null, Teacher.prototype.gradeStudent,'#gradeStudent has to exists in the definition of the Teacher class');
		});

		test('checking expected inherited domain functions existence', function(){
			assert.notEqual(null, Teacher.prototype.getName,'#getName has to exists in the definition of the Teacher class');
			assert.notEqual(null, Teacher.prototype.getAge,'#getAge has to exists in the definition of the Teacher class');
			assert.notEqual(null, Teacher.prototype.addCourse,'#addCourse has to exists in the definition of the Teacher class');
			assert.notEqual(null, Teacher.prototype.removeCourse,'#removeCourse has to exists in the definition of the Teacher class');
		});

		test('checking expected events functions existence', function(){
			assert.notEqual(null, Teacher.prototype.on,'#on has to exists in the definition of the Teacher class');
			assert.notEqual(null, Teacher.prototype.emit,'#emit has to exists in the definition of the Teacher class');
		});
	});

	suite('Teacher empty initialization', function(){
		var teacher = null;

		setup(function(){
			teacher = new TeacherModule.Teacher();
		});
	});
});

suite('CourseModule', function(){
	test('exported objects', function(){
		assert(CourseModule.Course, 'The Course class is not exported!!!!');
	});

	suite('Course function existence', function(){
		var Course = null;
		setup(function(){
			Course = CourseModule.Course;
		});

		test('checking expected domain functions existence', function(){
			assert.notEqual(null, Course.prototype.setTeacher,'#setTeacher has to exists in the definition of the Course class');
			assert.notEqual(null, Course.prototype.addStudent,'#addStudent has to exists in the definition of the Course class');
			assert.notEqual(null, Course.prototype.removeStudent,'#removeStudent has to exists in the definition of the Course class');
		});
		
		test('checking expected events functions existence', function(){
			assert.notEqual(null, Course.prototype.on,'#on has to exists in the definition of the Course class');
			assert.notEqual(null, Course.prototype.emit,'#emit has to exists in the definition of the Course class');
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

	suite('Course name initialization', function(){
		var course = null;

		setup(function(){
			course = new CourseModule.Course('Pepe');
		});

		test('variables status', function(){
			assert.equal('Pepe', course.name,'property name should return the value assigned on initialization!!!');
			assert.notEqual(null, course.students,'property students should not return null on initialization!!!');
			assert.equal([], course.students.length,'property students should return an empty Array on initialization!!!');
			assert.equal(0, course.minimum_avg_grade,'property minimum_avg_grade should return an empty Array on initialization!!!');
		});
		
	});

	suite('Course with name and Teacher initialization', function(){
		var course = null;
		var teacher = new TeacherModule.Teacher();

		setup(function(){
			course = new CourseModule.Course('Pepe', teacher);
		});

		test('variables status', function(){
			assert.equal('Pepe', course.name,'property name should return the value assigned on initialization!!!');
			assert.equal(teacher, course.teacher,'property teacher should return the value passed by parameter to the constructor!!!');
		});
	});
});
