const rover = require("../utils/rover");

describe("testing rover module", () => {
  test("testing new orientation", () => {
    expect(
      rover.getNewOrientation({ orientation: "N", instruction: "R" })
    ).toBe("E");
    expect(
      rover.getNewOrientation({ orientation: "E", instruction: "R" })
    ).toBe("S");
    expect(
      rover.getNewOrientation({ orientation: "S", instruction: "R" })
    ).toBe("W");
    expect(
      rover.getNewOrientation({ orientation: "W", instruction: "R" })
    ).toBe("N");
    expect(
      rover.getNewOrientation({ orientation: "N", instruction: "L" })
    ).toBe("W");
    expect(
      rover.getNewOrientation({ orientation: "W", instruction: "L" })
    ).toBe("S");
    expect(
      rover.getNewOrientation({ orientation: "S", instruction: "L" })
    ).toBe("E");
    expect(
      rover.getNewOrientation({ orientation: "E", instruction: "L" })
    ).toBe("N");
  });

  test("testing new position when the instruction is move", () => {
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 3,
        y: 3,
        orientation: "N",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 3,
      y: 4,
      orientation: "N",
    });
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 3,
        y: 3,
        orientation: "E",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 4,
      y: 3,
      orientation: "E",
    });
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 3,
        y: 3,
        orientation: "S",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 3,
      y: 2,
      orientation: "S",
    });
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 3,
        y: 3,
        orientation: "W",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 2,
      y: 3,
      orientation: "W",
    });
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 0,
        y: 0,
        orientation: "S",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 0,
      y: 0,
      orientation: "S",
    });
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 0,
        y: 0,
        orientation: "W",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 0,
      y: 0,
      orientation: "W",
    });
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 5,
        y: 5,
        orientation: "N",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 5,
      y: 5,
      orientation: "N",
    });
    expect(
      rover.getNewPosition({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 5,
        y: 5,
        orientation: "E",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 5,
      y: 5,
      orientation: "E",
    });
  });

  test("testing the instruction process", () => {
    expect(
      rover.roverInstructionProcess({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 3,
        y: 3,
        orientation: "N",
        instruction: "R",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 3,
      y: 3,
      orientation: "E",
    });
    expect(
      rover.roverInstructionProcess({
        plateauWidth: 5,
        plateauHeight: 5,
        x: 3,
        y: 3,
        orientation: "N",
        instruction: "M",
      })
    ).toStrictEqual({
      plateauWidth: 5,
      plateauHeight: 5,
      x: 3,
      y: 4,
      orientation: "N",
    });
  });

  test("testing get plateau dimensions", () => {
    expect(rover.getPlateauDimensions({ line: "Plateau:4 5" })).toStrictEqual({
      plateauWidth: 4,
      plateauHeight: 5,
    });
  });

  test("testing get rover landing", () => {
    expect(
      rover.getRoverLanding({ line: "Rover1 Landing:1 2 N" })
    ).toStrictEqual({
      roverName: "Rover1",
      x: 1,
      y: 2,
      orientation: "N",
    });
  });

  test("testing get rover instructions", () => {
    expect(
      rover.getRoverInstructions({ line: "Rover1 Instructions:LMLMLMLMM" })
    ).toStrictEqual({
      roverName: "Rover1",
      instructions: ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
    });
  });
});
