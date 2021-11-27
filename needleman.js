var nj = require('numjs');

/*
function getColumn(anArray, columnNumber) {
  return anArray.map(function(row) {
      return row[columnNumber];
  });
}

function getRow(rowNumber, anArray) {
  return anArray.map(function(column) {
      return column[rowNumber];
  });
}
*/

/*
function jsLinspace(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}
*/


function createArray(length) {
    var arr = new Array(length || 0).fill(0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function nw(x, y, match = 1, mismatch = 1, gap = 1) {
    let nx = x.length;
    let ny = y.length;
    let start = 0;

    // Score optimal a chaque paire de caractères
    let F = createArray(nx + 1, ny + 1);
    for (let i = 0; i < ny + 1; i++) {
        F[0][i] = start;
        start--;
    }
    start = 0;
    for (let j = 0; j < nx + 1; j++) {
        F[j][0] = start;
        start--;
    }
    // Pointeurs de l'alignement optimal
    let P = createArray(nx + 1, ny + 1);
    for (let k = 0; k < nx + 1; k++) {
        P[k][0] = 3;
    }
    for (let l = 0; l < ny + 1; l++) {
        P[0][l] = 4;
    }

    // Scores temporaires
    let t = new Array(3).fill(0);

    for (var i = 0; i < nx.length; i++) {
        for (var j = 0; j < ny.length; j++) {
            if (x[i] == y[j]) {
                t[0] = F[i][j] + match;
            } else {
                t[0] = F[i][j] - mismatch;
            }

            t[1] = F[i][j + 1] - gap;
            t[2] = F[i + 1][j] - gap;
            tmax = Math.max(t);
            console.log(tmax);

            F[i + 1][j + 1] = tmax;
            if (t[0] == tmax) {
                P[i + 1][j + 1] += 2;
            }
            if (t[1] == tmax) {
                P[i + 1][j + 1] += 3;
            }
            if (t[2] == tmax) {
                P[i + 1][j + 1] += 4;
            }
        }
    }

    console.log(P);

    let i_ = nx;
    let j_ = ny;
    let rx = new Array();
    let ry = new Array();
    /*
    const array1 = [2, 5, 6, 9];
    const array2 = [3, 5, 7, 9];
    const array3 = [4, 6, 7, 9];
    */
    while (i_ > 0 || j_ > 0) {
        if (P[i_][j_] === 2 || P[i_][j_] === 5 || P[i_][j_] === 6 || P[i_][j_] === 9) {
            rx.push(x[i_ - 1]);
            ry.push(y[j_ - 1]);
            i_ -= 1;
            j_ -= 1;
            console.log("I'M IN !!!!!")
        } else if (P[i_][j_] === 3 || P[i_][j_] === 5 || P[i_][j_] === 7 || P[i_][j_] === 9) {
            rx.push(x[i_ - 1]);
            ry.push('-');
            i_ -= 1;
        } else if (P[i_][j_] === 4 || P[i_][j_] === 6 || P[i_][j_] === 7 || P[i_][j_] === 9) {
            rx.push('-');
            ry.append(y[j_ - 1]);
            j_ -= 1;
        } else {
            break;
        }
    }

    rx_ = reverseString(rx);
    ry_ = reverseString(ry);
    return ([rx_, ry_]);
}

let x = "GATTACA";
let y = "GCATGCU";

console.log(nw(x, y));