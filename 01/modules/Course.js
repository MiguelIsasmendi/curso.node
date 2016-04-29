var EventEmitter = require('events').EventEmitter;

function Course(newName, teacher){

	EventEmitter.call(this);

	this.name = newName;
	this.students = [];
	this.minimum_avg_grade = 0;
	
	if(teacher)
		this.setTeacher(teacher);
};

Course.prototype = new EventEmitter();
Course.prototype.constructor = Course;
	
Course.prototype.setTeacher = function(aTeacher){

	if(this.teacher !== aTeacher){
		if(this.teacher)
			this.teacher.stopTeachingCourse(this);

		this.teacher = aTeacher;
		this.emit('teacherAssigned', this, aTeacher);

		if(this.teacher)
			this.teacher.teachCourse(this);
	}
};
	
Course.prototype.addStudent = function(aStudent){
	if(aStudent && this.students.indexOf(aStudent) == -1){
		this.students.push(aStudent);
		this.emit('studentAdded', this, aStudent);
	}
};
	
Course.prototype.removeStudent = function(aStudent){
	var index = this.students.indexOf(aStudent);

	if(index > -1){
		this.students.splice(index,1);
		this.emit('studentRemoved', this, aStudent);
	}
};

module.exports = {Course:Course};