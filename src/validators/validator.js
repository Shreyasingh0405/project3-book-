// ================ imports ===========================================================================================//

const mongoose = require('mongoose');

// ================ Field Validation ===========================================================================================//

const isValidField = function (value) 
{
    if (typeof value === 'undefined' || value === null) return false;

    if (typeof value === 'string' && value.trim().length === 0) return false;

    return true;
};

// ================ requestBody Validation ===========================================================================================//

const isValidRequestBody = function (requestBody) 
{
   return Object.keys(requestBody).length > 0;
};

// ================ Field Validation ===========================================================================================//

const isValidObjectId = function (ObjectId)
{
    if (!mongoose.Types.ObjectId.isValid(ObjectId))return false
    
    return true;
};

// ================ Field Validation ===========================================================================================//

const isValidTitle = function (title)
{
    return ["Mr","Mrs","Miss"].indexOf(title)!=-1;
};

// ================ URL Validation ===========================================================================================//

const isValidURL = function (link)
{
    return (/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(link));
};

// ================ Mobile No. Validation ===========================================================================================//

const isValidMobileNo = function (mobile)
{
    return (/((\+91)?0?)?[6-9]\d{9}$/.test(mobile));
};

// ================ Email Validation ===========================================================================================//

const isValidEmail = function(email)
{
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
};

// ================ Password Validation ===========================================================================================//

const isValidPassword = function (password)
{
    if(password.length>=15&&password.length<=8)
        return false;

    regexpass = /\w{8,15}/;
    return (regexpass.test(password));
};

// ================ ISBN Validation ===========================================================================================//

const isValidISBN = function (ISBN)
{
    return (/\d{3}-?\d{10}/.test(ISBN));
};

// ================ exports ===========================================================================================//

module.exports={isValidField,isValidRequestBody,isValidEmail,isValidISBN,isValidMobileNo,isValidURL,isValidTitle,isValidObjectId,isValidPassword};