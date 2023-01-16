import Hospital from "../models/Hospital.js";
export const getAllHospitals = async (req, res) => {
     try {
          const hospitals = await Hospital.find()
          if(!hospitals){
               return res.status(404).json({
                    message: 'Hospitals not found'
               });
          }
          res.json({
               hospitals
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: 'No access'
          });
     }
};