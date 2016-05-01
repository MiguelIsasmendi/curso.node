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
var logger = require('winston');
logger.add(logger.transports.File, {filename: 'app.log'});


var StudentModule = require('./modules/Student.js');
var TeacherModule = require('./modules/Teacher.js');
var CourseModule = require('./modules/Course.js');
var RelationsPersister = require('./modules/RelationsPersister.js').RelationsPersister;
var relationsPersister = new (require('./modules/RelationsPersister.js').RelationsPersister)(__dirname + '/storage/datos.json');

var students = {};
var teachers = {};
var courses = {};

menu.addDelimiter('-', 40, 'Main Menu')
    .addItem(
        'Create a new Student', 
        function(nombre, direccion, diaNacimiento, mesNacimiento, anioNacimiento) {
			var fechaNacimiento = new Date(anioNacimiento, mesNacimiento, diaNacimiento, 0, 0, 0, 0);
			
			var student = new StudentModule.Student(StudentModule.getNewId(),nombre, direccion, fechaNacimiento);
			
			students[student.id] = student;

			logger.info('A student has been created:');
			logger.info(student);
			
        },null,
		[{'name': 'Name', 'type': 'string'}, {'name': 'Address', 'type': 'string'}, {'name': 'Day of Birth', 'type': 'numeric'}, {'name': 'Month of Birth', 'type': 'numeric'}, {'name': 'Year of Birth', 'type': 'numeric'}])
    .addItem(
        "Create a new Teacher",
        function(nombre, direccion, diaNacimiento, mesNacimiento, anioNacimiento) {
            		
			var fechaNacimiento = new Date(anioNacimiento, mesNacimiento, diaNacimiento, 0, 0, 0, 0);
			
			var teacher = new TeacherModule.Teacher(TeacherModule.getNewId(),nombre, direccion, fechaNacimiento);			
			
			teachers[teacher.id] = teacher;

			logger.info('A teacher has been created:');
			logger.info(teacher);
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
				logger.error('An error has been generated:');
				logger.error(e);
				ogger.error('Check the parameters you entered');
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
           		logger.debug('Since course did not exists we have to create a new course.');
	           	course = new CourseModule.Course(CourseModule.getNewId(),courseName,teacher);

	           courses[course.id] = course;
	       } else {
	       		logger.debug('Since course did exists we set to it thewe have to create a new course.');
	       		course.setTeacher(teacher);
	       }

	       logger.info('we have reconfigurated the course:');
	       logger.info(course);
        },
        null, 
        [{'name': 'Teacher Id', 'type': 'numeric'}, {'name': 'Course Name', 'type': 'string'}])
    .addItem(
        'Export relational data',function(){
        	relationsPersister.export(students, teachers, courses);
		},
        null)
    .addItem(
        'Import relational data',function(){
        	relationsPersister.import(
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