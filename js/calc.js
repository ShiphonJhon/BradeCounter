    
    //-Use-------------------
    //----------------calcTopsNoTrim------------------------
    //   public
    //
    //input : gray_square, y_line  
    //output : line_tops[[x,y,p,act] , ...]
    //
    //--------------------------------------------
    function calcTopsNoTrim( _grayCurve, _y_line){

        //console.log(_y_line,_l_line,_r_line);  //1620 240 3600

        let _line_tops = [];
        
        //gray_square[][] から　line_gray[] をつくる
        let line_gray = makeLineGray( _grayCurve );
        //console.log(line_gray);

        //アレイデータの平均化
        let line_ave = ave( line_gray );
        //console.log(line_ave);

        // 山の頂点のｘ座標をもとめる
        // max_tops[][][]
        let max_tops = searchTops( line_gray, line_ave );
        //console.log(max_tops);

        //l_line r_line y_line  と　max_tops データから　line_Topsデータを作成する
        // line_Tops のデータにまとめる
        // line_tops[...{ No: no_, X: x_, Y: y_, act:act }] 
        
        
        //_line_tops = makeLineTopsEx( _l_line, _r_line, _y_line, max_tops );

        _line_tops = makeLineTopsEx2( _y_line, max_tops );




        //console.log(_line_tops);

        return _line_tops;
    } 
    
    
    
    
    
    
    //-No Use-------------------
    //----------------calcTops------------------------
    //   public
    //
    //input : gray_square, y_line  l_line r_line 
    //output : line_tops[[x,y,p,act] , ...]
    //
    //--------------------------------------------
    function calcTops( _grayCurve, _y_line, _l_line, _r_line){

        //console.log(_y_line,_l_line,_r_line);  //1620 240 3600

        let _line_tops = [];
        
        //gray_square[][] から　line_gray[] をつくる
        let line_gray = makeLineGray( _grayCurve );
        //console.log(line_gray);

        //アレイデータの平均化
        let line_ave = ave( line_gray );
        //console.log(line_ave);

        // 山の頂点のｘ座標をもとめる
        // max_tops[][][]
        let max_tops = searchTops( line_gray, line_ave );
        //console.log(max_tops);

        //l_line r_line y_line  と　max_tops データから　line_Topsデータを作成する
        // line_Tops のデータにまとめる
        // line_tops[...{ No: no_, X: x_, Y: y_, act:act }] 
        _line_tops = makeLineTopsEx( _l_line, _r_line, _y_line, max_tops );
        //console.log(_line_tops);

        return _line_tops;
    } 

//-------------makeLineGray--------------------------
// grayCurveから
// line_grayをつくる
//grad = gray_square[y][x]
//gray_line  [[x,grad] ...]
//------------------------------------------------------
function makeLineGray( _grayCurve ){

    const width = _grayCurve.length;

    let _line_gray = [];

    for( let i =0; i< width; i++){
        let X = _grayCurve[i][0];
        let Y = _grayCurve[i][1];
        let grad = _grayCurve[i][2];

        _line_gray.push([X,grad]);
    }

    return _line_gray;
}

//アレイデータの平均化
function ave( src_line){
    const window = 12;
    let dst_line = [];
    
    for(let i=0;i<src_line.length;i++){

        let x = 0;
        let y = 0;
        
        //window 以下は　元のデータと同じ
        if( i < window ){
            x = src_line[i][0];
            y = src_line[i][1];
        }else{
            //window 以上は　平均化する。
            x = src_line[i][0];

            let sum = 0;
            for(let j=0;j<window;j++){
                sum = sum + src_line[i-window+j][1] / window;
            }
            y = Math.floor( sum );
        }
        dst_line = [...dst_line, [x,y]];
    }
    //console.log(dst_line);
    return dst_line;
}

//最大値を求める関数
function max_x_y(past_x, past_y, curr_x, curr_y){
    let result_x = 0;
    let result_y = 0;

    if( curr_y >= past_y ){
        result_y = curr_y;
        result_x = curr_x;
    }else{
        result_y = past_y;
        result_x = past_x;
    }
    return [ result_x, result_y ];
}

