#!/usr/bin/env node

import lineByLine from "n-readlines";
import { Command } from "commander/esm.mjs";
import {
  getPlateauDimensions,
  getRoverLanding,
  getRoverInstructions,
  roverInstructionProcess,
} from "./rover.js";

const program = new Command();

program.option("-f, --file <file path>", "get rovers input data from a file");
program.parse(process.argv);

const options = program.opts();
if (options.file) {
  const liner = new lineByLine(`${options.file}`);

  var line;
  var lineNumber = 0;
  var plateauWidth;
  var plateauHeight;
  var roverLanding;
  var roverInstructions;

  while ((line = liner.next())) {
    if (lineNumber === 0) {
      const plateauDimensions = getPlateauDimensions({
        line: line.toString("ascii"),
      });
      plateauWidth = plateauDimensions.plateauWidth;
      plateauHeight = plateauDimensions.plateauHeight;
    } else {
      if (lineNumber % 2 !== 0) {
        roverLanding = getRoverLanding({
          line: line.toString("ascii"),
        });
      } else {
        roverInstructions = getRoverInstructions({
          line: line.toString("ascii"),
        });
        var roverData = {
          x: roverLanding.x,
          y: roverLanding.y,
          orientation: roverLanding.orientation,
        };

        for (
          let index = 0;
          index < roverInstructions.instructions.length;
          index++
        ) {
          roverData = roverInstructionProcess({
            plateauWidth,
            plateauHeight,
            x: roverData.x,
            y: roverData.y,
            orientation: roverData.orientation,
            instruction: roverInstructions.instructions[index],
          });
        }

        console.log(
          `${roverLanding.roverName}:${roverData.x} ${roverData.y} ${roverData.orientation}`
        );
      }
    }

    lineNumber++;
  }
}
