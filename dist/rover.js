"use strict";
export function getNewOrientation(_a) {
  var orientation = _a.orientation,
    instruction = _a.instruction;
  var orientationGenerator = {
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
  return orientationGenerator["" + orientation]["" + instruction];
}
export function getNewPosition(_a) {
  var plateauWidth = _a.plateauWidth,
    plateauHeight = _a.plateauHeight,
    x = _a.x,
    y = _a.y,
    orientation = _a.orientation;
  var defaultParams = {
    plateauWidth: plateauWidth,
    plateauHeight: plateauHeight,
    x: x,
    y: y,
    orientation: orientation,
  };
  if (orientation === "N") {
    if (y + 1 <= plateauHeight) {
      return {
        plateauWidth: plateauWidth,
        plateauHeight: plateauHeight,
        x: x,
        y: y + 1,
        orientation: orientation,
      };
    } else {
      return defaultParams;
    }
  } else if (orientation === "E") {
    if (x + 1 <= plateauWidth) {
      return {
        plateauWidth: plateauWidth,
        plateauHeight: plateauHeight,
        x: x + 1,
        y: y,
        orientation: orientation,
      };
    } else {
      return defaultParams;
    }
  } else if (orientation === "S") {
    if (y - 1 >= 0) {
      return {
        plateauWidth: plateauWidth,
        plateauHeight: plateauHeight,
        x: x,
        y: y - 1,
        orientation: orientation,
      };
    } else {
      return defaultParams;
    }
  } else if (orientation === "W") {
    if (x - 1 >= 0) {
      return {
        plateauWidth: plateauWidth,
        plateauHeight: plateauHeight,
        x: x - 1,
        y: y,
        orientation: orientation,
      };
    } else {
      return defaultParams;
    }
  }
}
export function roverInstructionProcess(_a) {
  var plateauWidth = _a.plateauWidth,
    plateauHeight = _a.plateauHeight,
    x = _a.x,
    y = _a.y,
    orientation = _a.orientation,
    instruction = _a.instruction;
  if (instruction === "L" || instruction === "R") {
    var newOrientation = getNewOrientation({
      orientation: orientation,
      instruction: instruction,
    });
    return {
      plateauWidth: plateauWidth,
      plateauHeight: plateauHeight,
      x: x,
      y: y,
      orientation: newOrientation,
    };
  } else {
    return getNewPosition({
      plateauWidth: plateauWidth,
      plateauHeight: plateauHeight,
      x: x,
      y: y,
      orientation: orientation,
    });
  }
}
export function getPlateauDimensions(_a) {
  var line = _a.line;
  var lineArr = line.split(":");
  var dimensions = lineArr[1].split(" ");
  return {
    plateauWidth: parseInt(dimensions[0]),
    plateauHeight: parseInt(dimensions[1]),
  };
}
export function getRoverLanding(_a) {
  var line = _a.line;
  var lineArr = line.split(":");
  var roverName = lineArr[0].split(" ")[0];
  var initialData = lineArr[1].split(" ");
  return {
    roverName: roverName,
    x: parseInt(initialData[0]),
    y: parseInt(initialData[1]),
    orientation: initialData[2],
  };
}
export function getRoverInstructions(_a) {
  var line = _a.line;
  var lineArr = line.split(":");
  var roverName = lineArr[0].split(" ")[0];
  var instructionsData = lineArr[1].split("");
  return {
    roverName: roverName,
    instructions: instructionsData,
  };
}
