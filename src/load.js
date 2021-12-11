/*
 * Quentin BLECHET
 * Patrick JACQUES
 * Marc MEYNADIER
 * Clément SAUVESTRE
 * Arnaud SIMON
 */

let Comm = new AppComm();
const q = document.getElementById('query');
const q2 = document.getElementById('query2');
const viewer = Comm.createViewer(element, config);
const viewer2 = Comm.createViewer(element2, config);
const idseq1 = document.getElementById('seq1');
const idseq2 = document.getElementById('seq2');
let seq1;
let seq2;

function submitted() {
    clearAlignment();
    Comm.submit(viewer, q, histo_prot, histo_id);
    Comm.submit(viewer2, q2, histo_prot, histo_id);
}

function submit_seq() {
    let ind1 = histo_id.indexOf(q.value.toUpperCase());
    let ind2 = histo_id.indexOf(q2.value.toUpperCase());
    console.info(ind1, ind2);
    seq1 = histo_prot[ind1]["pdb"]["sequence"]["seq"];
    seq2 = histo_prot[ind2]["pdb"]["sequence"]["seq"];
    idseq1.innerHTML = seq1;
    idseq2.innerHTML = seq2;
}

function downloadURI(id,uri) {
    n = `${id.toUpperCase()}.png`;
    var link = document.createElement("a");
    link.download = n;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function getImages(viewer, viewer2) {
    downloadURI(q.value,viewer.pngURI())
    downloadURI(q2.value,viewer2.pngURI())
}


//to_complete 

function getModels(viewer, viewer2) {
    JSON1 = exportJSON(includesStyles = True, viewer.getModel())
    JSON2 = exportJSON(includesStyles = True, viewer2.getModel())
    console.info(JSON1)
    console.info(JSON2)
    return [JSON1, JSON2]
}

function exportAll() {}