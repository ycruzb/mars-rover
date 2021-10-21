type Orientation = "N" | "E" | "S" | "W";

interface IRoverData {
  plateauWidth: number;
  plateauHeight: number;
  x: number;
  y: number;
  orientation: Orientation;
}

interface IgetNewPosition {
  plateauWidth: number;
  plateauHeight: number;
  x: number;
  y: number;
  orientation: Orientation;
  lastPositions: {
    x: number;
    y: number;
  }[];
}

interface IisInsidePlateau {
  plateauWidth: number;
  plateauHeight: number;
  x: number;
  y: number;
}

interface IRoverInstructionProcess {
  plateauWidth: number;
  plateauHeight: number;
  x: number;
  y: number;
  orientation: Orientation;
  instruction: "M" | "L" | "R";
  lastPositions: {
    x: number;
    y: number;
  }[];
}

interface IGetNewOrientation {
  orientation: Orientation;
  instruction: "L" | "R";
}

interface IInputLine {
  line: string;
}

interface IcheckLandedPositions {
  lastPositions: {
    x: number;
    y: number;
  }[];
  x: number;
  y: number;
}

export function getNewOrientation({
  orientation,
  instruction,
}: IGetNewOrientation): Orientation {
  const orientationGenerator = {
    N: {
      L: "W",
      R: "E",
    },
    E: {
      L: "N",
      R: "S",
    },
    S: {
      L: "E",
      R: "W",
    },
    W: {
      L: "S",
      R: "N",
    },
  };
  return orientationGenerator[`${orientation}`][
    `${instruction}`
  ] as Orientation;
}

export function isInsidePlateau({
  plateauWidth,
  plateauHeight,
  x,
  y,
}: IisInsidePlateau) {
  return x <= plateauWidth && x >= 0 && y >= 0 && y <= plateauHeight;
}

export function checkLandedPositions({
  lastPositions,
  x,
  y,
}: IcheckLandedPositions) {
  return (
    typeof lastPositions.find((item) => item.x === x && item.y === y) !==
    "undefined"
  );
}

export function getNewPosition({
  plateauWidth,
  plateauHeight,
  x,
  y,
  orientation,
  lastPositions,
}: IgetNewPosition) {
  var defaultParams: IRoverData = {
    plateauWidth,
    plateauHeight,
    x,
    y,
    orientation,
  };
  if (orientation === "N") {
    if (y + 1 <= plateauHeight) {
      if (!checkLandedPositions({ lastPositions, x, y: y + 1 })) {
        return {
          plateauWidth,
          plateauHeight,
          x,
          y: y + 1,
          orientation,
        };
      } else {
        return defaultParams;
      }
    } else {
      return defaultParams;
    }
  } else if (orientation === "E") {
    if (x + 1 <= plateauWidth) {
      if (!checkLandedPositions({ lastPositions, x: x + 1, y })) {
        return {
          plateauWidth,
          plateauHeight,
          x: x + 1,
          y,
          orientation,
        };
      } else {
        return defaultParams;
      }
    } else {
      return defaultParams;
    }
  } else if (orientation === "S") {
    if (y - 1 >= 0) {
      if (!checkLandedPositions({ lastPositions, x, y: y - 1 })) {
        return {
          plateauWidth,
          plateauHeight,
          x,
          y: y - 1,
          orientation,
        };
      } else {
        return defaultParams;
      }
    } else {
      return defaultParams;
    }
  } else if (orientation === "W") {
    if (x - 1 >= 0) {
      if (!checkLandedPositions({ lastPositions, x: x - 1, y })) {
        return {
          plateauWidth,
          plateauHeight,
          x: x - 1,
          y,
          orientation,
        };
      } else {
        return defaultParams;
      }
    } else {
      return defaultParams;
    }
  }
}

export function roverInstructionProcess({
  plateauWidth,
  plateauHeight,
  x,
  y,
  orientation,
  instruction,
  lastPositions,
}: IRoverInstructionProcess) {
  if (instruction === "L" || instruction === "R") {
    const newOrientation: Orientation = getNewOrientation({
      orientation,
      instruction,
    });
    return {
      plateauWidth,
      plateauHeight,
      x,
      y,
      orientation: newOrientation,
    };
  } else {
    return getNewPosition({
      plateauWidth,
      plateauHeight,
      x,
      y,
      orientation,
      lastPositions,
    });
  }
}

export function getPlateauDimensions({ line }: IInputLine) {
  var lineArr: string[] = line.split(":");
  var dimensions: string[] = lineArr[1].split(" ");
  return {
    plateauWidth: parseInt(dimensions[0]),
    plateauHeight: parseInt(dimensions[1]),
  };
}

export function getRoverLanding({ line }: IInputLine) {
  var lineArr: string[] = line.split(":");
  var roverName = lineArr[0].split(" ")[0];
  var initialData = lineArr[1].split(" ");
  return {
    roverName,
    x: parseInt(initialData[0]),
    y: parseInt(initialData[1]),
    orientation: initialData[2],
  };
}

export function getRoverInstructions({ line }: IInputLine) {
  var lineArr: string[] = line.split(":");
  var roverName = lineArr[0].split(" ")[0];
  var instructionsData = lineArr[1].split("");
  return {
    roverName,
    instructions: instructionsData,
  };
}
