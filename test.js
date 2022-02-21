const chai = require('chai');
    const chaiHttp = require('chai-http');

    const should = chai.should();
    var mysql = require("mysql");

    var server = require('../server/index.js');
    var conn=require("../config/db.js");

    var Reciepe = require("../api/models/foodReciepeModel");

    describe('FoodReceipeAPI', function(){
        it('should Register user, login user, check token and delete a todo on /todo/<id> DELETE', function(done) {
            chai.request(server)

            .post('auth/register')

            .send({
                'name':'basak',
                'surname':'keskinoglu',
                'password':'passbasak',
                'mail':'mailbasak'
            }).end((err,res)=>{

                res.should.have.status(201);

                chai.request(server)
                        .post('/auth/sign_in')

                        .send({
                            'mail': 'mailbasak',
                            'password': 'passbasak'
                        }) 
                        .end((err, res) => {
                            console.log('this runs the login part');
                            res.body.should.have.property('token');
                            var token = res.body.token;

                            chai.request(server)
                                .get('/todos')
                                .end(function(err, res) {
                                    chai.request(server)
                                        .delete('/todo/' + res.body[0]._id)

                                        .set('Authorization', 'JWT ' + token)
                                        .end(function(error, resonse) {
                                            resonse.should.have.status(200);
                                            resonse.body.should.have.property('message');
                                            resonse.body.message.should.equal('Authorized User, Action Successful!');
                                            done();
                                        });
                                })
                        })
            
            })
        })
    })