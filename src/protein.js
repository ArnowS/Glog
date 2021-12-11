'use strict';

class protein {
    constructor(id) {
        this.id = id.toUpperCase();
    }
}

const creation_prot = (id) => {
    let prot = new protein(id);
    let url = `https://files.rcsb.org/view/${id}.pdb`;
    fetch(url)
        .then(response => response.text())
        .then(txt => {
            let data = parsePDB(txt);
            prot.pdb = data;
        })
    return prot;
}

let histo_prot = [];
let histo_id = [];