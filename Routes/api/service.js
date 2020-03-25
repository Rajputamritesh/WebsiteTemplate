const https = require('https');
const express=require('express');
const router=express.Router();
const axios=require('axios');
const forEach = require("mongoose");
const mapSkeleton=require('../../models/mapSkeleton');

var apiService= {
    getCountryNames(key, cb) {
        if (key == undefined) {
            return (e, null);
        }
        console.log("key--->" + key);
        let keyword = key;
        let url = 'https://restcountries.eu/rest/v2/name/';
        let finalEndpoint = url + keyword;
        let arrObj = [];
        console.log(finalEndpoint);
        axios.get(finalEndpoint)
            .then((response) => {

                response.data.forEach(element => {
                    arrObj.push({country: element.name});
                    console.log(element.name);
                }).catch(error => {
                    console.log(error.response)
                });
                console.log(response.data[0].name);

                return cb(null, {CountryList: arrObj});
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config)
            });
    },
    postMessageMap(obj, cb) {
        console.log("here--->" + obj.latitude);

        if (!obj.name || !obj.message) {
            return cb({message: 'Please enter all fields', status: 404}, null);
        }
        if (!obj.longitude || !obj.latitude) {
            return cb({message: 'Couldnt locate you', status: 404}, null);

        }

        var {name, message, latitude, longitude} = obj;
        latitude=latitude.toString();
        longitude=longitude.toString();
        console.log(obj);
        const newMessage = new mapSkeleton({
            name: name,
            message: message,
            latitude: latitude,
            longitude: longitude
        })
        console.log(newMessage);
        newMessage.save().then(() => {
            return cb(null, {message: "Thank you for visiting", status: 200})
        });

    }

}
module.exports=apiService;
