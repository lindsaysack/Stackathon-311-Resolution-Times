const router = require("express").Router();
const csv = require('csvtojson'); 

router.get("/", (req, res, next) => {
  const csvFilePath = '../../public/311_Service_Requests_from_2010_to_Present.csv'
  // console.log("dsafsdfaswecdas", csvFilePath)
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      console.log(jsonObj)
      res.json("hey", jsonObj)
      
    })
    .catch(next)
  }
)

module.exports = router;
