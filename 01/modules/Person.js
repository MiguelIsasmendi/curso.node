  
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

Person.prototype.getAge = function(){
		var edad = null;
		
		if(this.birth_date)
			edad = new Date().getFullYear() - this.birth_date.getFullYear();
		
		return edad;
	};

Person.prototype.addCourse = function(aCourse){
	this.courses.push(aCourse);
};

Person.prototype.removeCourse = function(aCourse){
		this.courses.splice(this.courses.indexOf(aCourse),1);
};
	
module.exports = {Person: Person};