  
var EventEmitter = require('events').EventEmitter;
var personId = 0;

function Person(id,nombre, direccion, fechaNacimiento){
	
	EventEmitter.call(this);

	this.id = id;
	this.name = nombre;
	this.address = direccion;
	this.birth_date = fechaNacimiento;
	this.friends = [];
	this.courses= [];
};

Person.prototype = Object.create(EventEmitter.prototype);
Person.prototype.constructor = Person;

Person.prototype.getNewId = function(){
		return personId++;
	};

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

Person.prototype.exportTo = function(anObject){
	anObject.id = this.id;
	anObject.name = this.name;
	anObject.address = this.address;
	anObject.birth_date = this.birth_date;
};

Person.prototype.importFrom = function(anObject){
	this.id = anObject.id || this.id;
	this.name = anObject.name;
	this.address = anObject.address;
	this.birth_date = anObject.birth_date;
};

module.exports = {Person: Person};