angular.module('mobileApp').directive('mySharedScope', function() {

    return {
        template: 'Name: Super Duper Delicious'
    };
})
//var app = angular.module('mobileApp', []);
//    .directive('ngFormatPhone', function() {
//        return {
//            restrict: 'A',
//            link: function(scope, element, attrs) {
//                console.log("XXX");
//            }
//        }
//    });

    //.directive('ngFormatPhone', [
    //    function () {
    //        return {
    //            require: 'ngModel',
    //            restrict: 'A',
    //            link: function (scope, elem, attrs, ctrl, ngModel) {
    //                console.log("ERW");
    //                elem.add(phonenumber).on('keyup', function () {
    //                    var origVal = elem.val().replace(/[^\w\s]/gi, '');
    //                    if (origVal.length === 10) {
    //                        var str = origVal.replace(/(.{3})/g, "$1-");
    //                        var phone = str.slice(0, -2) + str.slice(-1);
    //                        jQuery("#phonenumber").val(phone);
    //                    }
    //
    //                });
    //            }
    //        };
    //    }
    //]);