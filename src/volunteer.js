'use strict';

let fs = require('fs');

module.exports = Volunteer;

function Volunteer() {
    this.vols = [];
    this.load();

    return this;
}




// make protoypes for various functions

// reads our data file
Volunteer.prototype.load = function() {
    let that = this;

    fs.readFile('data/volunteers.json', 'utf8', (err,contents) => {
        console.log('loaded volunteers');
        that.vols = JSON.parse(contents);
    });
};

// writing data (ie; adding new volunteers)
Volunteer.prototype.save = function() {

    //* where & what (this.vols --> see ^ Volunteer constructor)
    //* we'll need to call *save* whenever we make changes to this.vols
    fs.writeFile('data/volunteers.json', JSON.stringify(this.vols));
}

// creates new volunteer upon signing up (assigns id)
Volunteer.prototype.create = function(vol) {
    vol.id = this.vols.length++;

    this.vols.push(vol);
};


Volunteer.prototype.getAll = function() {
  return this.vols;
}
