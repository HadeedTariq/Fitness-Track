"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
const calculateBmi = (weight, height) => {
    let weightInKg = Number(weight.split(" ")[0]);
    let feet = Number(height.split(" ")[0].split(".")[0]);
    let inches = Number(height.split(" ")[0].split(".")[1] || 0);
    let heightInCm = feetAndInchesToCentimeters(feet, inches);
    const bmi = weightInKg / ((heightInCm / 100) * (heightInCm / 100));
    return String(bmi);
};
exports.calculateBmi = calculateBmi;
function feetAndInchesToCentimeters(feet, inches) {
    const totalInches = feet * 12 + inches;
    const centimeters = totalInches * 2.54;
    return centimeters;
}
//# sourceMappingURL=bmiCalculator.js.map