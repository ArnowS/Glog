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
let config = { backgroundColor: 'grey' };
/*let viewer = $3Dmol.createViewer( element, config );
    $3Dmol.download("pdb:1FAT",viewer,{multimodel:true, frames:true},function(){
    viewer.setStyle({chain:'B'},{cartoon:{color:'red'}});
    viewer.setStyle({chain:'B',invert:true},{cartoon:{color:'blue'}});
    viewer.render();
    viewer.zoom(1, 2000);
});*/


$("#Cart").on('click', function() {
    viewer2.setStyle({cartoon:{color:"white"}});
    viewer2.render();
});
$("#Cart").on('click', function() {
    viewer.setStyle({cartoon:{color:"white"}});
    viewer.render();
});
$("#Lin").on('click', function() {
    viewer.setStyle({line:{}});
    viewer.render();
});
$("#Lin").on('click', function() {
    viewer2.setStyle({line:{}});
    viewer2.render();
});
$("#Sphe").on('click', function() {
    viewer.setStyle({sphere:{}});
    viewer.render();
});
$("#Sphe").on('click', function() {
    viewer2.setStyle({sphere:{}});
    viewer2.render();
});
$("#Bat").on('click', function() {
    viewer.setStyle({stick:{}});
    viewer.render();
});
$("#Bat").on('click', function() {
    viewer2.setStyle({stick:{}});
    viewer2.render();
});
$("#Cros").on('click', function() {
    viewer.setStyle({cross:{}});
    viewer.render();
});
$("#Cros").on('click', function() {
    viewer2.setStyle({cross:{}});
    viewer2.render();
});