//頂点を求める関数
// fa: line_gray    fb:line_ave [...[x,y]]
function searchTops( fa,fb ){
    
    //----------メンバ変数-------------
    const Hi = 2;
    const Lo = 0;
    const Rise = 1;
    const Fall = 3;

    let past_state = Lo;
    let curr_state = Lo;

    let past_max_x = 0;
    let past_max_y = 0;
    let curr_max_x = 0;
    let curr_max_y = 0;

    let result_max = [];
    //------------メンバ変数  end----------

    //------------繰り返し計算------------
    for (let i=0; i<fa.length;i++){
        
        if( fa[i][1] >= fb[i][1]){
            curr_state = Hi;
        }else{
            curr_state = Lo;
        }

        if( ( past_state == Hi ) && ( curr_state == Lo ) ){
            curr_state = Fall;
        }
  
        if( ( past_state == Lo ) && ( curr_state == Hi) ){
            curr_state = Rise;
        }

        //最大値を検出する
        [ curr_max_x, curr_max_y ] = max_x_y( past_max_x, past_max_y, fa[i][0], fa[i][1] );

        //最大値を記録する
        if( curr_state == Fall ){
            // x の値が同じなら　データが重ねってしまっているのでパスする
            // list の先頭は別扱い
            if ( result_max.length == 0 ){
              let Y = curr_max_y;
              let X = curr_max_x;
              //result_max = [...result_max, { x:X,y:Y }];
              result_max = [...result_max, [X,Y] ];
              
            }else if( result_max[result_max.length-1][0]  != curr_max_x ){
              //result_max = [...result_max, {x:curr_max_x , y:curr_max_y } ];
              result_max = [...result_max, [curr_max_x,curr_max_y ] ];
            }
          }
  
          //最大値をクリアする
          if(curr_state == Rise){
            curr_max_x = 0;
            curr_max_y = 0;
          }

        //過去のデータと現在のデータの入れ替え
        past_state = curr_state;
        past_max_x = curr_max_x;
        past_max_y = curr_max_y; 
    }
    
    //データを返す
    return result_max;
}


//-No Use--------------------------
//l_line r_line y_line  と　max_tops データから　line_Topsデータを作成する
// line_Tops のデータにまとめる
function makeLineTops( l_line_, r_line_, y_line_, max_tops_ ){
    let line_result = [];

    for(let i=0;i<max_tops_.length;i++){
        let No_ = 0;
        let x_ = max_tops_[i][0];
        let y_ = y_line_;
        let p_ = max_tops_[i][2];
        let act = true;
        if( ( l_line_ < x_ )&&( x_ < r_line_ )){
            line_result = [...line_result, [ No_, x_, y_, act ] ];
        }
    }
    return line_result;
}


//---------------No Use--------------
//l_line r_line y_line  と　max_tops データから　line_Topsデータを作成する
// line_Tops のデータにまとめる
function makeLineTopsEx( l_line_, r_line_, y_line_, max_tops_ ){
    let line_result = [];

    for(let i=0;i<max_tops_.length;i++){
        let no_ = 0;
        let x_ = max_tops_[i][0];
        let y_ = y_line_;
        let p_ = max_tops_[i][2];
        let act = true;

        if( ( l_line_ < x_ )&&( x_ < r_line_ )){
            line_result = [...line_result, {No:no_, X:x_, Y:y_, act:act } ];
        }
    }
    return line_result;
}


//------------- Use--------------
//y_line  と　max_tops データから　line_Topsデータを作成する
// line_Tops のデータにまとめる
function makeLineTopsEx2( y_line_, max_tops_ ){
    let line_result = [];

    for(let i=0;i<max_tops_.length;i++){
        let no_ = 0;
        let x_ = max_tops_[i][0];
        let y_ = y_line_;
        let p_ = max_tops_[i][2];
        let act = true;

        line_result = [...line_result, {No:no_,X:x_,Y:y_,act:act}];

        /*
        if( ( l_line_ < x_ )&&( x_ < r_line_ )){
            line_result = [...line_result, {No:no_, X:x_, Y:y_, act:act } ];
        }
        */
    }
    return line_result;
}