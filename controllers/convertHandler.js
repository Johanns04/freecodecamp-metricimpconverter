function ConvertHandler() {
  
  this.getNum = function(input) {
	const regNum = /^(\d*\.?\d*\/\d*\.?\d*|\d*\.?\d+|\d*)([a-z]*|\b)$/gi;
	if(!regNum.test(input)){
		return 'invalid number';
	}	
	
	let regDigit = /\d*\.?\d*\/\d*\.?\d*|\d*\.?\d*/;
	let result = input.match(regDigit);
	let initNum = 0;

	if(result[0] === ''){
		return 1;
	}
	
	if( /\d*\.?\d*\/\d*\.?\d*/.test(result[0]) ){
		let num = result[0].match(/^(\d+\.?\d*)/g);
		let deNum = result[0].match(/(\d+\.?\d*)$/g);
		initNum = Math.round((Number(num)/Number(deNum))*100000)/100000;
		
		return initNum;
	}
	if(/\d*\.\d*/.test(result[0])){
		initNum = Math.round(Number(result[0])*100000)/100000;
		
		return initNum;
	}
	
	return Number(result[0]);
  };
  
  this.getUnit = function(input) {
	const regUnit = /(\b|\d+)(gal|l|mi|km|lbs|kg)$/gi;
	
	if(!regUnit.test(input)){
		return 'invalid unit';
	}
	
    let result = input.match(/[A-Za-z]+/g);
	
	if(result[0] === 'l' || result[0] === 'L'){
		return 'L';
	}else{
		return result[0].toLowerCase();
	}
	
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = '';
	
	switch(initUnit){
		case 'kg':
			result = 'lbs';
			break;
		case 'gal':
			result = 'L';
			break;
		case 'L':
			result = 'gal';
			break;
		case 'mi':
			result = 'km';
			break;
		case 'lbs':
			result = 'kg';
			break;
		case 'km':
			result = 'mi';
			break;
	}
	
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = "";
		switch(unit){
			case 'kg':
				result = 'kilograms';
				break;
			case 'gal':
				result = 'gallons';
				break;
			case 'L':
				result = 'liters';
				break;
			case 'mi':
				result = 'miles';
				break;
			case 'lbs':
				result = 'pounds';
				break;
			case 'km':
				result = 'kilometers';
				break;
		}
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
	let result = 0;
	switch(initUnit){
		case 'gal':
			result = initNum*galToL;
			break;
		case 'L':
			result = initNum/galToL;
			break;
		case 'lbs':
			result = initNum*lbsToKg;
			break;
		case 'kg':
			result = initNum/lbsToKg;
			break;
		case 'mi':
			result = initNum*miToKm;
			break;
		case 'km':
			result = initNum/miToKm;
			break;
	}
	
	result = Math.round(result*100000)/100000;
	
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum +" "+ this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    
    return result;
  };
  
}

module.exports = ConvertHandler;
