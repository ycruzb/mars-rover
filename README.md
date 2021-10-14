# The Problem

## Mars Rover

A squad of robotic rovers are to be landed by NASA on a plateau on Mars.

This plateau, which is curiously rectangular, must be navigated by the rovers so that their on board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover's position is represented by a combination of an x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.

In order to control a rover, NASA sends a simple string of letters. The possible letters are 'L', 'R' and 'M'. 'L' and 'R' makes the rover spin 90 degrees left or right respectively, without moving from its current spot.

'M' means move forward one grid point, and maintain the same heading.

Assume that the square directly North from (x, y) is (x, y+1).

Input:

Configuration Input: The first line of input is the upper-right coordinates of the plateau, the lower-left coordinates are assumed to be 0,0.

Per Rover Input:

Input 1: Landing co-ordinates for the named Rover. The position is made up of two integers and a letter separated by spaces, corresponding to the x and y co-ordinates and the rover's orientation.

Input 2: Navigation instructions for the named rover. i.e a string containing ('L', 'R', 'M').

Test Input:
```
Plateau:5 5
Rover1 Landing:1 2 N
Rover1 Instructions:LMLMLMLMM
Rover2 Landing:3 3 E
Rover2 Instructions:MMRMMRMRRM
```

Expected Output:
```
Rover1:1 3 N
Rover2:5 1 E
```
Task:

Develop a command line app that can take the various inputs from the command line and generate the desired outputs. The application must accept a sequence of inputs from the command line or a file. Example input from file:
```
$ app < input.txt
Rover1:1 3 N
Rover2:5 1 E
$
```
See `input.txt` in this repo for a sample test input.

Expectations:

- App should be working
- Code should be modular and readable
- Unit tests
- Your choice of language is one with which you are comfortable

# The Solution

Command line app developed in Javascript that uses a rover module developed in Typescript. The rover module has all necessary methods in order to solve the rover problem.

At this time, the command line app only supports a file with the input data.

The project includes a 100% testing coverage of the rover module. 

## Main files

`dist/app.js` is the command line app implementation

`utils/rover.ts` is the rover module implementation

`dist/app.js` is the compilation of the rover module, from Typescript to Javascript

`___tests___/rover.test.js` has all the testing of the rover module implementation

`input.txt` is an example file in order to test the solution

## Local installation

1. Clone the repo

2. Install dependencies running:

```
npm i
```

3. Link the app to its own command running:

```
npm link
```

## Running the app

Run the following command and pass the file as a parameter:

`
app --file <file  path>
`

You can try with the input file included or add another one.

```
app --file input.txt
```

## Run tests

You can run the tests using the following command:

```
npm t
```

## Screenshots

![Running the command line app](https://raw.githubusercontent.com/ycruzb/mars-rover/main/screenshots/Screen%20Shot%202021-10-14%20at%2011.57.21%20AM.png)

![Running tests](https://github.com/ycruzb/mars-rover/blob/main/screenshots/Screen%20Shot%202021-10-14%20at%2011.57.47%20AM.png?raw=true)



