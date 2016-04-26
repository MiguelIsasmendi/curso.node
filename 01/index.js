/*
-Define the times method for the String objects, which receives a number and returns the string repeated that number of times:
-i.e: “*”.times(5) ///prints “*****”
*/
String.prototype.times = function(number) {
	var resultado = '';
    for(var i = 1; i <= number; i++)
		resultado += this;

	return resultado;
}

var menu = require('node-menu');
var _ = require('lodash'); 

var StudentModule = require('./modules/Student.js');
var TeacherModule = require('./modules/Teacher.js');
var CourseModule = require('./modules/Course.js');

var students = {};
var teachers = {};
var courses = {};

menu.addDelimiter('-', 40, 'Main Menu')
    .addItem(
        'Create a new Student', 
        function(nombre, direccion, diaNacimiento, mesNacimiento, anioNacimiento) {
			var fechaNacimiento = new Date(anioNacimiento, mesNacimiento, diaNacimiento, 0, 0, 0, 0);
			
			var estudiante = new StudentModule.Student(nombre, direccion, fechaNacimiento);
			
			students[estudiante.id] = estudiante;

			console.log(estudiante);
			
        },null,
		[{'name': 'Name', 'type': 'string'}, {'name': 'Address', 'type': 'string'}, {'name': 'Day of Birth', 'type': 'numeric'}, {'name': 'Month of Birth', 'type': 'numeric'}, {'name': 'Year of Birth', 'type': 'numeric'}])
    .addItem(
        "Create a new Teacher",
        function(nombre, direccion, diaNacimiento, mesNacimiento, anioNacimiento) {
            		
			var fechaNacimiento = new Date(anioNacimiento, mesNacimiento, diaNacimiento, 0, 0, 0, 0);
			
			teachers[nombre] = new TeacherModule.Teacher(nombre, direccion, fechaNacimiento);			
        },
        null,
		[{'name': 'Name', 'type': 'string'}, {'name': 'Address', 'type': 'string'}, {'name': 'Day of Birth', 'type': 'numeric'}, {'name': 'Month of Birth', 'type': 'numeric'}, {'name': 'Year of Birth', 'type': 'numeric'}])
    .addItem(
        'Enroll student to a course',
        function(studentId, courseName){
			
        	var course = courses[courseName];
        	var student = students[studentId];

			student.enrollToCourse(course);
		},
        null, 
        [{'name': 'Student Id', 'type': 'numeric'},{'name': 'Course Name', 'type': 'string'}])
    .addItem(
        'Get teacher to teach a course', 
        function(teacherName, courseName) {
        	var teacher = teachers[teacherName];
            
           courses[courseName] = new CourseModule.Course(courseName,teacher);
        },
        null, 
        [{'name': 'Teacher Name', 'type': 'string'}, {'name': 'Course Name', 'type': 'string'}])
    .addItem(
        'List all students',
        function(){
			for(var index in students){
				console.log(students[index]);
			}
		},
        null)
    .addDelimiter('*', 40)
    .start();