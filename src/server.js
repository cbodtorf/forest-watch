/*********************
* NODE SERVER
*
**********************/

'use strict';

let http = require('http');
let hapi = require('hapi');
let boom = require('boom');
let inert = require('inert');

let Volunteer = require('./volunteer');
let Job = require('./job');
// volunteer and job constructor


let vol = new Volunteer();
let job = new Job();

const server = new hapi.Server();
server.connection({
  host: 'localhost',
  port: 8634
});

// this registers inert with hapi
server.register(inert, () => {});

/***********************
*  ROUTES
***********************/

// lets get all the volunteers!
server.route({
  method: 'GET',
  path: '/volunteers',

  handler(request, reply) {
    reply(vol.getAll());
  },
});

// lets get all the jobs!
server.route({
  method: 'GET',
  path: '/jobs',

  handler(request, reply) {
    reply(job.getAll());
  },
});



/***********************
*  Last route for INERT to serve up project
***********************/

// [only get requests] serve up all static files from public.
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '../public/',
      redirectToSlash: true,
      index: true
    }
  }
});



// obvi, starts the server
server.start();
