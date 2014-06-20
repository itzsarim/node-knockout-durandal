/**
 * Created by sarim on 6/12/14.
 */
// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {
    var ko = require('knockout');

   var http= require('plugins/http');
   var access_token;

    // Constructor function for this module

    function ShareView() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;
        self.storeImg = ko.observableArray([]);

        //if redirected from authenticate
        if(location.search)
        {

            access_token=location.search.substring(1);

            //caller makes the first call to get all the items in the clients sharefile home
            http.post('/caller',{ header: {'Authorization': 'Bearer ' + access_token}}).then(function(data){
                var size=data.Children.length;
                for(i=0;i<size;i++){

                    //display only images
                    if(data.Children[i].PreviewStatus=='CanImgThumb')

                    //initiate the download API
                        http.post('/download',{id:data.Children[i].Id , header: {'Authorization': 'Bearer ' + access_token}}).then(function(data){

                            self.storeImg.push(data.DownloadUrl);

                        }).fail(console.warn.bind(console));
                }//for ends


            }).fail(console.warn.bind(console));
        }


        redirect=function(){
            window.location.href='#/authenticate';
        }





    }

    // This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = ShareView;
});