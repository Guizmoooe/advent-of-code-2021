import {
    calculateFinalAnswer,
    calculateFinalXPosition,
    calculateFinalYPosition,
    calculateNewXPosition,
    calculateNewYPosition,
    formatPositions,
    formatRawPosition,
    calculateNewAimPosition,
    calculateFinalDepthPosition,
    calculateFinalAnswer2
} from './positionCalculator';

describe("???", () => {
  describe("part1", () => {
    it("should format forward 8 to {forward :8}", () => {
      expect(formatRawPosition("forward 8")).toMatchObject({ forward: 8 });
    });
    it("should format raw positions", () => {
      expect(formatPositions(["down 9", "forward 8"])).toStrictEqual([
        { down: 9 },
        { forward: 8 },
      ]);
    });

    it("should return new X position", () => {
      expect(calculateNewXPosition(100, { forward: 9 })).toEqual(109);
      expect(calculateNewXPosition(100, { down: 5 })).toEqual(100);
    });
    it("should return new Y position", () => {
      expect(calculateNewYPosition(100, { forward: 9 })).toEqual(100);
      expect(calculateNewYPosition(100, { down: 5 })).toEqual(105);
      expect(calculateNewYPosition(100, { up: 5 })).toEqual(95);
    });

    it("should calculate the final X position", () => {
      expect(
        calculateFinalXPosition(["forward 10", "forward 5", "down 5", "up 8"])
      ).toEqual(15);
    });
    it("should calculate the final Y position", () => {
      expect(
        calculateFinalYPosition(["forward 10", "forward 5", "down 5", "up 2"])
      ).toEqual(3);
    });

    it("should calculate the final answer", () => {
      expect(
        calculateFinalAnswer(["forward 10", "forward 5", "down 5", "up 2"])
      ).toEqual(45);
    });
  });
  describe("part2", () => {
    it("should return x position", () => {
      expect(calculateNewAimPosition(0,8, { forward: 9 })).toEqual(72);
    });
    it("should return final aim position", () => {
      expect(calculateFinalDepthPosition(["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"])).toEqual(60);
    });
    it("should calculate the final answer part 2", () => {
      expect(
        calculateFinalAnswer2(["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"])
      ).toEqual(900);
    });
  });
});
