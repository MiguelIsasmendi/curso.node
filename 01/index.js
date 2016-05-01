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
var fs = require('fs');

var StudentModule = require('./modules/Student.js');
var TeacherModule = require('./modules/Teacher.js');
var CourseModule = require('./modules/Course.js');
var RelationsPersister = require('./modules/RelationsPersister.js').RelationsPersister;

var students = {};
var teachers = {};
var courses = {};

menu.addDelimiter('-', 40, 'Main Menu')
    .addItem(
        'Create a new Student', 
        function(nombre, direccion, diaNacimiento, mesNacimiento, anioNacimiento) {
			var fechaNacimiento = new Date(anioNacimiento, mesNacimiento, diaNacimiento, 0, 0, 0, 0);
			
			var estudiante = new StudentModule.Student(StudentModule.getNewId(),nombre, direccion, fechaNacimiento);
			
			students[estudiante.id] = estudiante;

			console.log(estudiante);
			
        },null,
		[{'name': 'Name', 'type': 'string'}, {'name': 'Address', 'type': 'string'}, {'name': 'Day of Birth', 'type': 'numeric'}, {'name': 'Month of Birth', 'type': 'numeric'}, {'name': 'Year of Birth', 'type': 'numeric'}])
    .addItem(
        "Create a new Teacher",
        function(nombre, direccion, diaNacimiento, mesNacimiento, anioNacimiento) {
            		
			var fechaNacimiento = new Date(anioNacimiento, mesNacimiento, diaNacimiento, 0, 0, 0, 0);
			
			var teacher = new TeacherModule.Teacher(TeacherModule.getNewId(),nombre, direccion, fechaNacimiento);			
			
			teachers[teacher.id] = teacher;

			console.log(teacher);
        },
        null,
		[{'name': 'Name', 'type': 'string'}, {'name': 'Address', 'type': 'string'}, {'name': 'Day of Birth', 'type': 'numeric'}, {'name': 'Month of Birth', 'type': 'numeric'}, {'name': 'Year of Birth', 'type': 'numeric'}])
    .addItem(
        'Enroll student to a course',
        function(studentId, courseId){
			
        	var course = courses[courseId];

        	var student = students[studentId];

        	try{
				student.enrollToCourse(course);
			} catch(e){
				console.log('Se generó el siguiente error:');
				console.log(e);
				console.log('Verifique parámetros');
			}
		},
        null, 
        [{'name': 'Student Id', 'type': 'numeric'},{'name': 'Course Id', 'type': 'numeric'}])
    .addItem(
        'Get teacher to teach a course', 
        function(teacherId, courseName) {
        	var teacher = teachers[teacherId];
            
           var course = null;

           for(var i in courses){
           		if(courses[i].name = courseName){
           			course = courses[i];
           			break;
           		}
           }


           if(!course){
	           	course = new CourseModule.Course(CourseModule.getNewId(),courseName,teacher);

	           courses[course.id] = course;
	       } else {
	       		course.setTeacher(teacher);
	       }

	       console.log(course);
        },
        null, 
        [{'name': 'Teacher Id', 'type': 'numeric'}, {'name': 'Course Name', 'type': 'string'}])
    .addItem(
        'Export relational data',function(){
        	new RelationsPersister(__dirname + '/storage/datos.json').export(students, teachers, courses);
		},
        null)
    .addItem(
        'Import relational data',function(){
        	new RelationsPersister(__dirname + '/storage/datos.json').import(
        			function(data){
        				students = data['students'];
        				teachers = data['teachers'];
        				courses = data['courses']});
		},
        null)
    .addItem(
        'List all courses ',function(){

        	console.log('Courses (id, name, teacher name, number of students)');
			console.log('-----------------------------------------------------');

        	for (var i in courses) {
        		var course = courses[i];
        		console.log(course.id, course.name, course.teacher.name, course.students.length);
        	}
		},
        null)
    .addDelimiter('*', 40)
    .start();