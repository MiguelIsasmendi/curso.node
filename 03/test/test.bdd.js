var PersonModule = require(__dirname+'/../../01/modules/Person.js');
var StudentModule = require(__dirname+'/../../01/modules/Student.js');
var TeacherModule = require(__dirname+'/../../01/modules/Teacher.js');
var CourseModule = require(__dirname+'/../../01/modules/Course.js');

var expect = require('chai').expect;

describe('Person', function() {
	var person = new PersonModule.Person();
	describe('#getAge()', function() {
		it('should return null when the birth_date is not present', function() {
		 expect(person.getAge()).to.be.null;
		});

		it('should return a number when the birth_date is present', function() {
			person.birth_date = new Date(21956, 02, 01, 0, 0, 0, 0);
			expect(person.getAge()).to.be.at.least(0);
		});
	});
});

