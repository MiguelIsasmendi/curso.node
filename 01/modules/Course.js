var EventEmitter = require('events').EventEmitter;

var globalId = 1;

function getNewId (){
	return globalId++;
};

function syncGlobalIdWith(id){
	globalId = Math.max(globalId, id) || globalId;
};

function Course(id, newName, teacher){

	EventEmitter.call(this);
	this.id = id;
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

		if(aStudent.courses.indexOf(this) == -1)
			aStudent.enrollToCourse(this);
	}
};
	
Course.prototype.removeStudent = function(aStudent){
	var index = this.students.indexOf(aStudent);

	if(index > -1){
		this.students.splice(index,1);

		aStudent.leaveCourse(this);
		
		this.emit('studentRemoved', this, aStudent);
	}
};

Course.prototype.exportTo = function(anObject){

	anObject.id = this.id;
	anObject.name = this.name;
	anObject.students = this.students.map(function(element){return element.id});

	if(this.teacher)
			anObject.teacher = this.teacher.id;
};

Course.prototype.importFrom = function(anObject, outerContext){

	this.id = anObject.id || this.id;

	syncGlobalIdWith(this.id);

	this.name = anObject.name;

	if(anObject.teacher)
		this.setTeacher(outerContext.teachers[anObject.teacher])

	for (var i = 0; i < anObject.students.length; i++) {
		var studentId = anObject.students[i];
		var student = outerContext['students'][studentId];

		this.addStudent(student);
	}
};

module.exports = {Course:Course,
				syncGlobalIdWith:syncGlobalIdWith,
				getNewId: getNewId};