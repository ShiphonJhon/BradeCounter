//---------------データ変換--------------------
// 24bit rgb カラー画像　から 24bit rgb グレー画像に変
//
//  input: src : 24bit color array
//  output: dst  : 24bit gray array
//---------------------------------------------
function convertColor24toGray24(_src){
    let dst = [];
    let tmp_dst = [];

    for(let j=0;j<_src.length;j++){
        for(let i=0;i<_src[0].length;i++){
            let r = _src[j][i][0];
            let g = _src[j][i][1];
            let b = _src[j][i][2];

            let p = Math.floor( 0.114*b + 0.587*g + 0.299*r );

            tmp_dst.push([p,p,p]);
        }
        dst.push(tmp_dst);
        tmp_dst = [];
    }
    return dst;
}


//------------------ pablic method --------------------------
// 24bit rgb Color を　24bit rgb Gray へ変換する
//----------------------------------------------------------
function makeGraySquare( _src ){

    let gray24_array = convertColor24toGray24(_src);

    return gray24_array;
}