#!/usr/bin/env node

import lineByLine from "n-readlines";
import { Command } from "commander/esm.mjs";
import {
  getPlateauDimensions,
  getRoverLanding,
  getRoverInstructions,
  roverInstructionProcess,
  isInsidePlateau,
  checkLandedPositions,
} from "./rover.js";

const program = new Command();

var showRover = true;

program.option("-f, --file <file path>", "get rovers input data from a file");
program.parse(process.argv);

const options = program.opts();
if (options.file) {
  const liner = new lineByLine(`${options.file}`);

  var line;
  var lineNumber = 0;
  var plateauWidth;
  var plateauHeight;
  var roverLanding = [];
  var roverInstructions = [];
  var roverCount = 0;
  var lastPositions = [];

  while ((line = liner.next())) {
    if (lineNumber === 0) {
      const plateauDimensions = getPlateauDimensions({
        line: line.toString("ascii"),
      });
      plateauWidth = plateauDimensions.plateauWidth;
      plateauHeight = plateauDimensions.plateauHeight;
    } else {
      if (lineNumber % 2 !== 0) {
        roverLanding[roverCount] = getRoverLanding({
          line: line.toString("ascii"),
        });
        showRover =
          isInsidePlateau({
            plateauWidth,
            plateauHeight,
            x: roverLanding[roverCount].x,
            y: roverLanding[roverCount].y,
          }) &&
          !checkLandedPositions({
            lastPositions,
            x: roverLanding[roverCount].x,
            y: roverLanding[roverCount].y,
          });
      } else {
        if (showRover) {
          roverInstructions[roverCount] = getRoverInstructions({
            line: line.toString("ascii"),
          });
          var roverData = {
            x: roverLanding[roverCount].x,
            y: roverLanding[roverCount].y,
            orientation: roverLanding[roverCount].orientation,
          };

          for (
            let index = 0;
            index < roverInstructions[roverCount].instructions.length;
            index++
          ) {
            roverData = roverInstructionProcess({
              plateauWidth,
              plateauHeight,
              x: roverData.x,
              y: roverData.y,
              orientation: roverData.orientation,
              instruction: roverInstructions[roverCount].instructions[index],
              lastPositions,
            });
          }

          lastPositions.push({ x: roverData.x, y: roverData.y });

          console.log(
            `${roverLanding[roverCount].roverName}:${roverData.x} ${roverData.y} ${roverData.orientation}`
          );
        }
        roverCount++;
      }
    }

    lineNumber++;
  }
}
