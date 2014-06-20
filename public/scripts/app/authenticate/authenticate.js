/**
 * Created by sarim on 6/18/14.
 */
// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {
    var ko = require('knockout');

    var http= require('plugins/http');

    // Constructor function for this module

    function authenticate() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;
        var uname;
        var pwd;
        var i;
        self.storeImg = ko.observableArray([]);
        var access_token;

        getform=function()
        {
             uname=document.getElementById('email').value;
             pwd=document.getElementById('password').value;
             oauth(uname,pwd);

        }

        //make oauth connection and get access token
        oauth=function(uname,pwd){
            http.post('/login', {username: uname, password: pwd}).then(function(data){
                console.log('returned ', data.access_token);
                access_token=data.access_token;
                redirect();
            });

        }

        redirect=function(){
            window.location.href="/?"+access_token;
        }


    }

    // This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = authenticate;
});