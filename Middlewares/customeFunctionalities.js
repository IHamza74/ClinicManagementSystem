const { request, response, json } = require("express");
let jwt = require("jsonwebtoken");
const appointmentScheduler = require("../Controllers/appointmentScheduler");
////////////////////////////////////////////////////////////////////////////////////////////////
//APPOINTMENTS Checking MWs//
////////////////////////////////////////////////////////////////////////////////////////////////

//preventing conflicts of appointments for one doctor
module.exports.isDoctorAvailable = async (request, response, next) => {
    try {
        let appointmentDate = new Date(request.body.date).getTime();
        let currentDate = new Date().getTime();
        // console.log(appointmentDate)
        if (currentDate > appointmentDate) {
            return response.status(406).json({ message: "You can not make an appointment in the past" });
        } else {
            let token = jwt.sign({ role: "admin" }, "AhmedTurky", { expiresIn: "1h" });
            let appointsRes = await fetch(`http://localhost:3000/appointmentScheduler?doctorID=${request.body.doctorID}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            })

            let DrAppointments = await appointsRes.json();
            let flag = 0;
            DrAppointments.forEach(appointment => {
                if (Math.abs(new Date(appointment.date) - new Date(request.body.date)) < 30 * 60000) {
                    flag = 1;
                    return response.status(406).json({ message: "the doctor is busy at this time" })
                }
            });
            if (flag == 0)
                next();
        }
    }
    catch (error) {
        next(error)
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
//Prescription Checking MWs//
////////////////////////////////////////////////////////////////////////////////////////////////
//checking of medicine wheather if it exists
module.exports.DoMedicineExist = async (request, response, next) => {
    try {
        let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY
            , { expiresIn: "1h" });
        let medicinesAsJson = await fetch(`http://localhost:3000/medicine`, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        let allDBMedicines = await medicinesAsJson.json();
        let requestMedicines = request.body.medicine;

        //getting All DB medicines ids
        let allDBmedicinesIDS = [] // contains all medicines' ids in DB
        let prescriptionMedicinesIDs = [] // contains all presicription's ids
        let notFoundMedicines = []      //not found medicines
        allDBMedicines.forEach(med => {
            allDBmedicinesIDS.push(med._id)
        })

        //getting presicription medicines id 
        requestMedicines.forEach(med => {
            prescriptionMedicinesIDs.push(med.medicineID)
        })

        //checking existance of medicine in stock
        prescriptionMedicinesIDs.forEach(medID => {
            let flag = allDBmedicinesIDS.indexOf(medID);
            if (flag == -1) {
                notFoundMedicines.push(medID);
            }
        })

        // checking overall medcines status
        if (notFoundMedicines.length == 0) {
            next();
        } else {
            return response.status(406).json({ message: "some medicines are out of stock, prescription is cancelled", medicinesIDs: notFoundMedicines })
        }
    }
    catch (error) {
        next(error)
    }
}

//checking of prescription appointment wheather if it exists or not
module.exports.doesAppointmentExist = async (request, response, next) => {
    try {
        let token = jwt.sign({ role: "admin" }, process.env.SECRET_KEY
            , { expiresIn: "1h" });
        //fetching appointment
        let appointmentStream = await fetch(`http://localhost:3000/appointmentScheduler/${request.body.appointmentId}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
        // checking overall medcines status
        let AppointmentResult = await appointmentStream.json();

        //defining path to check existance of previous invoice or prescription
        let fullPath = request.url.substring(1);
        let path = fullPath.substring(0, fullPath.indexOf);
        // console.log(path)


        // checking appointment if exist
        if (AppointmentResult._id != request.body.appointmentId) {
            return response.status(406).json({ message: "Appointment Id is not valid, process is cancelled" })
        } else {
            //checking existance of previous prescription or invoice
            let prescORinvoiceRES = await fetch(`http://localhost:3000/${path}?appointmentID=${request.body.appointmentId}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            })

            let prescORinvoice = await prescORinvoiceRES.json();
            if (prescORinvoice.length == 0)
                next();
            else {
                console.log(path)
                return response.status(406).json({ message: `this appointment id has a previous ${path},Process was cancelled` })
            }
        }
    }
    catch (error) {
        next(error)
    }
}

