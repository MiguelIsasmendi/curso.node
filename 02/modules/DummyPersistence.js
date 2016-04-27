var fs = require("fs");
var Promise = require("promise");

var User = function User(data){
	this.firstName = (data && data.firstName) || null;
	this.lastName = (data && data.lastName) || null;
	this.dateOfBirth = (data && data.dateOfBirth) || null;
};

User.prototype.age = function(){
	var today = new Date();
    var ageDifference = today.getFullYear() - this.dateOfBirth.getFullYear();
    var monthDifference = today.getMonth() - this.dateOfBirth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.dateOfBirth.getDate())) {
        ageDifference--;
    }
    return ageDifference;
};

var UserDAO = function UserDAO(filePath){
	this.filePath = filePath;
	this.persistedData= [];
	this.readData().then();
};

UserDAO.prototype.readData = function(){
	var promise = new Promise(function(resolve,reject){
		fs.readFile(this.filePath,{flag:'rs+'},
			function(err,data){
				if(err){
					console.log(error);
					reject(err);
				}
				else{
					var retrievedData = JSON.parse(data);
					
					this.persistedData = [];

					for (var i = 0; i < retrievedData.length; i++)
						this.persistedData.push(new User(retrievedData[i]));

					resolve(retrievedData);
				}
			})
	});

	return promise;
};

UserDAO.prototype.writeData = function(){
	var jsonString = JSON.stringify(this.persistedData);
	console.log('datos como JSON :');
	console.log(jsonString);

	var promise = new Promise(function(resolve,reject){
		fs.writeFile(this.filePath, jsonString,{flag:'w+'}, function (err) {
			if(err){
				console.log(error);
				reject(err);
			}
			else{
				resolve(this.persistedData);
			}
		});
	});

	return promise;
};

UserDAO.prototype.addUser = function(user){
	var this_ = this;
	var promise = new Promise(function (resolve, reject){

	if(user){
		this_.searchUserByName(user.firstName).then(
			function(userFinded){
				this_.persistedData.push(userFinded);
						
				console.log('token');
				this_.writeData().then(resolve,reject);
			},
			reject);		
	}
	else
		reject(user);
	});

	return promise;
};

UserDAO.prototype.removeUser = function(user){
	var promise = new Promise(function(resolve,reject){
		this.persistedData.splice(this.persistedData.indexOf(user),1);
		this.writeData().then(resolve,reject);
	});

	return promise;
};

UserDAO.prototype.searchUserByName = function(firstName){
	var this_ = this;

	var promise = new Promise(function(resolve,reject){
		console.log('searching: '+firstName + ' in '+this_.persistedData);
		var result = null;
		for(var key in this_.persistedData){
			var user = this_.persistedData[key];
			console.log('comparing: '+user['firstName']+' with: '+firstName);
			if(user['firstName'] == firstName){
				result = user;
				break;
			}
		}
		if(result)
			resolve(result);
		else
			reject(result);
		});
	return promise;
};

module.exports= {
	User : User,
	UserDAO: UserDAO,
	Promise: Promise
};