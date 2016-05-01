var fs = require("fs");
var StudentModule = require('./Student.js');
var TeacherModule = require('./Teacher.js');
var CourseModule = require('./Course.js');

var RelationsPersister = function RelationsPersister(fileStoragePath){
	this.fileStoragePath = fileStoragePath;
};

RelationsPersister.prototype.export = function (studentsObject,teachersObject,coursesObject){
	var persistibleObject = {};
		
	console.log('processing students');

	var newArray = [];

	for (var i = studentsObject.length - 1; i >= 0; i--) {
		var persitibleObject = {};
		studentsObject[i].exportTo(persitibleObject);
		newArray.push(persitibleObject);
	}

	persistibleObject['students'] = newArray;

	console.log('processing teachers');

	newArray = [];

	for (var i = teachersObject.length - 1; i >= 0; i--) {
		var persitibleObject = {};
		teachersObject[i].exportTo(persitibleObject);
		newArray.push(persitibleObject);
	}

	persistibleObject['teachers'] = newArray;
	
	console.log('processing courses');

	newArray = [];

	for (var i = coursesObject.length - 1; i >= 0; i--) {
		var persitibleObject = {};
		coursesObject[i].exportTo(persitibleObject);
		newArray.push(persitibleObject);
	}

	persistibleObject['courses'] = newArray;
	
	var jsonString = JSON.stringify(persistibleObject);

	fs.writeFileSync(this.fileStoragePath, jsonString,{flag:'w+'});
}

RelationsPersister.prototype.import = function (callback){

	var retrievedData = JSON.parse(fs.readFileSync(this.fileStoragePath, {flag:'rs+'}));

	console.log('processing students');

	var newReturn = {};

	for (var i = retrievedData['students'].length - 1; i >= 0; i--) {
		var student = new StudentModule.Student();

		student.importFrom(retrievedData['students'][i]);

		newReturn[student.id] = student;
	}

	retrievedData['students'] = newReturn;

	console.log('processing teachers');

	newReturn = {};

	for (var i = retrievedData['teachers'].length - 1; i >= 0; i--) {
		var teacher = new TeacherModule.Teacher();

		teacher.importFrom(retrievedData['teachers'][i]);

		newReturn[teacher.id] = teacher;
	}

	retrievedData['teachers'] = newReturn;

	console.log('processing courses');
	
	newReturn = {};

	for (var i = retrievedData['courses'].length - 1; i >= 0; i--) {
		var course = new CourseModule.Course();

		course.importFrom(retrievedData['courses'][i],retrievedData);

		newReturn[course.id] = course;
	}

	retrievedData['courses'] = newReturn;

	callback(retrievedData);
}

module.exports = {RelationsPersister: RelationsPersister};