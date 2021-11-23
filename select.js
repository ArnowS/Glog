window.onload=show;
function show(id){
        var d = document.getElementById(id);
        for (var i = 1; i<=10; i++)
            {
                if (document.getElementById('smenu'+i))
                    {document.getElementById('smenu'+i).style.display='none';}
            }
        if (d)
        {d.style.display='block';}
}


function LoadPDB(){
}
let element = $('#container-01');
let element2= $('#container-02');
let config = { backgroundColor: 'white' };
/*let viewer = $3Dmol.createViewer( element, config );
    $3Dmol.download("pdb:1FAT",viewer,{multimodel:true, frames:true},function(){
    viewer.setStyle({chain:'B'},{cartoon:{color:'red'}});
    viewer.setStyle({chain:'B',invert:true},{cartoon:{color:'blue'}});
    viewer.render();
    viewer.zoom(1, 2000);
});*/

function setStyleProt(v){
$3Dmol.download("pdb:7K9J",v,{multimodel:true, frames:true},function(){
    v.setStyle({chain:'B'},{cartoon:{color:'green'}});
    v.render();
    v.zoom(1, 2000);
    })
};
$("#Cart").on('click', function() {
    viewer2.setStyle({cartoon:{}});
    viewer2.render();
});
$("#Cart").on('click', function() {
    viewer.setStyle({cartoon:{}});
    viewer.render();
});
$("#Lin").on('click', function() {
    viewer.setStyle({line:{}});
    viewer.render();
});
$("#Sphe").on('click', function() {
    viewer.setStyle({sphere:{}});
    viewer.render();
});
$("#Bat").on('click', function() {
    viewer.setStyle({stick:{}});
    viewer.render();
});
$("#Cros").on('click', function() {
    viewer.setStyle({cross:{}});
    viewer.render();
});