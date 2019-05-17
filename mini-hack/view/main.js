$("#submit").on("click",function () {
    //check box value
    const playerList = [
        $("#player1").val(),
        $("#player2").val(),
        $("#player3").val(),
        $("#player4").val()
    ];
    $.ajax({
        url: "/create-game",
        type: "POST",
        data: {
            playerList:playerList
        },
        success: function (data) {
            location.href = data
        },
        error: function (err) {
            console.log(err)
        }
        }
    )
})

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

const gameId = GetURLParameter('id')

$.ajax({
    url: `/getgame/${gameId}`,
    method: 'GET',
    success: function (data) {
        $('th#player1').text(data.playerName[0])
        $('th#player2').text(data.playerName[1])
        $('th#player3').text(data.playerName[2])
        $('th#player4').text(data.playerName[3])
        const roundScore = data.roundScore;
        if(roundScore.length !== 0){
            for(let i = 0;i < roundScore.length;i++){
            $("#scoreboard").append(
                `
            <tr>
                <th scope="col">Round ${i + 1}</th>
                <th scope="col"><input class="input" type="number" value="${roundScore[i][0]}"></th>
                <th scope="col"><input class="input" type="number" value="${roundScore[i][1]}"></th>
                <th scope="col"><input class="input" type="number" value="${roundScore[i][2]}"></th>
                <th scope="col"><input class="input" type="number" value="${roundScore[i][3]}"></th> 
            </tr>
            `
            )
            }
        }

    },
    error: function (err) {
        console.log(err)
    }
})



$('button#add-round').on("click",function () {
    var trLength = $("tr").length;
    $("#scoreboard").append(
        `
            <tr>
                <th scope="col">Round ${trLength - 1}</th>
                <th scope="col"><input class="input p1Score" type="number" value="0"></th>
                <th scope="col"><input class="input p2Score" type="number" value="0"></th>
                <th scope="col"><input class="input p3Score" type="number" value="0"></th>
                <th scope="col"><input class="input p4Score" type="number" value="0"></th> 
            </tr>
            `)
    getTotalScore()
})

function getTotalScore() {

    $("input.p1Score").each(function () {
        let p1Score = 0
        p1Score += $(this).val()
        $("#player1Sum").text(p1Score)
    })
    $("input.p2Score").each(function () {
        let p2Score = 0
        p2Score += $(this).val()
        $("#player2Sum").text(p2Score)
    })
    $("input.p3Score").each(function () {
        let p3Score = 0
        p3Score += $(this).val()
        $("#player3Sum").text(p3Score)
    })
    $("input.p4Score").each(function () {
        let p4Score = 0
        p4Score += $(this).val()
        $("#player4Sum").text(p4Score)
    })
}

