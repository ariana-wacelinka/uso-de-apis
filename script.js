window.onload = function() {
    $(".frases").hide();
    var x = Math.floor(Math.random()*3);
    switch(x) {
        case 0:
            $("#frase1").show();
            break;
        case 1:
            $("#frase2").show();
            break;
        case 2:
            $("#frase3").show();
            break;
    }
}

$(document).ready(function(){
    $("#datos").hide();
    $("#valorant").hide()
    $("#random").click(function() {
        $.ajax({
            url: 'https://uselessfacts.jsph.pl/random.json?language=en',
            method: 'GET',
            success: function(data) {
                $('#facts').text(data.text);
                $('#facts').slideDown();
            }
        });
    });

    $("#link1").click(function() {
        $("#datos").slideDown();
        $("#frases").slideDown();
        $("#texto").slideDown();
        $("#valorant").slideUp();
        $('#facts').slideUp();
    });

    $("#ocultar").click(function() {
        $("#datos").slideUp();
    });
    
    function mostrarAgentes() {
        $("#datos").hide();
        $("#frases").slideUp();
        $("#texto").slideUp();
        $("#valorant").html(`
        <section>
        <img src="./AGENTES/FADE.jpg" class="personajes" value="dade69b4-4f5a-8528-247b-219e5a1facd6">
        <img src="./AGENTES/KJ.jpg" class="personajes" value="1e58de9c-4950-5125-93e9-a0aee9f98746">
        <img src="./AGENTES/JETT.jpg" class="personajes" value="add6443a-41bd-e414-f6ad-e58d267f4e95">
        <img src="./AGENTES/SAGE.jpg" class="personajes" value="569fdd95-4d10-43ab-ca70-79becc718b46">
        <img src="./AGENTES/VIPER.jpg" class="personajes" value="707eab51-4836-f488-046a-cda6bf494859">
        </section>`)
        $("#valorant").slideDown();
        $("section").slideDown();

        $(".personajes").click(function() {
            $.ajax({
                url: `https://valorant-api.com/v1/agents/${$(this).attr("value")}`,
                method: 'GET',
                success: function(response) {
                    displayAgent(response.data);
                }
            })
        })
    }
    
    $("#link2").click(
        mostrarAgentes
    );
    
    function displayAgent(agent) {
        const $container = $('#valorant');
        const $agentDiv = $('<div class="agent"></div>');
        $agentDiv.html(`
        <div class="gridAgentes">
            <img class="item1A" src="${agent.fullPortrait}" alt="${agent.displayName}">
            <div class="item2A"><h2 class="ubuntu-sans">${agent.displayName}</h2></div>
            <div class="item3A">
                <p>${agent.description}</p><br>
                <h3>${agent.role.displayName}</h3><br>
                <p>${agent.role.description}</p>
            </div>
            <div class="item4A"><button id="volver" class="random">Volver</button></div>
        </div>
        `);
        $container.html($agentDiv);

        $("#volver").click(function(){
            $agentDiv.slideUp();
            mostrarAgentes();
        });
    };
});