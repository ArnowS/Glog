const q= document.getElementById('query');
const q2= document.getElementById('query2');
const viewer = $3Dmol.createViewer( element, config );
const viewer2 = $3Dmol.createViewer( element2, config );

function submitted() {
    viewer.clear();
    viewer2.clear();
    $3Dmol.download("pdb:"+q.value,viewer,{multimodel:true, frames:true});
    $3Dmol.download("pdb:"+q2.value,viewer2,{multimodel:true, frames:true});
    if (!(histo_id.includes(q.value.toUpperCase()))){
        histo_prot.push(creation_prot(q.value));
        histo_id.push(q.value.toUpperCase());
    }
    if (!(histo_id.includes(q2.value.toUpperCase()))){
        histo_prot.push(creation_prot(q2.value));
        histo_id.push(q2.value.toUpperCase());
    }
}
