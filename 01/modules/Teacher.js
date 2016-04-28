var moduloPersona = require('./Person.js');

var Teacher = function(nombre, direccion, fechaNacimiento){
	moduloPersona.Person.call(this, nombre, direccion, fechaNacimiento);
};

Teacher.prototype = Object.create(moduloPersona.Person.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.teachCourse = function(aCourse){
	this.addCourse(aCourse);
};

Teacher.prototype.stopTeachingCourse = function(aCourse){
	this.removeCourse(aCourse);
};

Teacher.prototype.gradeStudent = function(aStudent, aCourse, aGrade){
	aStudent.setCourseGrade(aCourse, aGrade);
};

module.exports = {Teacher: Teacher};