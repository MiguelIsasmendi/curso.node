var promiseModule = require('promised-io/fs');

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
	this.persitedData= [];
};

UserDAO.prototype.readData= function(successCallback, errorCallback){
	promiseModule.readFile(this.filePath)
		.then(function(data){
			this.persistedData = JSON.parse(data);
			
			if(successCallback)
				successCallback(this.persistedData);
		},function(error){
			console.log(error);
			
			if(errorCallback)
				errorCallback(error);
		});
};

UserDAO.prototype.writeData= function(successCallback, errorCallback){
	promiseModule.writeFile(this.filePath, JSON.stringify(this.persistedData))
		.then(function(){
			
			if(successCallback)
				successCallback();
		},function(error){
			console.log(error);
			
			if(errorCallback)
				errorCallback(error);
		});
};

UserDAO.prototype.searchUserByName= function(firstName, lastName){
	for(var key in this.persistedData){
		var user = this.persistedData[key];
		if(user['firstName'] == firstName && user['lastName'] == lastName)
			return user;
	}
};

module.exports= {
	User : User,
	UserDAO: UserDAO
};