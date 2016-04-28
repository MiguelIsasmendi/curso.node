var fs = require("fs");
var Promise = require("promise").Promise;

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
	this.readData();
};

UserDAO.prototype.readData = function(){
	/*var promise = new Promise(function(resolve,reject){
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

	return promise;*/
	
	var retrievedData = JSON.parse(fs.readFileSync(this.filePath,{flag:'rs+'}));
	this.persistedData = [];
	for (var i = 0; i < retrievedData.length; i++)
		this.persistedData.push(new User(retrievedData[i]));
	
	return this.persistedData;
};

UserDAO.prototype.persistedData = function(){
	return this.persistedData;	
};

UserDAO.prototype.writeData = function(){
	var jsonString = JSON.stringify(this.persistedData);
	console.log('datos como JSON :');
	console.log(jsonString);

	/*var promise = new Promise(function(resolve,reject){
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

	return promise;*/
	
	fs.writeFile(this.filePath, jsonString,{flag:'w+'});
	
	return this.persistedData;
};

UserDAO.prototype.addUser = function(user){
	/*var this_ = this;
	var promise = new Promise(function (resolve, reject){

	if(user){
		this_.searchUserByName(user.firstName).then(
			function(userFinded){
				this_.persistedData.push(userFinded);

				this_.writeData().then(resolve,reject);
			},
			reject);		
	}
	else
		reject(user);
	});

	return promise;*/
	
	var this_ = this;
	if(user){
		var userFinded = this.searchUserByName(user.firstName,
			function (userNotFinded){
				this_.persistedData.push(user);
				this_.writeData();
			});
		
		if(userFinded)
			throw new Error('The user already exists!!!!');
	}
	
};

UserDAO.prototype.removeUser = function(user){
	/*var promise = new Promise(function(resolve,reject){
		this.persistedData.splice(this.persistedData.indexOf(user),1);
		this.writeData().then(resolve,reject);
	});

	return promise;*/
	var userIndex = this.persistedData.indexOf(user);
	
	if(userIndex > -1){
		this.persistedData.splice(userIndex,1);
		this.writeData();
	}else{
		throw new Error('The user is not persisted!!!!');
	}
};

UserDAO.prototype.searchUserByName = function(firstName, errorCallback){
	/*var this_ = this;

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
	return promise;*/
	
	console.log('searching: ' + firstName + ' in '+JSON.stringify(this.persistedData));
	var result = null;
	
	for(var key in this.persistedData){
		var user = this.persistedData[key];
		
		//console.log('comparing: '+user['firstName']+' with: '+firstName);
		
		if(user['firstName'] == firstName){
			result = user;
			break;
		}
	}
	
	if(result)
		return result;	
	else{
		var error = new Error('No user finded with the name: '+firstName+'.');
		if(errorCallback)
			errorCallback(error);
		else
			throw error;
	}
};

module.exports= {
	User : User,
	UserDAO: UserDAO,
	Promise: Promise
};