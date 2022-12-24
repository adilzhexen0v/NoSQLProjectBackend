import DoctorModel from "../models/Doctor.js";

export const getAllDoctors = async(req, res) => { 
     try {
          const doctors = await DoctorModel.find({}, {_id: 0, name: 1, surname: 1, occupation: 1, workExperience: 1});
          res.json(doctors);
     } catch (error) {
          console.log(error);
     }
};