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

export const getAllHospitalsFromCity = async (req, res) => {
     try {
          
          const deletedHospital = await Hospital
               .findByIdAndDelete(req.body.hospitalId);


          console.log(deletedHospital);
          const hospitals = await Hospital.find({city: req.params.city});
          if(!hospitals){
               return res.status(404).json({
                    message: 'Cities not found'
               });
          }
          res.json({
               hospitals
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: error
          });
     }
}

export const getAllCitiesForSorting = async (req, res) => {
     try {
          const cities = await Hospital.distinct('city');
          if(!cities){
               return res.status(404).json({
                    message: 'Cities not found'
               });
          }
          res.json({
               cities
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               message: error
          });
     }
}

