"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var file_saver_1 = require("file-saver");
var ICS = (function () {
    function ICS(filename, dtstamp, dtstart, dtend, summary, description, location) {
        this.dtstamp = {};
        this.dtstart = {};
        this.dtend = {};
        this.filename = filename;
        this.dtstamp = dtstamp;
        this.dtstart = dtstart;
        this.dtend = dtend;
        this.summary = summary;
        this.description = description;
        this.location = location;
    }
    ICS.prototype.getIcs = function () {
        this.filename = this.putIcsExtension();
        this.dtstampStr = this.formatDate(this.dtstamp);
        this.dtstartStr = this.formatDate(this.dtstart);
        this.dtendStr = this.formatDate(this.dtend);
        var response = this.constructIcsEvent();
        var blob = new Blob([response._body], { type: 'text/plain' });
        file_saver_1.saveAs(blob, this.filename);
    };
    ICS.prototype.getIcsWithTimezone = function () {
        this.filename = this.putIcsExtension();
        this.dtstampStr = this.formatDateWithTimezone(this.dtstamp);
        this.dtstartStr = this.formatDateWithTimezone(this.dtstart);
        this.dtendStr = this.formatDateWithTimezone(this.dtend);
        var response = this.constructIcsWithTimezone();
        var blob = new Blob([response._body], { type: 'text/plain' });
        file_saver_1.saveAs(blob, this.filename);
    };
    ICS.prototype.putIcsExtension = function () {
        var filename = this.filename + ".ics";
        return filename;
    };
    ICS.prototype.formatDate = function (dateUTC) {
        var datetime = new Date(dateUTC);
        // const year = datetime.getFullYear();
        // let month = this.setMonthIcsIndex(datetime.getMonth()); // first month: 0
        // let day = datetime.getDate();
        // let hours = this.setUtcTimezone(datetime.getHours()); 
        // let minutes = datetime.getMinutes();
        // let seconds = datetime.getSeconds();
        // month     = this.forceTwoDigits(month);
        // day       = this.forceTwoDigits(day);
        // hours     = this.forceTwoDigits(hours);
        // minutes   = this.forceTwoDigits(minutes);
        // seconds   = this.forceTwoDigits(seconds);
        var _a = this.formatDateGeneral(dateUTC), year = _a[0], month = _a[1], day = _a[2], hours = _a[3], minutes = _a[4], seconds = _a[5];
        hours = this.setUtcTimezone(datetime.getHours());
        var result = "" + year + month + day + "T" + hours + minutes + seconds + "Z";
        return result;
    };
    ICS.prototype.formatDateWithTimezone = function (dateUTC) {
        var _a = this.formatDateGeneral(dateUTC), year = _a[0], month = _a[1], day = _a[2], hours = _a[3], minutes = _a[4], seconds = _a[5];
        var result = "" + year + month + day + "T" + hours + minutes + seconds;
        return result;
    };
    ICS.prototype.formatDateGeneral = function (dateUTC) {
        var datetime = new Date(dateUTC);
        var year = datetime.getFullYear();
        var month = this.setMonthIcsIndex(datetime.getMonth()); // first month: 0
        var day = datetime.getDate();
        var hours = datetime.getHours();
        var minutes = datetime.getMinutes();
        var seconds = datetime.getSeconds();
        month = this.forceTwoDigits(month);
        day = this.forceTwoDigits(day);
        hours = this.forceTwoDigits(hours);
        minutes = this.forceTwoDigits(minutes);
        seconds = this.forceTwoDigits(seconds);
        return [year, month, day, hours, minutes, seconds];
    };
    ICS.prototype.setMonthIcsIndex = function (month) {
        return month + 1;
    };
    ICS.prototype.setUtcTimezone = function (hours) {
        var offset = new Date().getTimezoneOffset() / 60;
        return hours + offset;
    };
    ICS.prototype.forceTwoDigits = function (dateItem) {
        if (dateItem.toString().length === 1) {
            return "0" + dateItem;
        }
        return dateItem.toString();
    };
    ICS.prototype.getTimeZone = function () {
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return timezone;
    };
    ICS.prototype.constructIcsEvent = function () {
        var response = {
            _body: "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:http://www.icalmaker.com\nBEGIN:VEVENT\nUID:http://www.icalmaker.com/event/ed803b69-b846-49c4-a321-ccfc0ba55272\nDTSTAMP:" + this.dtstampStr + "\nDTSTART:" + this.dtstartStr + "\nDTEND:" + this.dtendStr + "\nSUMMARY:" + this.summary + "\nLOCATION:" + this.location + "\nDESCRIPTION:" + this.description + "\nEND:VEVENT\nEND:VCALENDAR"
        };
        return response;
    };
    ICS.prototype.constructIcsWithTimezone = function () {
        var timezone = this.getTimeZone();
        var response = {
            _body: "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:http://www.icalmaker.com\nBEGIN:VEVENT\nUID:http://www.icalmaker.com/event/ed803b69-b846-49c4-a321-ccfc0ba55272\nDTSTAMP;TZID=" + timezone + ":" + this.dtstampStr + "\nDTSTART;TZID=" + timezone + ":" + this.dtstartStr + "\nDTEND;TZID=" + timezone + ":" + this.dtendStr + "\nSUMMARY:" + this.summary + "\nLOCATION:" + this.location + "\nDESCRIPTION:" + this.description + "\nEND:VEVENT\nEND:VCALENDAR"
        };
        return response;
    };
    return ICS;
}());
exports.ICS = ICS;
// ----- EXAMPLE ------
// BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:http://www.icalmaker.com
// BEGIN:VEVENT
// UID:http://www.icalmaker.com/event/ed803b69-b846-49c4-a321-ccfc0ba55272
// DTSTAMP:20190608T204202Z
// DTSTART:20190609T052000Z
// DTEND:20190610T063500Z
// SUMMARY:test 1
// LOCATION:Thessaloniki
// DESCRIPTION:test 1 description
// END:VEVENT
// END:VCALENDAR 
