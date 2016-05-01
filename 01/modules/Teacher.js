var moduloPersona = require('./Person.js');

var Teacher = function(id, nombre, direccion, fechaNacimiento){
	moduloPersona.Person.call(this, id, nombre, direccion, fechaNacimiento);
};

Teacher.prototype = Object.create(moduloPersona.Person.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.teachCourse = function(aCourse){
	if(this.courses.indexOf(aCourse) == -1)
		this.addCourse(aCourse);

	if(aCourse.teacher != this)
		aCourse.setTeacher(this);
};

Teacher.prototype.stopTeachingCourse = function(aCourse){
	this.removeCourse(aCourse);
};

Teacher.prototype.gradeStudent = function(aStudent, aCourse, aGrade){
	aStudent.setCourseGrade(aCourse, aGrade);
};

module.exports = {Teacher: Teacher};