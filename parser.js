'use strict';

class AA {
  constructor(aa,position){
    this.aa = aa;
    this.position = position;
  }
}
 
function getType(row) {
    return row.slice(0,6).trim();
  }
  
  /**
   * Simplistic implementation - Too much manual writing
   */
  function parseAtom(row) {
    // Parsing data from wwwPDB
    let type = row.slice(0,6).trim();
    let serial = parseInt(row.slice(7-1,11).trim() );
    let name = row.slice(13-1,16).trim(); 
    let resName = row.slice(18-1 , 20).trim();
    let chainID = row.slice(22-1 , 23).trim();
    let resSeq = row.slice(23-1 , 26).trim();
    let iCode = row.slice(27-1, 28).trim();
    let x = parseFloat(row.slice(31-1, 38).trim() );
    let y = parseFloat(row.slice(39-1,46).trim() );
    let z = parseFloat(row.slice(47-1,54).trim() );
    let occupancy = row.slice(55-1 ,60).trim();
    let tempFactor= row.slice(61-1 ,66).trim();
    let element = row.slice(77-1 ,78).trim();
    let charge= row.slice(79-1 , 80).trim();
  
    let title = chainID + '.'+ resName + '[' + parseInt(resSeq) + '].' + name + '[' + parseInt(serial) + '].' + element;
    return {type,serial,title,name,resName,chainID,resSeq,x,y,z,element};
  }
  
  /**
   * Better implementation - Use of a generic loop 
   * Should work for every tag
   */
  function parseHeader(row) {
    // Parsing Data from wwwPDB
    const tokens = [
      {start:11,end:50,field: 'classification', type: 'string'},
      {start:51,end:59,field: 'depDate', type: 'date'},
      {start:63,end:66,field: 'idCode', type: 'IDcode'}
    ];
    
    // Main Loop
    let outputs = {};
    for (let i = 0; i < tokens.length; i++) {
      let value = row.slice(tokens[i].start - 1, tokens[i].end).trim();
      if (tokens[i].type === 'number') {
        value = parseFloat(value);
      }
      outputs[tokens[i].field] = value;
    }
    return outputs;
  }

  function parseSeqres(row,model) {
    const dico = {
      code3 : ['ALA','ARG','ASN','ASP','CYS','GLU','GLN','GLY','HIS','ILE','LEU','LYS','MET','PHE','PRO','SER','THR','TRP','TYR','VAL'],
      code1 : ['A','R','N','D','C','E','Q','G','H','I','L','K', 'M','F','P','S','T', 'W','Y','V']
  } 
    let cpt = 0;
    if (model.sequence.AAs.length > 0){
      let taille = model.sequence.AAs.length;
      let last = model.sequence.AAs[taille-1];
      cpt = last.position;
    }
    else{
      cpt = 0;
    }
    let row_space = row.split(" ");
    row_space = row_space.filter(e => e);
    let row_seq = '';
    for (let i=4; i<row_space.length; i++){
      let index = dico.code3.indexOf(row_space[i]);
      if (index != -1){
        row_space[i] = dico.code1[index];
        row_seq += row_space[i];
        let newAA = new AA (row_space[i],cpt);
        model.sequence.AAs.push(newAA);
        cpt++;
      }
    }
    return row_seq;
  }
  
  
  function parseTODO(row) {
    // TODO
    return getType(row);
  }
  
  /**
   * **UGLY** Implementation
   */
  function parseRow(row, model) {
    let tag = getType(row);
  
    if (tag === 'ATOM' || tag === 'HETATM') {
      let atom = parseAtom(row);
      if (model.features.chains.indexOf(atom.chainID) === -1) {
        model.features.chains.push(atom.chainID);
      }
      
      model.features.cg[0] += atom.x;
      model.features.cg[1] += atom.y;
      model.features.cg[2] += atom.z;
      model.features.box[0] = (model.features.box[0] > atom.x) ? atom.x : model.features.box[0];
      model.features.box[1] = (model.features.box[1] > atom.y) ? atom.y : model.features.box[1];
      model.features.box[2] = (model.features.box[2] > atom.z) ? atom.z : model.features.box[2];
      model.features.box[3] = (model.features.box[3] < atom.x) ? atom.x : model.features.box[3];
      model.features.box[4] = (model.features.box[4] < atom.y) ? atom.y : model.features.box[4];
      model.features.box[5] = (model.features.box[5] < atom.z) ? atom.z : model.features.box[5];
      model.atoms.push(atom);
    }
    else if (tag === 'HEADER') {
      let data = parseHeader(row);
      let keys = Object.keys(data);
      for (let i = 0; i < keys.length; i++) {
        model.header[keys[i]] = data[keys[i]];
      }
    }
    else if (tag === 'TITLE') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'OBSLTE') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SPLT') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'CAVEAT') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'COMPND') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SOURCE') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'KEYWDS') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'EXPDTA') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'NUMMDL') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'MDLTYP') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'AUTHOR') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'REVDAT') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SPRSDE') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'JRNL') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'REMARKS') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'DBREF') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'DBREF1') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'DBREF2') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SEQADV') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SEQRES') {
      let string_seq = parseSeqres(row,model);
      model.sequence.seq += string_seq;
    }
    else if (tag === 'MODRES') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'HET') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'FORMUL') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'HETNAM') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'HETSYN') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'HELIX') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SHEET') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SSBOND') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'LINK') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'CISPEP') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SITE') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'CRYST1') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'MTRIXn') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'ORIGXn') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'SCALEn') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'MODEL') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'ANISOU') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'TER') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'HETATM') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'ENDMDL') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'CONECT') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'MASTER') {
      model.header.dummies.push( parseTODO(row) );
    }
    else if (tag === 'END') {
      model.header.dummies.push( parseTODO(row) );
    }
    else {
      // Unknown Tags
      model.header.dummies.push( parseTODO(row) );
    }
    return model;
  }
  
  function parsePDB(text) {
    // Init
    let model = {
      header: {dummies:[]},
      atoms:[],
      sequence:{seq:'',
                AAs:[]},
      features : {
        box: [Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE],
        cg: [0,0,0],
        chains: []
      }
    };
    
    // Split text into rows
    const rows = text.split('\n');
    // Parsing...
    for (let i = 0; i < rows.length; i++) {
      model = parseRow(rows[i],model);
    }
    // Center of Gravity
    model.features.cg[0] /= model.atoms.length;
    model.features.cg[1] /= model.atoms.length;
    model.features.cg[2] /= model.atoms.length;
    
    return model;
  }