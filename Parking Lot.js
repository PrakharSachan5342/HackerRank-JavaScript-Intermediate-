'use strict';
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
  return inputString[currentLine++];
}

class ParkingLot {
    constructor(slots) {
        this.slots = slots;
        this.parkingSlots = new Array(slots).fill(null);
    }

    park(carId) {
        const emptySlotIndex = this.parkingSlots.findIndex(slot => slot === null);
        if (emptySlotIndex !== -1) {
            this.parkingSlots[emptySlotIndex] = carId;
            return true;
        }
        return false;
    }

    getSlots() {
        return this.parkingSlots;
    }

    remove(carId) {
        const carIndex = this.parkingSlots.findIndex(slot => slot === carId);
        if (carIndex !== -1) {
            this.parkingSlots[carIndex] = null;
            return true;
        }
        return false;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const numberOfSlots = parseInt(readLine().trim());
    const parkingLotObj = new ParkingLot(numberOfSlots);
    ws.write(`Parking Lot created with number of slots as ${numberOfSlots}\n`);
    
    let numberOfOperations = parseInt(readLine().trim());
    while (numberOfOperations-- > 0) {
        const inputs = readLine().trim().split(' ');
        const operation = inputs[0];
        const carId = inputs[1];

        switch(operation) {
            case 'Park':
                if (parkingLotObj.park(carId)) {
                    ws.write(`Parking Started: ${carId}\n`);
                } else {
                    ws.write(`Parking Full: ${carId}\n`);
                }
                break;
            case 'Remove':
                if (parkingLotObj.remove(carId)) {
                    ws.write(`Car id ${carId} removed from parking\n`);
                } else {
                    ws.write(`Car: ${carId} not found\n`);
                }
                break;
            case 'GetSlots':
                const status = parkingLotObj.getSlots();
                status.forEach((obj, i) => {
                    if (obj) {
                        ws.write(`Parked at slot ${i + 1}: ${obj}\n`);
                    } else {
                        ws.write(`Slot ${i + 1} is empty\n`);
                    }
                })
                break;
            default:
                break;
        }
    }
    ws.end();
}

This code completes the implementation of the `ParkingLot` class with the `park`, `getSlots`, and `remove` methods.
It also includes the logic in the `main` function to perform parking, removal, and slot status operations based on the input commands and write the corresponding output.
