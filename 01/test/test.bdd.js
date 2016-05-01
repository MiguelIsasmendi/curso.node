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

	describe('#Course(id, name, Teacher)', function() {
		it('should assign the course to the teacher', function() {
			course = new CourseModule.Course(CourseModule.getNewId(), 'course', teacher);

			expect(course.name).to.be.equal('course');
			expect(course.teacher).to.be.equal(teacher);
			expect(course.teacher.courses.indexOf(course)).to.be.equal(0);
		});
		
	});

	describe('#setTeacher()', function() {
		
		it('should assign the course to the new teacher and remove himself of the previous teacher', function() {
			var previousTeacher = new TeacherModule.Teacher('PreviousTeacher');
			course = new CourseModule.Course('curso',previousTeacher);
			teacher = new TeacherModule.Teacher('newTeacher');

			course.setTeacher(teacher);

			expect(course.teacher).to.be.equal(teacher);
			expect(previousTeacher.courses).to.be.empty;
			expect(course.teacher.courses.indexOf(course)).to.be.equal(0);
		});

		it('should emit event "teacherAssigned" sending himself and the new teacher assigned', function(done) {
			course = new CourseModule.Course('curso');
			teacher = new TeacherModule.Teacher('newTeacher');

			course.on('teacherAssigned', function(aCourse, aTeacher){
				expect(course).to.be.equal(aCourse);
				expect(course.teacher).to.be.equal(aTeacher);

				done();
			});

			course.setTeacher(teacher);
			
		});

		it('should do nothing when triying to set the same teacher that it has', function() {
			course = new CourseModule.Course('curso');
			teacher = new TeacherModule.Teacher('newTeacher');

			course.setTeacher(teacher);

			course.on('teacherAssigned', function(aCourse, aTeacher){
				expect(course).to.not.be.equal(aCourse);
				expect(course.teacher).to.not.be.equal(aTeacher);
			});

			course.setTeacher(teacher);
		});
		
	});

	describe('#addStudent()', function() {
		it('should assign the course to the student and emit the "studentAdded" sending himself and the student as parameters', function() {
			student = new StudentModule.Student('Nombre');
			course = new CourseModule.Course();

			course.on('studentAdded', function(aCourse, aStudent){
				expect(course).to.be.equal(aCourse);
				expect(course.students[0]).to.be.equal(aStudent);
			});

			course.addStudent(student);

			expect(course.students).to.have.lengthOf(1);
			expect(course.students.indexOf(student)).to.be.equal(0);
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
		
		it('should do nothing when removing an element that is not in the collection students', function() {
			student = new StudentModule.Student('Nombre');
			var studentNotRemoved = new StudentModule.Student('Usuario Que No Existe');
			course = new CourseModule.Course();
			
			course.addStudent(student);

			course.on('studentRemoved', function(aCourse, aStudent){
				expect(course).to.not.be.equal(aCourse);
				expect(studentNotRemoved).to.not.be.equal(aStudent);
			});

			course.removeStudent(studentNotRemoved);

			expect(course.students).lengthOf(1);
		});

		it('should remove a student from the course and emit the "studentRemoved" sending himself and the student as parameters', function() {
			student = new StudentModule.Student('Nombre');
			course = new CourseModule.Course();
		
			course.addStudent(student);
			
			course.on('studentRemoved', function(aCourse, aStudent){
				expect(course).to.be.equal(aCourse);
				expect(student).to.be.equal(aStudent);
			});

			course.removeStudent(student);

			expect(course.students).to.be.empty;
		});
		
	});

});

describe('Student', function() {
	var student = new StudentModule.Student();
	var course = new CourseModule.Course();

	describe('#enrollToCourse(aCourse)', function() {
		it('should add himself to the a course only once', function() {
			student = new StudentModule.Student();
			course = new CourseModule.Course();
			
			student.enrollToCourse(course);
			student.enrollToCourse(course);

		 	expect(student.courses).to.have.lengthOf(1);
		 	expect(student.courses.indexOf(course)).to.be.equal(0);
		 	expect(course.students.indexOf(student)).to.be.equal(0);
		});
	});

	describe('#leaveCourse(aCourse)', function() {
		it('should add an object to the courses array', function() {
			student = new StudentModule.Student();
			course = new CourseModule.Course();
			
			student.enrollToCourse(course);

			student.leaveCourse(course);
		 	
		 	expect(student.courses.indexOf(course)).to.be.equal(0);
		 	expect(course.students.indexOf(student)).to.be.equal(0);
		});
	});

	describe('#setCourseGrade(aCourse, aGrade)', function() {
		it('set to a previously enrolled course a grade', function() {
			student = new StudentModule.Student();
			course = new CourseModule.Course();
			var grade = 12;

			student.on('gradeEmited', function(aStudent,aCourse,aGrade){
				expect(aStudent).to.be.equal(student);
				expect(aCourse).to.be.equal(course);
				expect(aGrade).to.be.equal(grade);
			});

			
			student.enrollToCourse(course);
			student.setCourseGrade(course,grade);

			expect(student.avg_grade).to.be.equal(grade);

		 	expect(student.courses.indexOf(course)).to.be.equal(0);
	
		});
	});

});

describe('Teacher', function(){
	var teacher = new TeacherModule.Teacher();
	var course = new CourseModule.Course();

	describe('#teachCourse()', function(){
		it('should add the course to the teacher and to the collection of courses if it is not added yet', function(){
			teacher = new TeacherModule.Teacher();
			course = new CourseModule.Course();

			teacher.teachCourse(course);
			
			expect(teacher.courses.indexOf(course)).to.be.equal(0);
			expect(course.teacher).to.be.equal(teacher);
		});
	});

	describe('#stopTeachingCourse()', function(){
		it('should remove himself from the course and delete the course if it is included in the courses collection', function(){
			teacher = new TeacherModule.Teacher();
			course = new CourseModule.Course();
			
			course.setTeacher(teacher);

			expect(teacher.courses.indexOf(course)).to.be.equal(0);
			expect(course.teacher).to.be.equal(teacher);
		});
	});

	describe('#gradeStudent()', function(){
		it('should set the grade to a student.', function(){
			teacher = new TeacherModule.Teacher('Profesor');
			course = new CourseModule.Course('Curso');
			var student = new StudentModule.Student('Nombre');
			
			course.setTeacher(teacher);
			student.enrollToCourse(course);

			teacher.gradeStudent(student);

			expect(teacher.courses.indexOf(course)).to.be.equal(0);
			expect(course.teacher).to.be.equal(teacher);
		});
	});
});