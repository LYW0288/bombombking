function rule(){
    document.getElementById('rule').style.display = ""
    document.getElementById('ruleclose').style.display = ""
}
function closewindow(){
    controlrule = document.getElementById('rule').style.display
    controlmap = document.getElementById('map').style.display
    if(controlrule == "none"){
        document.getElementById('map').style.display = "none"
        document.getElementById('map1').style.display = "none"
        document.getElementById('map2').style.display = "none"
        document.getElementById('ruleclose').style.display = "none"
    }
    else {
        document.getElementById('rule').style.display = "none"
        document.getElementById('ruleclose').style.display = "none"
    }
}
function start(){
    document.getElementById('map').style.display = ""
    document.getElementById('map1').style.display = ""
    document.getElementById('map2').style.display = ""
    document.getElementById('ruleclose').style.display = ""
}
function gamestart(){
    window.location.href = "valley.html";
}
function gamestart2(){
    window.location.href = "factory.html";
}