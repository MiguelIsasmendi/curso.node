var promiseModule = require('promised-io');

var User = function User(){
	this.firstName = null;
	this.lastName = null;
	this.dateOfBirth = null;
}

User.prototype.age = function(){
	var today = new Date();
    var ageDifference = today.getFullYear() - this.dateOfBirth.getFullYear();
    var monthDifference = today.getMonth() - this.dateOfBirth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < this.dateOfBirth.getDate())) {
        ageDifference--;
    }
    return ageDifference;
}

var UserDAO = function UserDAO(){
	this.firstName = null;
	this.lastName = null;
	this.dateOfBirth = null;
}


module.exports= {
	User : User,
	UserDAO: UserDAO
};