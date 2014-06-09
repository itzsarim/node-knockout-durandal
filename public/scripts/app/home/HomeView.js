// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {

    // Constructor function for this module
    function HomeView() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;

        // This value will be data-bound to the references in HomeView.html:
        self.rules = 1;





    }

    return{
        ink : function() {


            var display=document.getElementById("read-input");
            var input;
            var i;
            var output = document.getElementById("read-result");
//doesnt work            var storeImg= ko.observableArray();
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
//                        for(i=0;i<input.length;i++)
                        filepicker.read(input[0], {base64encode: true},
                            function(imgdata){
                                output.src='data:image;base64,'+imgdata;
 //for multiple files           storeImg[i] = 'data:image;base64,'+imgdata;
                                console.log("Read successful");
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





});

