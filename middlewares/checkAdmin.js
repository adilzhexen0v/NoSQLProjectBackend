import jwt from "jsonwebtoken";
export default (req, res, next) => {
     const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
     if(token){
          try {
               const decodedToken = jwt.verify(token, 'adminkey');
               req.userId = decodedToken._id;
               next();
          } catch (error) {
               console.log(error);
               return res.status(403).json({
                    message: 'Can not verify admin'
               });
          }
     } else{
          return res.status(403).json({
               message: 'No access admin'
          });
     }
}