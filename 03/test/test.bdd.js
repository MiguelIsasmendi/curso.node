var PersonModule = require(__dirname+'/../../01/modules/Person.js');
var StudentModule = require(__dirname+'/../../01/modules/Student.js');
var TeacherModule = require(__dirname+'/../../01/modules/Teacher.js');
var CourseModule = require(__dirname+'/../../01/modules/Course.js');

var expect = require('chai').expect;

describe('Person', function() {
	var person = new PersonModule.Person();
	describe('#getAge()', function() {
		it('should return null when the birth_date is not present', function() {
		 expect(person.getAge()).to.be.null;
		});

		it('should return a number greater or equal to zero than the birth_date', function() {
			person.birth_date = new Date(1956, 02, 01, 0, 0, 0, 0);
			expect(person.getAge(new Date(21956, 02, 01, 0, 0, 0, 0))).to.be.at.least(0);
		});

		it('should return a number lesser or equal to zero than the birth_date', function() {
			person.birth_date = new Date(1956, 02, 02, 0, 0, 0, 0);
			expect(person.getAge(new Date(1956, 02, 01, 0, 0, 0, 0))).to.be.at.most(0);
		});
	});

	describe('#addCourse()', function() {
		it('should add an object to the courses array', function() {
			person.addCourse(new CourseModule.Course());
		 	expect(person.courses).to.be.not.empty;
		});
		
	});

	describe('#removeCourse()', function() {
		it('should remove an object to the courses array', function() {
			person.removeCourse(new CourseModule.Course());
		 	expect(person.courses).to.be.empty;
		});
		
		it('should remove the rigth element off the courses array', function() {
			var cursoA = new CourseModule.Course('A');
			var cursoB = new CourseModule.Course('B');
			var cursoC = new CourseModule.Course('C');

			person.addCourse(cursoA);
			person.addCourse(cursoB);
			person.addCourse(cursoC);

			person.removeCourse(cursoB);
		 	expect(person.courses.indexOf(cursoB)).to.be.equal(-1);
		});
	});

});

describe('Course', function() {
	var course = new CourseModule.Course();
	var teacher = new TeacherModule.Teacher('Name');
	var student = new StudentModule.Student('Nombre');

	describe('#Course(name,Teacher)', function() {
		it('should assign the course to the teacher', function() {
			course = new CourseModule.Course('course', teacher);

			expect(course.name).to.be.equal('course');
			expect(course.teacher).to.be.equal(teacher);
		});
		
	});

	describe('#setTeacher()', function() {
		
		it('should assign the course to the new teacher and remove himself of the previous teacher', function() {
		
		});

		it('should emit event "teacherAssigned" sending himself and the new teacher assigned', function() {
		
		});

		it('should do nothing when triying to set the same teacher that it has', function() {
		
		});
		
	});

	describe('#addStudent()', function() {
		it('should assign the course to the student and emit the "studentAdded" sending himself and the student as parameters', function() {
		
		});
		
		it('should not add a student more than once in the collection', function() {
			course = new CourseModule.Course();
			course.addStudent(student);
			course.addStudent(student);

			expect(course.students).to.have.lengthOf(1);
			expect(course.students.indexOf(student)).to.be.equal(0);
		});

		it('should only add consistend created Students in the collection', function() {
			course = new CourseModule.Course();

			course.addStudent(null);
			course.addStudent(null);

			expect(course.students).to.be.empty;
		});
	});

	describe('#removeStudent()', function() {
		it('should assign the course to the student and emit the "studentAdded" sending himself and the student as parameters', function() {
		
		});
		
		it('should assign the course to the student and emit the "studentAdded" sending himself and the student as parameters', function() {
		
		});
	});

});

describe('Student', function() {
	var student = new StudentModule.Student();

	describe('#addCourse()', function() {
		it('should add an object to the courses array', function() {
			student.addCourse(new CourseModule.Course());
		 	expect(student.courses).to.be.not.empty;
		});
		
	});

});



