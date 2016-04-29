var moduloPersona = require('./Person.js');
var studentId = 0;

function Student(nombre, direccion, fechaNacimiento){
	moduloPersona.Person.call(this, nombre, direccion, fechaNacimiento);
	this.id = studentId++;
	this.avg_grade = 0;
	this.current_grades = {};
	
};

Student.prototype = Object.create(moduloPersona.Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.enrollToCourse = function(aCourse){

	if(this.courses.indexOf(aCourse) == -1){
		this.addCourse(aCourse);

		aCourse.addStudent(this);
	}
};

Student.prototype.leaveCourse = function(aCourse){

	if(aCourse.students.indexOf(this) == -1){
		aCourse.removeStudent(this);

		this.removeCourse(aCourse);
	}
};

Student.prototype.setCourseGrade = function(aCourse, aGrade){

	if(aGrade && aCourse && this.courses.indexOf(aCourse) > -1){
		var added_grades = 0;
		
		this.current_grades[aCourse] = aGrade;

		for(var indice in this.current_grades){
			added_grades += this.current_grades[indice];
		}

		this.avg_grade = added_grades / Object.keys(this.current_grades).length;
		
		this.emit('gradeEmited',this,aCourse,aGrade);
	}
};

module.exports = {Student: Student};