  
var EventEmitter = require('events').EventEmitter;

function Person(nombre, direccion, fechaNacimiento){
	
	EventEmitter.call(this);

	this.name = nombre;
	this.address = direccion;
	this.birth_date = fechaNacimiento;
	this.friends = [];
	this.courses= [];
};


Person.prototype = Object.create(EventEmitter.prototype);
Person.prototype.constructor = Person;

Person.prototype.getName = function(){
		return this.name;
	};

Person.prototype.getAge = function(aDate){
	var edad = null;
	var referenceDate = aDate || new Date();

	if(this.birth_date && referenceDate >= this.birth_date){

	    edad = referenceDate.getFullYear() - this.birth_date.getFullYear();
	    var monthDifference = referenceDate.getMonth() - this.birth_date.getMonth();
	    
	    if (monthDifference < 0 || (monthDifference === 0 && referenceDate.getDate() < this.birth_date.getDate())) {
	        edad--;
	    }

	}

    return edad;
};

Person.prototype.addCourse = function(aCourse){
	this.courses.push(aCourse);
};

Person.prototype.removeCourse = function(aCourse){
		this.courses.splice(this.courses.indexOf(aCourse),1);
};
	
module.exports = {Person: Person};