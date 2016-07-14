'use strict';

let fs = require('fs');

module.exports = Job;

function Job() {
    this.jobs = [];
    this.load();

    return this;
}




// make protoypes for various functions

// reads our data file
Job.prototype.load = function() {
    let that = this;

    fs.readFile('data/jobs.json', 'utf8', (err,contents) => {
        console.log('loaded jobs');
        that.jobs = JSON.parse(contents);
    });
};

// writing data (ie; adding new jobs)
Job.prototype.save = function() {

    //* where & what (this.vols --> see ^ Job constructor)
    //* we'll need to call *save* whenever we make changes to this.vols
    fs.writeFile('data/jobs.json', JSON.stringify(this.jobs));
}

// creates new job upon signing up (assigns id)
Job.prototype.create = function(job) {
    job.id = this.jobs.length++;

    this.jobs.push(job);
};


Job.prototype.getAll = function() {
  return this.jobs;
}
