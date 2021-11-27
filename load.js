const q= document.getElementById('query');
const q2= document.getElementById('query2');
const viewer = $3Dmol.createViewer( element, config );
const viewer2 = $3Dmol.createViewer( element2, config );
const seq1 = document.getElementById('seq1');
const seq2 = document.getElementById('seq2');

function submitted() {
    viewer.clear();
    viewer2.clear();
    $3Dmol.download("pdb:"+q.value,viewer,{multimodel:true, frames:true});
    $3Dmol.download("pdb:"+q2.value,viewer2,{multimodel:true, frames:true});
    if (!(histo_id.includes(q.value.toUpperCase()))){
        histo_prot.push(creation_prot(q.value.toUpperCase()));
        histo_id.push(q.value.toUpperCase());
    }
    if (!(histo_id.includes(q2.value.toUpperCase()))){
        histo_prot.push(creation_prot(q2.value.toUpperCase()));
        histo_id.push(q2.value.toUpperCase());
    }
}

function submit_seq(){
    let ind1 = histo_id.indexOf(q.value.toUpperCase());
    let ind2 = histo_id.indexOf(q2.value.toUpperCase());
    console.info(ind1,ind2);
    seq1.innerHTML = histo_prot[ind1]["pdb"]["sequence"];
    seq2.innerHTML = histo_prot[ind2]["pdb"]["sequence"];
}
