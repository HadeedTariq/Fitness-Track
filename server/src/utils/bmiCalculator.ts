export const calculateBmi = (weight: string, height: string) => {
  let weightInKg = Number(weight.split(" ")[0]);
  let feet = Number(height.split(" ")[0].split(".")[0]);
  let inches = Number(height.split(" ")[0].split(".")[1] || 0);
  let heightInCm = feetAndInchesToCentimeters(feet, inches);
  const bmi = weightInKg / ((heightInCm / 100) * (heightInCm / 100));
  return String(bmi);
};

function feetAndInchesToCentimeters(feet: number, inches: number) {
  const totalInches = feet * 12 + inches;
  const centimeters = totalInches * 2.54;
  return centimeters;
}
