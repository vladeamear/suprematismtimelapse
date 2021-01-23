//..........................движок..........................//
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getCheckedCheckboxes(arr){
    var checkboxesChecked = [];
    for (var k = 0; k < arr.length; k++) {
        if (arr[k].checked) {
            checkboxesChecked.push(arr[k].value);
        }
    }
    return checkboxesChecked;
}
function createFigure(block, animsizew, animsizeh, borderrad){
    block.style.width = animsizew + "em";
    block.style.height = animsizeh + "em";
    block.style.borderRadius = borderrad;
    return block;
}
function blockStyling(block){
    var ccheckboxesChecked = getCheckedCheckboxes(document.getElementsByClassName('color_choice'));
    var color = ccheckboxesChecked[getRandomInt(ccheckboxesChecked.length)];
    var animsize = document.getElementById('szob').value;
    block.style.left = getRandomArbitrary(-20, 120) + "%";
    block.style.top = getRandomArbitrary(-20, 120) + "%";
    block.style.opacity = getRandomArbitrary(0.8, 1);
    block.style.transform = "rotate(" + getRandomArbitrary(-360, 360) + "deg)";
    block.style.backgroundColor = "rgb(" + color + ")";
    var shape = [];
    if (document.getElementById('square').checked)
        shape.push('square');
    if (document.getElementById('rectangle').checked)
        shape.push('rectangle');
    if (document.getElementById('oval').checked)
        shape.push('oval');
    if (document.getElementById('round').checked)
        shape.push('round');
    n = shape[getRandomInt(shape.length)];
    switch(n){
        case 'square': 
            sizing = getRandomArbitrary(0, animsize);
            block = createFigure(block, sizing, sizing, "0");
            break;
        case 'rectangle': 
            block = createFigure(block, getRandomArbitrary(0, animsize), getRandomArbitrary(0, animsize), "0");
            break;
        case 'oval': 
            block = createFigure(block, getRandomArbitrary(0, animsize), getRandomArbitrary(0, animsize), "50%");
            break;
        case 'round': 
            sizing = getRandomArbitrary(0, animsize);
            block = createFigure(block, sizing, sizing, "50%");
            break;
    }
    var shadowing = [];
    if (document.getElementById('shadow').checked)
        shadowing.push('shadow')
    if (document.getElementById('glow').checked)
        shadowing.push('glow')
    if (document.getElementById('none').checked)
        shadowing.push('none')
    k = shadowing[getRandomInt(shadowing.length)];
    switch(k){
        case 'shadow': 
            block.style.boxShadow = getRandomArbitrary(-3, 3) + "px " + getRandomArbitrary(-3, 3) + "px " + getRandomArbitrary(2, 10) + "px rgba(0, 0, 0, " + getRandomArbitrary(0, 1) + ")";
            break;
        case 'glow': 
            block.style.boxShadow = getRandomArbitrary(-15, 15) + "px " + getRandomArbitrary(-15, 15) + "px " + getRandomArbitrary(20, 30) + "px rgba(" + color + ", " + getRandomArbitrary(0, 1) + ")"; 
            break;
        case 'none': 
            block.style.boxShadow = 'none';
            break;
    }
    return block;
}
function playAnim() {
    var animspeed = Math.abs(document.getElementById('sob').value-12)*0.9;
    var c = Array.from(document.getElementsByClassName('block'));
    var animnumber = parseInt(document.getElementById('nomb').value);
    var bgcheckboxesChecked = getCheckedCheckboxes(document.getElementsByClassName('bg_choice'));
    for (i = 0; i < animnumber; i++) {
        backgr = bgcheckboxesChecked[getRandomInt(bgcheckboxesChecked.length)];
        var n = getRandomInt(c.length);
        c[n] = blockStyling(c[n]);
        c[n].style.transition = animspeed + "s";
        document.documentElement.style.background = "rgb(" + backgr + ")";
        document.documentElement.style.transition = animspeed + "s";
        c.splice(n,1);
    }
    setTimeout(playAnim, animspeed*1000);
}
//////////////////////////////////////////////////////////////

//....................Колличество блоков....................//
function changenob(){
    c = document.getElementsByClassName("block");
    number_of_blocks = document.getElementById("nob");
    number_of_moving_blocks = document.getElementById('nomb');
    b = Math.abs(c.length-number_of_blocks.value);
    if (c.length > number_of_blocks.value){
        for (i = 0; i < b; i++){
            c[c.length-1].remove();
        }
    }
    if (c.length < number_of_blocks.value){
        for (i = 0; i < b; i++){
            var d = document.createElement('div');
            d = blockStyling(d);
            d.className='block';
            document.getElementById("container").append(d);
        }
    }
    number_of_moving_blocks.max = number_of_blocks.value;
    if (number_of_moving_blocks.value > number_of_blocks.value)
        number_of_moving_blocks.value = number_of_blocks.value;
}
//////////////////////////////////////////////////////////////

//....................Полноэкранный режим...................//
function fullscreenonoff(elem){
    var isInFullScreen = (document.webkitFullscreenElement !== null);
    var docElm = document.documentElement;
    if (!isInFullScreen){
        docElm.webkitRequestFullScreen();
        elem.classList.add("fullscreenon");
    }
    else {
        document.webkitExitFullscreen();
        elem.classList.remove("fullscreenon");
    }
}
//////////////////////////////////////////////////////////////

//......................кнопка наверх.......................//
function topFunction() {
    document.documentElement.scrollTop = 0;
    setTimeout(()=>{
        document.getElementById("note").style.opacity = 1;
    },500);
}
function downFunction() {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    setTimeout(()=>{
        document.getElementById("note").style.opacity = 0;
    },2000);
}
//////////////////////////////////////////////////////////////

//........................контроль..........................//
function check(sh){
    var shs = document.getElementsByClassName(sh);
    var k = 0;
    for (i = 0; i < shs.length; i++){
        if (shs[i].checked == true)
            k++;
    }
    if (k == 0)
        shs[getRandomInt(shs.length)].checked = true;
}
//////////////////////////////////////////////////////////////