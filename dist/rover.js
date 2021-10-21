export function getNewOrientation({ orientation, instruction, }) {
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
    return orientationGenerator[`${orientation}`][`${instruction}`];
}
export function isInsidePlateau({ plateauWidth, plateauHeight, x, y, }) {
    return x <= plateauWidth && x >= 0 && y >= 0 && y <= plateauHeight;
}
export function checkLandedPositions({ lastPositions, x, y, }) {
    return (typeof lastPositions.find((item) => item.x === x && item.y === y) !==
        "undefined");
}
export function getNewPosition({ plateauWidth, plateauHeight, x, y, orientation, lastPositions, }) {
    var defaultParams = {
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
            }
            else {
                return defaultParams;
            }
        }
        else {
            return defaultParams;
        }
    }
    else if (orientation === "E") {
        if (x + 1 <= plateauWidth) {
            if (!checkLandedPositions({ lastPositions, x: x + 1, y })) {
                return {
                    plateauWidth,
                    plateauHeight,
                    x: x + 1,
                    y,
                    orientation,
                };
            }
            else {
                return defaultParams;
            }
        }
        else {
            return defaultParams;
        }
    }
    else if (orientation === "S") {
        if (y - 1 >= 0) {
            if (!checkLandedPositions({ lastPositions, x, y: y - 1 })) {
                return {
                    plateauWidth,
                    plateauHeight,
                    x,
                    y: y - 1,
                    orientation,
                };
            }
            else {
                return defaultParams;
            }
        }
        else {
            return defaultParams;
        }
    }
    else if (orientation === "W") {
        if (x - 1 >= 0) {
            if (!checkLandedPositions({ lastPositions, x: x - 1, y })) {
                return {
                    plateauWidth,
                    plateauHeight,
                    x: x - 1,
                    y,
                    orientation,
                };
            }
            else {
                return defaultParams;
            }
        }
        else {
            return defaultParams;
        }
    }
}
export function roverInstructionProcess({ plateauWidth, plateauHeight, x, y, orientation, instruction, lastPositions, }) {
    if (instruction === "L" || instruction === "R") {
        const newOrientation = getNewOrientation({
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
    }
    else {
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
export function getPlateauDimensions({ line }) {
    var lineArr = line.split(":");
    var dimensions = lineArr[1].split(" ");
    return {
        plateauWidth: parseInt(dimensions[0]),
        plateauHeight: parseInt(dimensions[1]),
    };
}
export function getRoverLanding({ line }) {
    var lineArr = line.split(":");
    var roverName = lineArr[0].split(" ")[0];
    var initialData = lineArr[1].split(" ");
    return {
        roverName,
        x: parseInt(initialData[0]),
        y: parseInt(initialData[1]),
        orientation: initialData[2],
    };
}
export function getRoverInstructions({ line }) {
    var lineArr = line.split(":");
    var roverName = lineArr[0].split(" ")[0];
    var instructionsData = lineArr[1].split("");
    return {
        roverName,
        instructions: instructionsData,
    };
}
