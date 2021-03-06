var menu = require('node-menu');
var EventEmitter = require('events').EventEmitter;
var seriesCustom = require('./modules/SeriesManuales.js');
var dummyPersistence = require('./modules/DummyPersistence.js');

var dao = new dummyPersistence.UserDAO('./storage/users.json');


menu.addDelimiter('-', 40, 'Main Menu')
    .addItem(
        'Ejecutar Ejercicio 1', 
        function() {
		// What is wrong with this code?:
		// for(i = 0; i < 10; i++) {
		//     setTimeout(function() { console.log(i); }, 1000);
		// }
		// Fix it. So it works as expected.

			for(var i = 0; i < 10; i++) {
			     setTimeout(function() { console.log(i); }, 1000);
			}
        })
    .addItem(
        'Ejecutar Ejercicio 2', 
        function() {
        	//Write a series function that executes a list of asynchronous functions and calls a callback with the result of all of them only once they’ve all finished.
			//Don’t use the async.js library for this.
			
			seriesCustom.procesarSerie([
				function(callback){ var tiempoEspera = 1000 * Math.random();
				 setTimeout(function(){callback(null,tiempoEspera)},tiempoEspera);},
				function(){ return "valor calculado inmediatamente"},
				function(callback){ var tiempoEspera = 1000 * Math.random();
				 setTimeout(function(){callback(null,tiempoEspera)},tiempoEspera);}],
				function(error,resultados){ console.log(resultados) });

        })
     .addItem(
        'Ejecutar Ejercicio 3', 
        function() {
        	//Write a series function that executes a list of asynchronous functions and calls a callback with the result of all of them only once they’ve all finished.
			//Write the same function using the events module


			var funcionPrueba = function(){
				return 0023421354;
			}

			EventEmitter.call(funcionPrueba);

			var eventedSeries = new seriesCustom.EventedSeries([
				funcionPrueba,
				function(wrapperEmisor){
					var tiempo = 1000 * Math.random();
					setTimeout(
							function(){
								wrapperEmisor.emit('finished',tiempo);
							}
							,tiempo);},
				function(wrapperEmisor){
					var tiempo = 1000 * Math.random();
					setTimeout(
							function(){
								wrapperEmisor.emit('finished',tiempo);
							}
							,tiempo);},
				function(){return 23432225}
				],
				function(resultados){console.log(resultados)});

			eventedSeries.run();
        })
      .addItem(
        'Ejecutar Ejercicio 4', 
        function() {
        	//Considering the following definition of “user”: 

			// Create an Object using promises that meets the following goals:
			// Create an user
			// Update user’s data
			// Retrieve an user by name
			// Delete an user
			
			var user = new dummyPersistence.User();

			user.firstName = 'Pedro';
			user.lastName = 'Rodriguez';
			user.dateOfBirth = new Date(2001, 08, 02, 0, 0, 0, 0);


			// You should keep in mind the following:
			// All representations of all resources should be specified as JSON.
			// Use a simple file I/O to store the data.
			// In the update / delete operation, you’ve to trigger an error in case the specified user does not exist.
			// If you’re trying to create an existing user, you’ve to return the corresponding message.			

			// Create an user
			
			var errorCallback = function(error){console.log(error)};
			
			new dummyPersistence.Promise(		
				function(resolve,reject){
					try{
						var result = dao.addUser(user);
						resolve(result);
					}catch(error){
						reject(error);
					}
				}).
				then(function(){
					var modifiedUser = dao.searchUserByName(user.firstName);
					modifiedUser.lastName = 'pepedro';
					
					return dao.updateUser(modifiedUser);},errorCallback).
				then(function(){
					return dao.searchUserByName('Pedro')},errorCallback).
				then(function(){
					return dao.removeUser(user)},errorCallback).
				then(function(){
					return console.log(JSON.stringify(dao.persistedData()))},errorCallback);
			
        })
    .addDelimiter('*', 40)
    .start();