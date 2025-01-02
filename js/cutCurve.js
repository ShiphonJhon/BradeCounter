function cutGrayCurve( _src, _H_Line){

    const width = _src[0].length;
    const height = _src.length;
    let _dst = [];

    for(let i=0; i<width; i++){

        let X = i;
        let Y = _H_Line;
        let grad = _src[_H_Line][i][0];

        _dst.push([X,Y,grad]);
    }

    return _dst;
}