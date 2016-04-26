  
var EventEmitter = require('events').EventEmitter;

function Persona(nombre, direccion, fechaNacimiento){
	
	EventEmitter.call(this);

	this.name = nombre;
	this.address = direccion;
	this.birth_date = fechaNacimiento;
	this.friends = [];
	this.courses= [];
};


Persona.prototype = Object.create(EventEmitter.prototype);
Persona.prototype.constructor = Persona;

Persona.prototype.getName = function(){
		return this.name;
	};

Persona.prototype.getAge = function(){
		var edad = null;
		
		if(this.birth_date)
			edad = new Date().getFullYear() - this.birth_date.getFullYear();
		
		return edad;
	};

Persona.prototype.addCourse = function(aCourse){
	this.courses.push(aCourse);
};

Persona.prototype.removeCourse = function(aCourse){
		this.courses.splice(this.courses.indexOf(aCourse),1);
};
	
module.exports = {Persona: Persona};