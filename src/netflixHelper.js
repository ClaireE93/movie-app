// // ****************************************
// // Code     : NetflixRoulette JavaScript API Wrapper
// // Author   : Alex Camilleri
// // ****************************************
// // Created  : 25/04/2014
// // ****************************************
//
// // (function (namespace) {
// //     'use strict'
// //     var API_URL = "http://netflixroulette.net/api/api.php?";
// //
// //     namespace.createRequest = function (requestData, callback, parseAsXml) {
// //         parseAsXml = !! parseAsXml;
// //         if (typeof callback !== 'function') {
// //             throw new Error("The callback parameter was not a function");
// //         }
// //         var queryString = "type=" + (parseAsXml ? "xml" : "json");
// //         if (typeof requestData === 'string') {
// //             queryString += "&title=" + requestData;
// //         } else if (typeof requestData === 'object' && requestData.hasOwnProperty("title")) {
// //             queryString += "&title=" + requestData.title;
// //
// //             if (requestData.hasOwnProperty("year")) {
// //                 queryString += "&year=" + requestData.year;
// //             }
// //         } else {
// //             throw new Error("I don't know how to handle " + requestData);
// //         }
// //
// //         var httpReq = new XMLHttpRequest();
// //         httpReq.open("GET", API_URL + queryString.replace(/\s/ig, "%20"), true);
// //         httpReq.onreadystatechange = function () {
// //             if (httpReq.readyState !== 4) {
// //                 return;
// //             }
// //
// //             if (httpReq.status !== 200) {
// //                 throw new Error("Unexpected HTTP Status Code (" + httpReq.status + ")");
// //             }
// //
// //             callback(parseAsXml ? new DOMParser()
// //                 .parseFromString(httpReq.responseText, "text/xml") : JSON.parse(httpReq.responseText));
// //         };
// //         httpReq.send();
// //     };
// //
// // })(window.netflixroulette || (window.netflixroulette = {}));
//
// // Examples
//
// // Requesting by title only
// // netflixroulette.createRequest("Breaking Bad", function (resp) {
// //     console.log("Breaking Bad's Summary = " + resp.summary);
// // });
// //
// // // XML Response, resp is a document object
// // netflixroulette.createRequest({
// //     title: "The Boondocks",
// //     year: 2005
// // }, function (resp) {
// //     console.log("The Boondocks' Summary = " + resp.querySelector("netflixroulette summary").innerHTML);
// // }, true);
// //
// // // JSON Response, resp is a JSON object
// // netflixroulette.createRequest({
// //     title: "The Boondocks",
// //     year: 2005
// // }, function (resp) {
// //     console.log("The Boondocks' Summary = " + resp.summary);
// // });
//
//
// module.exports.netflixHelper = function (namespace) {
//     'use strict'
//     var API_URL = "http://netflixroulette.net/api/api.php?";
//     namespace = window.netflixroulette;
//
//     namespace.createRequest = function (requestData, callback, parseAsXml) {
//         parseAsXml = !! parseAsXml;
//         if (typeof callback !== 'function') {
//             throw new Error("The callback parameter was not a function");
//         }
//         var queryString = "type=" + (parseAsXml ? "xml" : "json");
//         if (typeof requestData === 'string') {
//             queryString += "&title=" + requestData;
//         } else if (typeof requestData === 'object' && requestData.hasOwnProperty("title")) {
//             queryString += "&title=" + requestData.title;
//
//             if (requestData.hasOwnProperty("year")) {
//                 queryString += "&year=" + requestData.year;
//             }
//         } else {
//             throw new Error("I don't know how to handle " + requestData);
//         }
//
//         var httpReq = new XMLHttpRequest();
//         httpReq.open("GET", API_URL + queryString.replace(/\s/ig, "%20"), true);
//         httpReq.onreadystatechange = function () {
//             if (httpReq.readyState !== 4) {
//                 return;
//             }
//
//             if (httpReq.status !== 200) {
//                 throw new Error("Unexpected HTTP Status Code (" + httpReq.status + ")");
//             }
//
//             callback(parseAsXml ? new DOMParser()
//                 .parseFromString(httpReq.responseText, "text/xml") : JSON.parse(httpReq.responseText));
//         };
//         httpReq.send();
//     };
//
// }
