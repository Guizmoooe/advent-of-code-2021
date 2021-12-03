type Direction = "forward" | "up" | "down";
type RawPosition = string;
type HorizontalPosition = number;
type VerticalPosition = number;
type AimPosition = number;

type DirectionInput = {
  [K in Direction]?: number;
};

export const formatRawPosition = (rawPosition: RawPosition): DirectionInput => {
  const [direction, value] = rawPosition.split(" ") as [Direction, number];
  return {
    [direction]: Number(value),
  };
};

export const formatPositions = (
  rawPositions: RawPosition[]
): DirectionInput[] => {
  return rawPositions.map((x) => formatRawPosition(x));
};

export const calculateNewXPosition = (
  currentXPosition: HorizontalPosition,
  directionInput: DirectionInput
): HorizontalPosition => {
  switch (Object.keys(directionInput)[0]) {
    case "forward":
      return currentXPosition + Object.values(directionInput)[0];
    default:
      return currentXPosition;
  }
};
export const calculateNewAimPosition = (
  depthPosition: VerticalPosition,
  aimPosition: AimPosition,
  directionInput: DirectionInput
): HorizontalPosition => {
  switch (Object.keys(directionInput)[0]) {
    case "forward":
      return (depthPosition = aimPosition * Object.values(directionInput)[0]);
    case "up":
      return aimPosition - Object.values(directionInput)[0];
    case "down":
      return aimPosition + Object.values(directionInput)[0];
    default:
      return aimPosition;
  }
};

export const calculateNewYPosition = (
  currentYPosition: VerticalPosition,
  directionInput: DirectionInput
): VerticalPosition => {
  switch (Object.keys(directionInput)[0]) {
    case "up":
      return currentYPosition - Object.values(directionInput)[0];
    case "down":
      return currentYPosition + Object.values(directionInput)[0];
    default:
      return currentYPosition;
  }
};
export const calculateFinalXPosition = (
  rawPositions: RawPosition[]
): HorizontalPosition => {
  const formattedPositions = formatPositions(rawPositions);
  let currentPosition = 0;
  const finalXPosition = formattedPositions.reduce(
    (finalXPosition, position) => {
      const newPosition = calculateNewXPosition(currentPosition, position);
      finalXPosition = newPosition;
      currentPosition = newPosition;
      return finalXPosition;
    },
    0
  );

  return finalXPosition;
};
export const calculateFinalYPosition = (
  rawPositions: RawPosition[]
): VerticalPosition => {
  const formattedPositions = formatPositions(rawPositions);
  let currentPosition = 0;
  const finalYPosition = formattedPositions.reduce(
    (finalYPosition, position) => {
      const newPosition = calculateNewYPosition(currentPosition, position);
      finalYPosition = newPosition;
      currentPosition = newPosition;
      return finalYPosition;
    },
    0
  );

  return finalYPosition;
};
export const calculateFinalDepthPosition = (
  rawPositions: RawPosition[]
): AimPosition => {
  const formattedPositions = formatPositions(rawPositions);
  let currentAimPosition = 0;
  let depthPosition = 0;
  const finalAimPosition = formattedPositions.reduce(
    (finalAimPosition, position) => {
      const newAimPosition = calculateNewAimPosition(
        depthPosition,
        currentAimPosition,
        position
      );
      if (position.forward) {
        depthPosition += newAimPosition;
      } else {
        currentAimPosition = newAimPosition;
        finalAimPosition = newAimPosition;
      }
      return depthPosition;
    },
    0
  );

  return finalAimPosition;
};

export const calculateFinalAnswer = (rawPositions: RawPosition[]): number => {
  const finalYPosition = calculateFinalYPosition(rawPositions);
  const finalXPosition = calculateFinalXPosition(rawPositions);
  return finalYPosition * finalXPosition;
};

export const calculateFinalAnswer2 = (rawPositions: RawPosition[]): number => {
  const finalXPosition = calculateFinalXPosition(rawPositions);
  const finalAimPosition = calculateFinalDepthPosition(rawPositions);
  return finalXPosition * finalAimPosition;
};
