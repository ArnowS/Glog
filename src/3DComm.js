/*
 * Quentin BLECHET
 * Patrick JACQUES
 * Marc MEYNADIER
 * Clément SAUVESTRE
 * Arnaud SIMON
 */

class AppComm {
    constructor() {}
    createViewer(element, config) {
        return $3Dmol.createViewer(element, config);
    }
    submit(viewer, q, histo_prot, histo_id) {
        viewer.clear();
        $3Dmol.download("pdb:" + q.value, viewer, { multimodel: true, frames: true });
        if (!(histo_id.includes(q.value.toUpperCase()))) {
            histo_prot.push(creation_prot(q.value.toUpperCase()));
            histo_id.push(q.value.toUpperCase());
        }
    }
    saveTxt(myAlignment) {
        let align = "Alignment results \n\n" +
            myAlignment.protein1.id + " : " + myAlignment.alignments[0] + "\n" +
            myAlignment.protein2.id + " : " + myAlignment.alignments[1] + "\n\n" +
            "Scores : " + myAlignment.score + "\n" +
            "%Gaps : " + myAlignment.gaps + "\n" +
            "%Identity : " + myAlignment.identities;
        var blob = new Blob([align], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `alignment_results_${myAlignment.protein1.id}_${myAlignment.protein2.id}.txt`);
    }
}