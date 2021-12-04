function createArray(length) {
    var arr = new Array(length || 0).fill(0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function createSimilarity() {
    let S = createArray(4, 4);
    S[0][0] = 10;
    S[0][1] = -1;
    S[0][2] = -3;
    S[0][3] = -4;
    S[1][0] = -1;
    S[1][1] = 7;
    S[1][2] = -5;
    S[1][3] = -3;
    S[2][0] = -3;
    S[2][1] = -5;
    S[2][2] = 9;
    S[2][3] = 0;
    S[3][0] = -4;
    S[3][1] = -3;
    S[3][2] = 0;
    S[3][3] = 8;
    return S;
}

function valueSimilarity(na, nb) {
    let value = 0;
    if (na == 'A' && nb == 'A') { value = 10 }
    if (na == 'A' && nb == 'G') { value = -1 }
    if (na == 'A' && nb == 'C') { value = -3 }
    if (na == 'A' && nb == 'T') { value = -4 }
    if (na == 'G' && nb == 'A') { value = -1 }
    if (na == 'G' && nb == 'G') { value = 7 }
    if (na == 'G' && nb == 'C') { value = -5 }
    if (na == 'G' && nb == 'T') { value = -3 }
    if (na == 'C' && nb == 'A') { value = -3 }
    if (na == 'C' && nb == 'G') { value = -5 }
    if (na == 'C' && nb == 'C') { value = 9 }
    if (na == 'C' && nb == 'T') { value = 0 }
    if (na == 'T' && nb == 'A') { value = -4 }
    if (na == 'T' && nb == 'G') { value = -3 }
    if (na == 'T' && nb == 'C') { value = 0 }
    if (na == 'T' && nb == 'T') { value = 8 }
    return value;


}

function createMatrice(x, y, gap = -3) {
    let S = createSimilarity();
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
            let Choice1 = F[i - 1][j - 1] + valueSimilarity(x[i], y[j]);
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

function nw(x, y, F, gap = -3) {
    let alignmentX = '';
    let alignmentY = '';
    i = x.length - 1;
    j = y.length - 1;
    while (i > 0 && j > 0) {
        let score = F[i][j];
        let scoreDiag = F[i - 1][j - 1];
        let scoreUp = F[i][j - 1];
        let scoreLeft = F[i - 1][j]
        if (score === scoreDiag + valueSimilarity(x[i], y[j])) {
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

let x = "AAGACTAGTTAC";
let y = "ACGAGACGT";
let gap = -10;

F = createMatrice(x, y, gap);
[seq1, seq2] = nw(x, y, F, gap);
console.log('Sequence 1', reverseString(seq1));
console.log('Sequence 2', reverseString(seq2));