'use strict';

class proteine {
    constructor(id) {
      this.id = id.toUpperCase();
    }
}

const creation_prot = (id) => {
  let prot = new proteine(id);
  let url = `https://files.rcsb.org/view/${id}.pdb`;
  fetch(url)
  .then(response => response.text() )
  .then(txt => {
    let data = parsePDB(txt);
    prot.pdb = data;
  })
  return prot;
}

let histo_prot = [];
let histo_id = [];
console.log(histo_prot);