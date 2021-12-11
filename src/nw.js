class Alignment {
    constructor(protein1, protein2) {
        this.protein1 = protein1;
        this.protein2 = protein2;
    }
}


//--------------------------------- FUNCTIONS --------------------------------//

function createArray(length) {
    var arr = new Array(length || 0).fill(0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function createMatrix(x, y, gap = -4) {
    let nx = x.length;
    let ny = y.length;
    let F = createArray(nx, ny);
    for (let i = 0; i < nx; i++) {
        F[i][0] = gap * i;
    }
    for (let j = 0; j < ny; j++) {
        F[0][j] = gap * j;
    }
    for (let i = 1; i < nx; i++) {
        for (let j = 1; j < ny; j++) {
            let Choice1 = F[i - 1][j - 1] + blossum62[x[i]][y[j]];
            let Choice2 = F[i - 1][j] + gap;
            let Choice3 = F[i][j - 1] + gap;
            F[i][j] = Math.max(Choice1, Choice2, Choice3);
        }
    }
    return F;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function nw(x, y, gap = -4) {
    x = reverseString(x.toUpperCase())
    y = reverseString(y.toUpperCase())
    F = createMatrix(x, y);
    let alignmentX = '';
    let alignmentY = '';
    i = x.length - 1;
    j = y.length - 1;
    while (i > 0 && j > 0) {
        let score = F[i][j];
        let scoreDiag = F[i - 1][j - 1];
        let scoreUp = F[i][j - 1];
        let scoreLeft = F[i - 1][j]
        if (score === scoreDiag + blossum62[x[i]][y[j]]) {
            alignmentX += x[i];
            alignmentY += y[j];
            i -= 1;
            j -= 1;
        } else if (score === scoreLeft + gap) {
            alignmentX += x[i];
            alignmentY += '-';
            i -= 1;
        } else if (score === scoreUp + gap) {
            alignmentX += '-';
            alignmentY += y[j];
            j -= 1;
        }
    }
    while (i > 0) {
        alignmentX += x[i];
        alignmentY += '-';
        i -= 1;
    }
    while (j > 0) {
        alignmentX += '-';
        alignmentY += y[j];
        j -= 1;
    }
    return [alignmentX, alignmentY];
}


// Alignment results : sequence B is aligned with sequence A

function scoreIdentity(A, B) {
    let score = 0;
    for (let i = 0; i < B.length; i++) {
        if (A[i] === B[i]) {
            score += 1;
        }
    }
    return Math.round((score / B.length) * 100);;
}

function scoreNW(A, B) {
    let score = 0;
    for (let i = 0; i < B.length; i++) {
        score += blossum62[A[i]][B[i]];
    }
    return score;
}

function gapsNumber(A, B) {
    let value = 0;
    for (let i = 0; i < B.length; i++) {
        if (A[i] === '-' || B[i] === '-') {
            value += 1;
        }
    }
    return Math.round((value / B.length) * 100);
}


//----------------------------------- MAIN -----------------------------------//

let myAlignment;

var blossum62 = {
    '-': {
        '-': 1,
        'A': -4,
        'C': -4,
        'B': -4,
        'E': -4,
        'D': -4,
        'G': -4,
        'F': -4,
        'I': -4,
        'H': -4,
        'K': -4,
        'M': -4,
        'L': -4,
        'N': -4,
        'Q': -4,
        'P': -4,
        'S': -4,
        'R': -4,
        'T': -4,
        'W': -4,
        'V': -4,
        'Y': -4,
        'X': -4,
        'Z': -4
    },

    'A': {
        '-': -4,
        'A': 4,
        'C': 0,
        'B': -2,
        'E': -1,
        'D': -2,
        'G': 0,
        'F': -2,
        'I': -1,
        'H': -2,
        'K': -1,
        'M': -1,
        'L': -1,
        'N': -2,
        'Q': -1,
        'P': -1,
        'S': 1,
        'R': -1,
        'T': 0,
        'W': -3,
        'V': 0,
        'Y': -2,
        'X': 0,
        'Z': -1
    },

    'C': {
        '-': -4,
        'A': 0,
        'C': 9,
        'B': -3,
        'E': -4,
        'D': -3,
        'G': -3,
        'F': -2,
        'I': -1,
        'H': -3,
        'K': -3,
        'M': -1,
        'L': -1,
        'N': -3,
        'Q': -3,
        'P': -3,
        'S': -1,
        'R': -3,
        'T': -1,
        'W': -2,
        'V': -1,
        'Y': -2,
        'X': -2,
        'Z': -3
    },

    'B': {
        '-': -4,
        'A': -2,
        'C': -3,
        'B': 4,
        'E': 1,
        'D': 4,
        'G': -1,
        'F': -3,
        'I': -3,
        'H': 0,
        'K': 0,
        'M': -3,
        'L': -4,
        'N': 3,
        'Q': 0,
        'P': -2,
        'S': 0,
        'R': -1,
        'T': -1,
        'W': -4,
        'V': -3,
        'Y': -3,
        'X': -1,
        'Z': 1
    },

    'E': {
        '-': -4,
        'A': -1,
        'C': -4,
        'B': 1,
        'E': 5,
        'D': 2,
        'G': -2,
        'F': -3,
        'I': -3,
        'H': 0,
        'K': 1,
        'M': -2,
        'L': -3,
        'N': 0,
        'Q': 2,
        'P': -1,
        'S': 0,
        'R': 0,
        'T': -1,
        'W': -3,
        'V': -2,
        'Y': -2,
        'X': -1,
        'Z': 4
    },

    'D': {
        '-': -4,
        'A': -2,
        'C': -3,
        'B': 4,
        'E': 2,
        'D': 6,
        'G': -1,
        'F': -3,
        'I': -3,
        'H': -1,
        'K': -1,
        'M': -3,
        'L': -4,
        'N': 1,
        'Q': 0,
        'P': -1,
        'S': 0,
        'R': -2,
        'T': -1,
        'W': -4,
        'V': -3,
        'Y': -3,
        'X': -1,
        'Z': 1
    },

    'G': {
        '-': -4,
        'A': 0,
        'C': -3,
        'B': -1,
        'E': -2,
        'D': -1,
        'G': 6,
        'F': -3,
        'I': -4,
        'H': -2,
        'K': -2,
        'M': -3,
        'L': -4,
        'N': 0,
        'Q': -2,
        'P': -2,
        'S': 0,
        'R': -2,
        'T': -2,
        'W': -2,
        'V': -3,
        'Y': -3,
        'X': -1,
        'Z': -2
    },

    'F': {
        '-': -4,
        'A': -2,
        'C': -2,
        'B': -3,
        'E': -3,
        'D': -3,
        'G': -3,
        'F': 6,
        'I': 0,
        'H': -1,
        'K': -3,
        'M': 0,
        'L': 0,
        'N': -3,
        'Q': -3,
        'P': -4,
        'S': -2,
        'R': -3,
        'T': -2,
        'W': 1,
        'V': -1,
        'Y': 3,
        'X': -1,
        'Z': -3
    },

    'I': {
        '-': -4,
        'A': -1,
        'C': -1,
        'B': -3,
        'E': -3,
        'D': -3,
        'G': -4,
        'F': 0,
        'I': 4,
        'H': -3,
        'K': -3,
        'M': 1,
        'L': 2,
        'N': -3,
        'Q': -3,
        'P': -3,
        'S': -2,
        'R': -3,
        'T': -1,
        'W': -3,
        'V': 3,
        'Y': -1,
        'X': -1,
        'Z': -3
    },

    'H': {
        '-': -4,
        'A': -2,
        'C': -3,
        'B': 0,
        'E': 0,
        'D': -1,
        'G': -2,
        'F': -1,
        'I': -3,
        'H': 8,
        'K': -1,
        'M': -2,
        'L': -3,
        'N': 1,
        'Q': 0,
        'P': -2,
        'S': -1,
        'R': 0,
        'T': -2,
        'W': -2,
        'V': -3,
        'Y': 2,
        'X': -1,
        'Z': 0
    },

    'K': {
        '-': -4,
        'A': -1,
        'C': -3,
        'B': 0,
        'E': 1,
        'D': -1,
        'G': -2,
        'F': -3,
        'I': -3,
        'H': -1,
        'K': 5,
        'M': -1,
        'L': -2,
        'N': 0,
        'Q': 1,
        'P': -1,
        'S': 0,
        'R': 2,
        'T': -1,
        'W': -3,
        'V': -2,
        'Y': -2,
        'X': -1,
        'Z': 1
    },

    'M': {
        '-': -4,
        'A': -1,
        'C': -1,
        'B': -3,
        'E': -2,
        'D': -3,
        'G': -3,
        'F': 0,
        'I': 1,
        'H': -2,
        'K': -1,
        'M': 5,
        'L': 2,
        'N': -2,
        'Q': 0,
        'P': -2,
        'S': -1,
        'R': -1,
        'T': -1,
        'W': -1,
        'V': 1,
        'Y': -1,
        'X': -1,
        'Z': -1
    },

    'L': {
        '-': -4,
        'A': -1,
        'C': -1,
        'B': -4,
        'E': -3,
        'D': -4,
        'G': -4,
        'F': 0,
        'I': 2,
        'H': -3,
        'K': -2,
        'M': 2,
        'L': 4,
        'N': -3,
        'Q': -2,
        'P': -3,
        'S': -2,
        'R': -2,
        'T': -1,
        'W': -2,
        'V': 1,
        'Y': -1,
        'X': -1,
        'Z': -3
    },

    'N': {
        '-': -4,
        'A': -2,
        'C': -3,
        'B': 3,
        'E': 0,
        'D': 1,
        'G': 0,
        'F': -3,
        'I': -3,
        'H': 1,
        'K': 0,
        'M': -2,
        'L': -3,
        'N': 6,
        'Q': 0,
        'P': -2,
        'S': 1,
        'R': 0,
        'T': 0,
        'W': -4,
        'V': -3,
        'Y': -2,
        'X': -1,
        'Z': 0
    },

    'Q': {
        '-': -4,
        'A': -1,
        'C': -3,
        'B': 0,
        'E': 2,
        'D': 0,
        'G': -2,
        'F': -3,
        'I': -3,
        'H': 0,
        'K': 1,
        'M': 0,
        'L': -2,
        'N': 0,
        'Q': 5,
        'P': -1,
        'S': 0,
        'R': 1,
        'T': -1,
        'W': -2,
        'V': -2,
        'Y': -1,
        'X': -1,
        'Z': 3
    },

    'P': {
        '-': -4,
        'A': -1,
        'C': -3,
        'B': -2,
        'E': -1,
        'D': -1,
        'G': -2,
        'F': -4,
        'I': -3,
        'H': -2,
        'K': -1,
        'M': -2,
        'L': -3,
        'N': -2,
        'Q': -1,
        'P': 7,
        'S': -1,
        'R': -2,
        'T': -1,
        'W': -4,
        'V': -2,
        'Y': -3,
        'X': -2,
        'Z': -1
    },

    'S': {
        '-': -4,
        'A': 1,
        'C': -1,
        'B': 0,
        'E': 0,
        'D': 0,
        'G': 0,
        'F': -2,
        'I': -2,
        'H': -1,
        'K': 0,
        'M': -1,
        'L': -2,
        'N': 1,
        'Q': 0,
        'P': -1,
        'S': 4,
        'R': -1,
        'T': 1,
        'W': -3,
        'V': -2,
        'Y': -2,
        'X': 0,
        'Z': 0
    },

    'R': {
        '-': -4,
        'A': -1,
        'C': -3,
        'B': -1,
        'E': 0,
        'D': -2,
        'G': -2,
        'F': -3,
        'I': -3,
        'H': 0,
        'K': 2,
        'M': -1,
        'L': -2,
        'N': 0,
        'Q': 1,
        'P': -2,
        'S': -1,
        'R': 5,
        'T': -1,
        'W': -3,
        'V': -3,
        'Y': -2,
        'X': -1,
        'Z': 0
    },

    'T': {
        '-': -4,
        'A': 0,
        'C': -1,
        'B': -1,
        'E': -1,
        'D': -1,
        'G': -2,
        'F': -2,
        'I': -1,
        'H': -2,
        'K': -1,
        'M': -1,
        'L': -1,
        'N': 0,
        'Q': -1,
        'P': -1,
        'S': 1,
        'R': -1,
        'T': 5,
        'W': -2,
        'V': 0,
        'Y': -2,
        'X': 0,
        'Z': -1
    },

    'W': {
        '-': -4,
        'A': -3,
        'C': -2,
        'B': -4,
        'E': -3,
        'D': -4,
        'G': -2,
        'F': 1,
        'I': -3,
        'H': -2,
        'K': -3,
        'M': -1,
        'L': -2,
        'N': -4,
        'Q': -2,
        'P': -4,
        'S': -3,
        'R': -3,
        'T': -2,
        'W': 11,
        'V': -3,
        'Y': 2,
        'X': -2,
        'Z': -3
    },

    'V': {
        '-': -4,
        'A': 0,
        'C': -1,
        'B': -3,
        'E': -2,
        'D': -3,
        'G': -3,
        'F': -1,
        'I': 3,
        'H': -3,
        'K': -2,
        'M': 1,
        'L': 1,
        'N': -3,
        'Q': -2,
        'P': -2,
        'S': -2,
        'R': -3,
        'T': 0,
        'W': -3,
        'V': 4,
        'Y': -1,
        'X': -1,
        'Z': -2
    },

    'Y': {
        '-': -4,
        'A': -2,
        'C': -2,
        'B': -3,
        'E': -2,
        'D': -3,
        'G': -3,
        'F': 3,
        'I': -1,
        'H': 2,
        'K': -2,
        'M': -1,
        'L': -1,
        'N': -2,
        'Q': -1,
        'P': -3,
        'S': -2,
        'R': -2,
        'T': -2,
        'W': 2,
        'V': -1,
        'Y': 7,
        'X': -1,
        'Z': -2
    },

    'X': {
        '-': -4,
        'A': 0,
        'C': -2,
        'B': -1,
        'E': -1,
        'D': -1,
        'G': -1,
        'F': -1,
        'I': -1,
        'H': -1,
        'K': -1,
        'M': -1,
        'L': -1,
        'N': -1,
        'Q': -1,
        'P': -2,
        'S': 0,
        'R': -1,
        'T': 0,
        'W': -2,
        'V': -1,
        'Y': -1,
        'X': -1,
        'Z': -1
    },

    'Z': {
        '-': -4,
        'A': -1,
        'C': -3,
        'B': 1,
        'E': 4,
        'D': 1,
        'G': -2,
        'F': -3,
        'I': -3,
        'H': 0,
        'K': 1,
        'M': -1,
        'L': -3,
        'N': 0,
        'Q': 3,
        'P': -1,
        'S': 0,
        'R': 0,
        'T': -1,
        'W': -3,
        'V': -2,
        'Y': -2,
        'X': -1,
        'Z': 4
    }
}

const clearAlignment = () => {
    document.getElementById("seq1").innerHTML = "";
    document.getElementById("seq2").innerHTML = "";
    document.getElementById("score").innerHTML = "";
    document.getElementById("identities").innerHTML = "";
    document.getElementById("gaps").innerHTML = "";
}

const loadAlignment = (results) => {
    let display1 = document.getElementById("seq1");
    display1.innerHTML = q.value.toUpperCase() + " : " + results.alignments[0];

    let display2 = document.getElementById("seq2");
    display2.innerHTML = q2.value.toUpperCase() + " : " + results.alignments[1];

    let displayScore = document.getElementById("score");
    displayScore.innerHTML = results.score;

    let displayIdentities = document.getElementById("identities");
    displayIdentities.innerHTML = results.identities;

    let displayGaps = document.getElementById("gaps");
    displayGaps.innerHTML = results.gaps;
}

const runAlignment = (proteins) => {
    let protein1 = proteins.find(prot => prot.id == q.value.toUpperCase());
    let protein2 = proteins.find(prot => prot.id == q2.value.toUpperCase());

    myAlignment = new Alignment(protein1, protein2);

    myAlignment.alignments = nw(myAlignment.protein1.pdb.sequence.seq, myAlignment.protein2.pdb.sequence.seq);
    myAlignment.score = scoreNW(myAlignment.alignments[0], myAlignment.alignments[1]);
    myAlignment.identities = scoreIdentity(myAlignment.alignments[0], myAlignment.alignments[1]);
    myAlignment.gaps = gapsNumber(myAlignment.alignments[0], myAlignment.alignments[1]);

    loadAlignment(myAlignment);
}


function saveStaticDataToFile(myAlignment) {
    let align = "Alignment results \n\n" +
        myAlignment.protein1.id + " : " + myAlignment.alignments[0] + "\n" +
        myAlignment.protein2.id + " : " + myAlignment.alignments[1] + "\n\n" +
        "Scores : " + myAlignment.score + "\n" +
        "%Gaps : " + myAlignment.gaps + "\n" +
        "%Identity : " + myAlignment.identities;
    var blob = new Blob([align], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "alignment_results.txt");
}