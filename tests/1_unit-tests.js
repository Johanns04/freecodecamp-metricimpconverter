const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
	test("#1 Correctly read a whole number input", () => {
		assert.strictEqual(convertHandler.getNum('12kg'), 12, "Test 1 failed.");
	});
	test("#2 Correctly read a decimal number input.", () => {
		assert.strictEqual(convertHandler.getNum('1.2kg'), 1.2, "Test 2 failed.");
	});
	test("#3 Correctly read a fractional input", () => {
		assert.strictEqual(convertHandler.getNum('1/2kg'), 0.5, "Test 3 failed.");
	});
	test("#4 Correctly read a fractional input with a decimal.", () => {
		assert.strictEqual(convertHandler.getNum('4.2/3.4kg'), 1.23529, "Test 4 failed.");
	});
	test("#5 Correctly return an error on a double-fraction", () => {
		assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number', "Test 5 failed.");
	});
	test("#6 Correctly default to 1 when no numerical input is provided", () => {
		assert.equal(convertHandler.getNum('kg'), 1, "Test 6 failed.");
	});
	test("#7 Correctly read each valid input unit", () => {
		//testing each unit
		assert.strictEqual(convertHandler.getUnit('12kg'), 'kg', "Test 7.1 failed.");
		assert.strictEqual(convertHandler.getUnit('12lbs'), 'lbs', "Test 7.2 failed.");
		assert.strictEqual(convertHandler.getUnit('12gal'), 'gal', "Test 7.3 failed.");
		assert.strictEqual(convertHandler.getUnit('12L'), 'L', "Test 7.4 failed.");
		assert.strictEqual(convertHandler.getUnit('12mi'), 'mi', "Test 7.5 failed.");
		assert.strictEqual(convertHandler.getUnit('12km'), 'km', "Test 7.6 failed.");
	});
	test("#8 Correctly return an error for an invalid input unit", () => {
		assert.strictEqual(convertHandler.getUnit('12dac'), 'invalid unit', "Test 8 failed.");
	});
	test("#9 Return the correct return unit.", () => {
		//test for each unit
		assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs',"Test 9.1 failed.");
		assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg',"Test 9.2 failed.");
		assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', "Test 9.3 failed.");
		assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal', "Test 9.4 failed.");
		assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', "Test 9.5 failed.");
		assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', "Test 9.6 failed.");
	});
	test("#10 Correctly return the spelled-out string", () => {
		//test each unit
		assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', "Test 9.1 failed.");
		assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', "Test 9.2 failed.");
		assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', "Test 9.3 failed.");
		assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters', "Test 9.4 failed.");
		assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles', "Test 9.5 failed.");
		assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', "Test 9.6 failed.");
	});
	test("#11 Correctly convert gal to L", () => {
		assert.strictEqual(convertHandler.convert(1.2, 'gal'), 4.54249, "Test 11 failed.");
	});
	test("#12 correctly convert L to gal.", () => {
		assert.strictEqual(convertHandler.convert(1.2, 'L'), 0.31701, "Test 12 failed.");
	});
	test("#13 Correctly convert mi to km.", () => {
		assert.strictEqual(convertHandler.convert(1.2, 'mi'), 1.93121, "Test 13 failed.");
	});
	test("#14 Correctly convert km to mi.", () => {
		assert.strictEqual(convertHandler.convert(1.2, 'km'), 0.74565, "Test 14 failed.");
	});
	test("#15 Correctly convert lbs to kg.", () => {
		assert.strictEqual(convertHandler.convert(1.2, 'lbs'), 0.54431, "Test 15 failed.");
	});
	test("#16 Correctly convert kg to lbs.", () => {
		assert.strictEqual(convertHandler.convert(1.2, 'kg'), 2.64555, "Test 16 failed.");
	});
	
});