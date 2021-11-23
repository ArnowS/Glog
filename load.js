const q= document.getElementById('query');
const q2= document.getElementById('query2');
const viewer = $3Dmol.createViewer( element, config );
const viewer2 = $3Dmol.createViewer( element2, config );

function submitted() {
    $3Dmol.download("pdb:"+q.value,viewer,{multimodel:true, frames:true});
    $3Dmol.download("pdb:"+q2.value,viewer2,{multimodel:true, frames:true});
    return viewer, viewer2;
}
