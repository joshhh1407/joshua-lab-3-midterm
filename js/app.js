function isValidStudentNumber(value) {
if (typeof value !== "string") {
return false;
}
return /^\d{2}-\d{4}-\d{3}$/.test(value.trim());
}

function isValidPassword(value) {
if (typeof value !== "string") {
return false;
}
var ok = true;
if (value.length < 8) ok = false;
if (!/[A-Z]/.test(value)) ok = false;
if (!/[0-9]/.test(value)) ok = false;
if (!/[@$!]/.test(value)) ok = false;
if (/\s/.test(value)) ok = false;
return ok;
}

function emailOk(value) {
return /^\S+@\S+\.\S+$/.test(value.trim());
}

function mobileOk(value) {
var m = value.trim();
return /^09\d{9}$/.test(m) || /^\+639\d{9}$/.test(m);
}

if (typeof document !== "undefined") {
document.addEventListener("DOMContentLoaded", main);
}

function main() {
var d = document;
var form = d.getElementById("registrationForm");

function flag(field, box, msg) {
d.getElementById(box).textContent = msg;
d.getElementById(field).setAttribute("aria-invalid", msg === "" ? "false" : "true");
return msg === "";
}

function checkName() {
var val = d.getElementById("fullName").value.trim();
if (val.length < 2) {
return flag("fullName", "fullNameError", "Please type your full name (at least 2 letters).");
}
return flag("fullName", "fullNameError", "");
}

function checkStudent() {
if (isValidStudentNumber(d.getElementById("studentNumber").value)) {
return flag("studentNumber", "studentNumberError", "");
}
return flag("studentNumber", "studentNumberError", "Enter a student number in the format 24-1234-123.");
}

function checkEmail() {
if (emailOk(d.getElementById("email").value)) {
return flag("email", "emailError", "");
}
return flag("email", "emailError", "Please enter a valid email.");
}

function checkMobile() {
if (mobileOk(d.getElementById("mobileNumber").value)) {
return flag("mobileNumber", "mobileNumberError", "");
}
return flag("mobileNumber", "mobileNumberError", "Use 09xxxxxxxxx or +639xxxxxxxxx.");
}

function checkPass() {
if (isValidPassword(d.getElementById("password").value)) {
return flag("password", "passwordError", "");
}
return flag("password", "passwordError", "Password needs 8+ chars, uppercase, a number and @ $ or !.");
}

function checkConfirm() {
var p = d.getElementById("password").value;
var c = d.getElementById("confirmPassword").value;
if (c !== "" && c === p) {
return flag("confirmPassword", "confirmPasswordError", "");
}
return flag("confirmPassword", "confirmPasswordError", "Passwords do not match.");
}

function checkCourse() {
var v = d.getElementById("course").value;
if (v === "BSIT" || v === "BSCS") {
return flag("course", "courseError", "");
}
return flag("course", "courseError", "Please pick a course.");
}

function checkTerms() {
if (d.getElementById("terms").checked) {
return flag("terms", "termsError", "");
}
return flag("terms", "termsError", "You need to agree to the terms.");
}

var checkList = [checkName, checkStudent, checkEmail, checkMobile, checkPass, checkConfirm, checkCourse, checkTerms];

form.addEventListener("submit", function (e) {
e.preventDefault();

var good = true;
for (var i = 0; i < checkList.length; i++) {
if (checkList[i]() === false) {
good = false;
}
}

if (good) {
d.getElementById("summaryName").textContent = d.getElementById("fullName").value.trim();
d.getElementById("summaryStudentNumber").textContent = d.getElementById("studentNumber").value.trim();
d.getElementById("summaryEmail").textContent = d.getElementById("email").value.trim();
d.getElementById("summaryMobileNumber").textContent = d.getElementById("mobileNumber").value.trim();
d.getElementById("summaryCourse").textContent = d.getElementById("course").value;
d.getElementById("registrationSummary").hidden = false;
d.getElementById("successMessage").textContent = "Registration details validated successfully!";
}
});

d.getElementById("password").addEventListener("input", function () {
var pw = d.getElementById("password").value;
if (pw === "") {
d.getElementById("passwordFeedback").textContent = "";
} else if (isValidPassword(pw)) {
d.getElementById("passwordFeedback").textContent = "Strong password.";
} else {
d.getElementById("passwordFeedback").textContent = "Needs 8+ chars, uppercase, number and @ $ or !.";
}
});

d.getElementById("fullName").addEventListener("blur", checkName);
d.getElementById("course").addEventListener("change", checkCourse);
d.getElementById("terms").addEventListener("change", checkTerms);

d.getElementById("studentNumber").addEventListener("input", function () {
if (d.getElementById("studentNumberError").textContent !== "") checkStudent();
});
d.getElementById("email").addEventListener("input", function () {
if (d.getElementById("emailError").textContent !== "") checkEmail();
});
d.getElementById("mobileNumber").addEventListener("input", function () {
if (d.getElementById("mobileNumberError").textContent !== "") checkMobile();
});
d.getElementById("confirmPassword").addEventListener("input", function () {
if (d.getElementById("confirmPasswordError").textContent !== "") checkConfirm();
});

form.addEventListener("reset", function () {
var boxes = ["fullNameError", "studentNumberError", "emailError", "mobileNumberError", "passwordError", "confirmPasswordError", "courseError", "termsError"];
for (var i = 0; i < boxes.length; i++) {
d.getElementById(boxes[i]).textContent = "";
}
var inputs = ["fullName", "studentNumber", "email", "mobileNumber", "password", "confirmPassword", "course", "terms"];
for (var j = 0; j < inputs.length; j++) {
d.getElementById(inputs[j]).setAttribute("aria-invalid", "false");
}
var sums = ["summaryName", "summaryStudentNumber", "summaryEmail", "summaryMobileNumber", "summaryCourse"];
for (var k = 0; k < sums.length; k++) {
d.getElementById(sums[k]).textContent = "";
}
d.getElementById("passwordFeedback").textContent = "";
d.getElementById("successMessage").textContent = "";
d.getElementById("registrationSummary").hidden = true;
});
}

if (typeof module !== "undefined" && module.exports) {
module.exports = { isValidStudentNumber: isValidStudentNumber, isValidPassword: isValidPassword };
}
