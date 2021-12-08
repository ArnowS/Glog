class AppComm {
    constructor() {
      }
    createViewer(element,config) {
        return $3Dmol.createViewer( element, config );
    }
    submit(viewer,q,histo_prot,histo_id) {
        viewer.clear();
        $3Dmol.download("pdb:"+q.value,viewer,{multimodel:true, frames:true});
        if (!(histo_id.includes(q.value.toUpperCase()))){
            histo_prot.push(creation_prot(q.value.toUpperCase()));
            histo_id.push(q.value.toUpperCase());
        }
    }
}