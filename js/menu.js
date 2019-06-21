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
    if(document.getElementById('option1').checked) window.location.href = "valley.html?0";
    else if(document.getElementById('option2').checked) window.location.href = "valley.html?1";
    else if(document.getElementById('option3').checked) window.location.href = "valley.html?2";
}
function gamestart2(){
    if(document.getElementById('option1').checked) window.location.href = "factory.html?0";
    else if(document.getElementById('option2').checked) window.location.href = "factory.html?1";
    else if(document.getElementById('option3').checked) window.location.href = "factory.html?2";
}