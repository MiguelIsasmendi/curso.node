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
	this.addCourse(aCourse);

	aCourse.addStudent(this);
};

Student.prototype.leaveCourse = function(aCourse){
	aCourse.removeStudent(this);

	this.removeCourse(aCourse);
};

Student.prototype.setCourseGrade = function(aCourse, aGrade){
	var average_grade = 0;
	
	this.current_grades[aCourse] = aGrade;

	for(var indice in this.current_grades){
		average_grade += this.current_grades[indice];
	}

	this.avg_grade = average_grade / this.current_grades.lenght;
	
	this.emit('gradeEmited',this,aCourse,aGrade);
};

module.exports = {Student: Student};