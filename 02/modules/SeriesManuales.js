var EventEmitter = require('events').EventEmitter;

var WrapperObject = function WrapperObject(owner,funcionAllamar){
	EventEmitter.call(this);
	this.funcionAllamar = funcionAllamar;
	this.owner = owner;
}

WrapperObject.prototype = Object.create(EventEmitter.prototype);
WrapperObject.prototype.constructor = WrapperObject;

WrapperObject.prototype.ejecutar = function(){
	if(this.funcionAllamar.length == 0)
		this.emit('finished',this.funcionAllamar.call());
	else
		this.funcionAllamar.call(this.owner,this);
}

var EventedSeries = function EventedSeries(funcionesArray,successCallback, errorCallback){
	EventEmitter.call(this);

	this.funciones = funcionesArray || [];
	this.resultados = [];
	this.lastError = null;
	this.successCallback = successCallback || function(resultados){};
	this.errorCallback = errorCallback || function(error){};

	this.on('error', function(error){lastError = error; errorCallback(error)});
};

EventedSeries.prototype = Object.create(EventEmitter.prototype);
EventedSeries.prototype.constructor = EventedSeries;

EventedSeries.prototype.run = function(){
	this.resultados = [];
	var this_ = this;
	this.lastError = null;

	for (var i = 0; i < this.funciones.length; i++) {
		var funcion = this.funciones[i];

		if(!funcion.emit){
			console.log('---------------------------------');
			console.log('la funcion :');
			console.log(' '+funcion);
			console.log('no implementa emit!');
			console.log('---------------------------------');

			var funcionWrapper = new WrapperObject(this,funcion);
			funcion = funcionWrapper;
		}

		funcion.on('finished',function(resultado){
			if(!this_.lastError){
				this_.resultados.push(resultado);

				console.log(this_.resultados);

				if(this_.funciones.length == this_.resultados.length)
					this_.successCallback(this_.resultados);
				}
			});

		if(funcion.ejecutar)
			funcion.ejecutar();
		else
			funcion();
	}

};

module.exports= {
	procesarSerie: function(serieDeFunciones, callback){
		var resultados = [];
		var funcionControl = function(error,resultadoParcial){

			resultados.push(resultadoParcial);

			if(serieDeFunciones.length == resultados.length)
				callback(error,resultados);
		}

		for (var i = 0; i < serieDeFunciones.length; i++) {

			if(serieDeFunciones[i].length == 0)
				funcionControl(null, serieDeFunciones[i]());
			else
				serieDeFunciones[i](funcionControl);
		}
	},
	EventedSeries : EventedSeries
};