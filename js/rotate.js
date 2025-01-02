function rotateSquare( _src, _angle ){

    let _dst  = [];
    let _tmpDst = [];

    const width = _src[0].length;
    const height = _src.length;

    //初期化
    for(let j=0;j<height;j++){
        for(let i=0;i<width; i++){
            _tmpDst.push([0,0,0]);
        }
        _dst.push(_tmpDst);
        _tmpDst = [];
    }

    //回転の中心位置
    const harfWidth = Math.floor( width / 2);
    const harfHeight =Math.floor( height / 2);

    //回転角度　ラジアン
    const rad = _angle * Math.PI / 180 ;

    //回転する角度から三角関数の値をあらかじめ算出しておく
    const sin_0 = Math.sin(rad);
    const cos_0 = Math.cos(rad);

    //画像の回転
    for(let j=0;j<height;j++){
        for(let i=0;i<width;i++){
            
            //元の座標
            let x = i - harfWidth;
            let y = j - harfHeight;

            //新しい座標
            let X = cos_0 * x - sin_0 * y +  harfWidth;
            let Y = sin_0 * x + cos_0 * y +  harfHeight;
            X = Math.floor(X);
            Y = Math.floor(Y);

            let p = 0;

            //トリム
            if(( 0 <= X ) && ( X < width) && ( 0 <= Y) && ( Y < height)){
                p = _src[Y][X][0];
            }else{
                p=0;
            }

            //データの入れ替え
            _dst[j][i][0] = p;
            _dst[j][i][1] = p;
            _dst[j][i][2] = p;
        }
    }

    return _dst;
}