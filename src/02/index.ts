import { inputs } from "./inputs";
import { calculateFinalAnswer, calculateFinalAnswer2 } from './positionCalculator';

const part1Res = calculateFinalAnswer(inputs);
console.log("👽CLG - part1Res", part1Res);

const part2Res = calculateFinalAnswer2(inputs);
console.log("👽CLG - part2Res", part2Res)
