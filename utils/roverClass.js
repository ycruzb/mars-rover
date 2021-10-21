class Rover {
  constructor(x, y, orientation) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }

  move() {
	if (this.orientation === "N") {
		this.y++;
	} else
	if (this.orientation === "S") {
		this.y--;
	} else
	if (this.orientation === "E") {
		this.x++;
	} else 
	if (this.orientation === "W") {
		this.x--;
	}
  }

  turn(to) {
	if (this.orientation === "N") {
		if (to === "R") {
			this.orientation = "E"
		} else {
			this.orientation = "W"
		}
	} else 
	if (this.orientation === "E") {
		if (to === "R") {
			this.orientation = "S"
		} else {
			this.orientation = "N"
		}
	} else
	if (this.orientation === "S") {
		if (to === "R") {
			this.orientation = "W"
		} else {
			this.orientation = "E"
		}
	} else
	if (this.orientation === "W") {
		if (to === "R") {
			this.orientation = "N"
		} else {
			this.orientation = "S"
		}
	}
  }
}

const rover = new Rover(2, 3, "N");
rover.turn("R")
rover.move();
rover.turn("L")
rover.turn("L")
rover.move();
rover.turn("R")

console.log(rover);
