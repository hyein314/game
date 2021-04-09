$(function(){
    const $comment = $('section>.game>h3');
    const $start = $('section>.game>button');
    const $score = $('section>.game>.score');
    const $bgm = document.getElementById('bgm');
    const $catch = document.getElementById('catch');

    const $mos = $('section>.game>.mos');
    const $mosSoldier = $('section>.game>.mos-soldier');
    const $mosGeneral = $('section>.game>.mos-general');
    const $mosKing = $('section>.game>.mos-king');

    let score = 0;
    let mosInterval = null;
    let setTime = null;
        
    const arryX = [0, 700, 1263];
    const arryY = [180, 300, 420, 520];   
       
    
    const mosShowHide = function(){
        clearInterval(mosInterval);
        mosInterval = setInterval(function(){

            let coordX = Math.floor(Math.random() * 3);
            let coordY = Math.floor(Math.random() * 4);

            $mos.children('img').attr({src : 'images/mos-line.png'});
            $mosSoldier.children('img').attr({src : 'images/mos-soldier-line.png'});
            $mosGeneral.children('img').attr({src : 'images/mos-general-line.png'});
            $mosKing.children('img').attr({src : 'images/mos-king-line.png'});

            $('section>.game>.frame').eq(coordY).css({
                display : 'block',
                left : arryX[coordX],
                top : arryY[coordY]
            }).stop().animate({
                left : arryX[coordX] + 120,
                top : arryY[coordY]
            },500,'easeInOutQuint').animate({
                left : arryX[coordX],
                top : arryY[coordY]
            },700,'easeInQuint');
        },1200);
    };
    

    const gameReset = function(){               
        clearInterval(mosInterval); 
        score = 0;
        $score.text("0000점");
        $comment.text("START 버튼을 누르면 게임이 시작됩니다!");
    };


    const gameEnd = function(){
        clearInterval(mosInterval);

        $bgm.pause();
        $catch.pause();

        $mos.fadeOut();
        $mosSoldier.fadeOut();
        $mosGeneral.fadeOut();
        $mosKing.fadeOut();

        if(score>=4500){
            $('section>.game>.shadow-suc>.popUp>.endScore').text(score + "점");
            $('section>.game>.shadow-suc').show();
            
        }else{
            $('section>.game>.shadow-fail>.popUp>.endScore').text(score + "점");
            $('section>.game>.shadow-fail').show();
        }
    };
    

    const killMosFn = function(evt){        
        $(evt).children('img').attr({src : 'images/mos-kill.png'});
        $catch.currentTime = 0;
        $catch.play();
    };


    $mos.on('click',function(){
        score += 100;
        $score.text(score + "점");
        $comment.text("지원요청! 지원요청!");
        killMosFn($mos);
    });
    
    $mosSoldier.on('click',function(){
        score += 200;
        $score.text(score + "점");
        $comment.text("우리는 끝나지 않았다!");
        killMosFn($mosSoldier);
    });
    
    $mosGeneral.on('click',function(){
        score += 300;
        $score.text(score + "점");
        $comment.text("대왕님 도망가세요!!!!");
        killMosFn($mosGeneral);
    });

    $mosKing.on('click',function(){
        score += 500;
        $score.text(score + "점");
        $comment.text("꾸에에에에에엑");
        killMosFn($mosKing);
    });     


    $('section .fail>button').on('click',function(){
        clearTimeout(setTime);
        gameReset();        
        $('section>.game>.shadow-fail').hide();
    });

    $start.on('click',function(){
        $bgm.load();
        $bgm.play();
        
        gameReset();
        $comment.text("우릴 잡을 수 있을 것 같아?!?!");
        mosShowHide();

        setTime = setTimeout(gameEnd,20000);
    });

    $('section .popUp>.clse').on('click',function(){
        $('section>.game>.shadow-suc').hide();
        $('section>.game>.shadow-fail').hide();
        // gameReset();
    });

    $('.game>div').children('div').on('click',function(evt){
        evt.stopPropagation();
    });

    $(document).on('keyup',function(evt){
        if(evt.which == 27){            
            gameReset();
            $('section>.game>.shadow-suc').hide();
            $('section>.game>.shadow-fail').hide();
        }
    });

});
