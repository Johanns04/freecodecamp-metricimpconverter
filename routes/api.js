'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
 
module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  
   app.route('/api/convert')
	.get((req, res)=>{
		let input = req.query.input.toLowerCase();

		let initNum = convertHandler.getNum(input);
		let initUnit = convertHandler.getUnit(input);
		
		if(initNum === 'invalid number' && initUnit === 'invalid unit'){
			return res.json("invalid number and unit");
		}else if(initNum === 'invalid number'){
			return res.json("invalid number");
		}else if(initUnit === 'invalid unit'){
			return res.json("invalid unit");
		}
		
		let returnUnit = convertHandler.getReturnUnit(initUnit);
		let returnNum = convertHandler.convert(initNum, initUnit);
		let str = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

		let result = {
			initNum: initNum,
			initUnit: initUnit,
			returnNum: returnNum,
			returnUnit: returnUnit,
			string: str
		};
			
		return res.json(result);
	});

};
