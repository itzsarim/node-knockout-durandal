// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {
    var ko = require('knockout');


    // Constructor function for this module
    function HomeView() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;

        // This value will be data-bound to the references in HomeView.html:
        self.rules = 1;





    }

    return{
        ink : function() {
            var self=this;
            self.storeImg= ko.observableArray([]);
            var display=document.getElementById("read-input");
            var input;
            var i;
            var temp;
            var output = document.getElementById("read-result");

            filepicker.setKey('Ap77I2pzFRheK8Ks3bPEzz');
            filepicker.pickMultiple({
                    mimetypes: ['image/*', 'text/plain'],
                    container: 'window',
                    services: ['COMPUTER', 'FACEBOOK', 'GMAIL', 'DROPBOX']
                },
                function (InkBlob) {
                    console.log(JSON.stringify(InkBlob));
                    input=InkBlob;

                    if (!input) {
                        console.log("Choose an image to read below");
                    } else {
                        for(i=0;i<input.length;i++)
                        filepicker.read(input[i], {base64encode: true},
                            function(imgdata){
 //                               output.src='data:image;base64,'+imgdata;
                                temp='data:image;base64,'+imgdata;
                                  self.storeImg.push(temp);
                                console.log("Read successful "+ self.storeImg()[0]);
                            }, function(fperror) {
                                console.log(fperror.toString());
                            }
                        );
                    }
                },
                function (FPError) {
                    console.log(FPError.toString());
                }
            );


        }


    }

    // This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = HomeView;

function imageStore(url){
    var self=this;
    self.url=url;
}

function setImageUrl()
{
    imageStore(storeImg[0])
}

ko.applyBindings(new setImageUrl());



});

