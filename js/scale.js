class Scale {

    //private メンバ変数
    _l_line_pos = 0;
    _r_line_pos = 0;
    _h_line_pos = 0;
    _line_Tops = [];
    _trimed_sorted_line_tops = [];

    _field_Line_Data = [];

    //----------public---------------------
    //button styleの取り込み  on時
    set button_on_background(value){
        this._button_on_background = value;
    }

    //----------------public-------------------
    //button styleの取り込み  off時
    set button_off_background(value){
        this._button_off_background = value;

        //操作ボタンをホワイトにする
        this.buttonElem.style.background = this._button_off_background;
    }

    //---------------public---------------------------
    //キーボードのイベントハンドラの中に配置するもの
    inKeyBoardHandler(){

        //act が　false のものを排除する
        let new_line_tops = this._field_Line_Data.filter((item) => {
            return item.act;
        });

        //データを入れ替える
        this._field_Line_Data = new_line_tops;

    }

    //------------------------public---------------------------
    // コンストラクタ
    constructor(buttonElem , ctx, canvasElem ){

        this.buttonElem = buttonElem;
        this.ctx = ctx;
        this.canvasElem = canvasElem;
        //this._line_Tops = line_Tops;

        this.button_on_flag = false;

        //button Handler
        this.buttonClickHandler = () =>{

            //console.log("button clicked");

            //操作ボタンが押された Flag
            this.button_on_flag = true;

            //操作ボタンをグレーアウト化する

            this.buttonElem.style.background = this._button_on_background;
        }

        //操作ボタンのイベントハンドラ
        this.buttonElem.addEventListener('click',this.buttonClickHandler);
    }

    //--------------------目盛り描写用メソッド-------------------------------
    //---------------------------- 個別メソッド--------------------------------
    //上下2色の最大級の大きさの目盛り　を描く
    drawBigBar2Color(_ctx,_X,_Y,act){

        //縦棒の横幅の半分の値
        const width = 2;
        //縦幅の半分の値
        const height = 30;
    
        //色の設定変更
        let color_1 = "black";
        let color_2 = "green";
        
        if( act == true ){
            color_1 = "rgb(250,250,250)";
            color_2 = "rgb(10,10,150)";
        }else{
            color_1 = "rgb(250,200,200)";
            color_2 = "rgb(250,80,80)";
        }
    
        //描写 上半分
        _ctx.fillStyle = color_1;
        _ctx.beginPath();
        _ctx.fillRect( _X - width,  _Y - height, width * 2, height);

        //描写　下半分
        _ctx.fillStyle = color_2;
        _ctx.beginPath();
        _ctx.fillRect( _X - width,  _Y, width * 2, height);
    }

    //上下2色の中位の大きさの目盛り　を描く
    drawMiddleBar2Color(_ctx,_X,_Y,act){

        //縦棒の横幅の半分の値
        const width = 2;
        //縦幅の半分の値
        const height = 20;
    
        //色の設定変更
        let color_1 = "black";
        let color_2 = "green";
        
        if( act == true ){
            color_1 = "rgb(240,240,250)";
            color_2 = "rgb(50,50,200)";
        }else{
            color_1 = "rgb(250,200,200)";
            color_2 = "rgb(250,80,80)";
        }
    
        //描写 上半分
        _ctx.fillStyle = color_1;
        _ctx.beginPath();
        _ctx.fillRect( _X - width,  _Y - height, width * 2, height);

        //描写　下半分
        _ctx.fillStyle = color_2;
        _ctx.beginPath();
        _ctx.fillRect( _X - width,  _Y, width * 2, height);
    }

    //上下2色の小さな目盛り　を描く
    drawSmallBar2Color(_ctx,_X,_Y,act){

        //縦棒の横幅の半分の値
        const width = 2;
        //縦幅の半分の値
        const height = 10;
    
        //色の設定変更
        let color_1 = "black";
        let color_2 = "green";
        
        if( act == true ){
            color_1 = "rgb(200,200,240)";
            color_2 = "rgb(80,80,240)";
        }else{
            color_1 = "rgb(250,200,200)";
            color_2 = "rgb(250,80,80)";
        }
    
        //描写 上半分
        _ctx.fillStyle = color_1;
        _ctx.beginPath();
        _ctx.fillRect( _X - width,  _Y - height, width * 2, height);

        //描写　下半分
        _ctx.fillStyle = color_2;
        _ctx.beginPath();
        _ctx.fillRect( _X - width,  _Y, width * 2, height);
    }

    // --------------------- 目盛りの描写関数 ----------------
    //BigBar
    draw_BigBar_list(data_list ){
        data_list.forEach( (elem) => {
            this.drawBigBar2Color(this.ctx, elem.X, elem.Y, elem.act);
        });
    }

    //MiddleBar
    draw_MiddleBar_list(data_list ){
        data_list.forEach( (elem) => {
            this.drawMiddleBar2Color( this.ctx, elem.X, elem.Y, elem.act);
        });
    }

    //SmallBar
    draw_SmallBar_list(data_list ){
        data_list.forEach( (elem) => {
            this.drawSmallBar2Color( this.ctx, elem.X, elem.Y, elem.act);
        });
    }

    //---------------データ処理関数--------------------------------

    //dataをソートする
    sort_data_list (_old_data_list ){
        // X　の値　で　ソート　小さい値から大きい値へ　並べ替える
        let new_data_list = _old_data_list.sort(( a, b ) => {
            return a.X -b.X;
        });

        // No の値　を　1から順に大きくなる整数の値を与える
        for(let i=0; i< new_data_list.length;i++){
            new_data_list[i].No = i+1;
        }
        return new_data_list;
    }

    //リストデータのy_lineを書き換える   //不要
    addHLinePos(_Line_Tops_Data){
        let org_line_Tops = _Line_Tops_Data;
        let new_line_Tops = org_line_Tops.map((item) => {
            return {...item, Y: this._h_line_pos};
        });
        return new_line_Tops;
    }

    /*
    //各ボーダーラインで　範囲を抜き出す   //不要
    trimLineByBorder(line_Tops){
        let new_line_tops;

        //h_lineを書き換える
        let h_line_input = this.addHLinePos(line_Tops);
       
        // L_Line より　小さいXは　除去
        let trim_left = h_line_input.filter((elem) => {
            return (  this._l_line_pos < elem.X );
        });

        // R_Line より　大きいXは　除去
        let trim_right = trim_left.filter((elem) => {
            return ( elem.X <  this._r_line_pos);
        });
        new_line_tops = trim_right;

        return new_line_tops;
    }
    */

    //---------------Border による　トリム処理-------------
    trim( _src, _H_Line, _L_Line, _R_Line ){

        // H_Line の値を入れ込む
        let _dst = _src.map((item => {
            return {...item, Y:_H_Line};
        }));

        // L_Line で　左側をトリム
        let trim_left = _dst.filter((elem) => {
            return ( _L_Line < elem.X );
        });

        //R_Line で　右側をトリム
        let trim_right = trim_left.filter((elem) => {
            return ( elem.X  <  _R_Line );
        });

        _dst = trim_right;

        return _dst;
    }


    //-------------------------------描写関数」---------------------------
    //------------------------public-----------------------------------
    // 目盛りを描写する
    drawScale(){

        //console.log(this._field_Line_Data);

        //Xのデータの大きさ順でソートする。
        let sorted_list = this.sort_data_list ( this._field_Line_Data );  //Noがつく
        
        //console.log(sorted_list);
            
        //No　で　5の倍数のNoに相当するリストを　除去する.（最小目盛りのリスト）
        let list_del5 = sorted_list.filter((elem)=>{
            return (elem.No % 5) != 0 ;
        });
        //console.log(list_del5);

        //No で　5の倍数のNoに相当するリストを　取り出す
        let list_pick5 = sorted_list.filter((elem)=>{
            return (elem.No % 5) == 0;
        });
        //console.log(list_pick5);

        //No で　5の倍数から10の倍数を除いたリストを　作成する  //5倍のリスト
        let list_pick5_del10 = list_pick5.filter((elem)=>{
            return (elem.No % 10 ) != 0;
        });
        //console.log(list_pick5_del10);

        // Noで10の倍数を満たすものをリストUP
        let list_pick10 = sorted_list.filter((elem)=>{   //10倍のリスト
            return (elem.No % 10) == 0;
        });
        //console.log(list_pick10);

        //最小目盛りの描写
        //console.log(list_del5);
        this.draw_SmallBar_list(list_del5);

        //中間の大きさの目盛りの描写
        this.draw_MiddleBar_list(list_pick5_del10);

        //最大目盛りの描写
        this.draw_BigBar_list(list_pick10);

        //ボーダーによるトリムとXの大きさによるソートが完了したデータ
        this._trimed_sorted_line_tops = sorted_list;
    }

    ///------------------Hover用-ちいさな　目盛り-----------------
    // 小さな目盛りの描写
    drawMarkBarSmall( _ctx, _X, _Y, act ){
        //縦棒の横幅の半分の値
        const width = 2;
        //縦幅の半分の値
        const height = 10;

        //色の設定変更
        let color = "black";
        if( act == true ){
            color = "rgb(200,200,240)";
        }else{
            color = "rgba(250,80,80,0.2)";
        }

        //描写
        _ctx.fillStyle = color;
        _ctx.beginPath();
        _ctx.fillRect( _X-width, _Y-height, width * 2, height *2);
    }

    //ラインデータをもとに　小さな目盛りをすべて描写する
    drawScaleHover(line_tops_data){
        line_tops_data.map((elem) => {
            this.drawMarkBarSmall( this.ctx, elem.X, elem.Y, elem.act);
        });
    }
        
    //マウスのカーソルが　目盛りの範囲に入っているかどうかを判定する
    checkCursolIn( mouseX, mouseY, scaleX, scaleY){
        let result = false;
        let width = 2;
        let height = 10;

        if( ( ( scaleX - width ) < mouseX ) && ( mouseX < (scaleX + width)) ){
            if(  (( scaleY - height ) < mouseY ) && ( mouseY < ( scaleY + height )) ) {
                result = true;
            }
        }
        return result;
    }

    //---------マウスUP　目盛りの追加　決定----------------
    //リストに新しいリストを追加する
    add_data_list( _old_list, _X, _Y ){
        //ひとつだけのリストのデータを作成する
        let single_list = {
            No: 0,
            X: _X,
            Y: _Y,
            act: true
        }

        //元のデータリストに加える
        let new_data_list = [... _old_list, single_list];

        return new_data_list;
    }

    //-------------------------------マウス　ハンドラ--------------------
    //------------------------------public-----------------------
    //マウス　Doun　ハンドラ内の処理
    inMouseDownHandler(event){
        //console.log(event.offsetX);
    }
    
    //------------------------------public-----------------------
    // マウス　moveハンドラ内の処理
    inMouseMoveHandler(event){
        let MouseX = event.offsetX;
        let MouseY = event.offsetY;

        //-------------目盛りのHover表示-----------------
        //lin_tops を　コピーして仮データをつくる
        //let tmp_tops_data = this._trimed_sorted_line_tops;
        let tmp_tops_data = this._field_Line_Data;
        

        //仮データのすべてをチェックする
        for(let i=0;i<tmp_tops_data.length;i++){

            //マウスのカーソルが目盛りの範囲に入っているかどうかチェックする
            let ScaleX = tmp_tops_data[i].X;
            let ScaleY = tmp_tops_data[i].Y;
            let _act = tmp_tops_data[i].act;

            if( this.checkCursolIn( MouseX, MouseY, ScaleX, ScaleY) == true){
                //範囲内なら　act を　false にする
                _act = false;
                //tmp_tops_data[i].act = _act;

                //目盛りを描写する
                this.drawMarkBarSmall(this.ctx,ScaleX,ScaleY,_act);
            }
        }
        //範囲内でなければ　何もしない
    }

    //------------------------------public-----------------------
    //マウス　Up　ハンドラ内での処理
    inMouseUpHandler(event){
        //マウスカーソルの位置の取得
        let MouseX = event.offsetX;
        let MouseY = event.offsetY;

        //マウスクリックによる目盛りの追加
        //操作ボタンが押されていることが必要条件
        if( this.button_on_flag == true){
            //元のリストに新しい目盛りを追加する
            this._field_Line_Data = this.add_data_list(this._field_Line_Data,MouseX,this._h_line_pos);
            
            //操作ボタンを解除する
            this.button_on_flag = false;
            //操作ボタンをホワイトにする
            this.buttonElem.style.background = this._button_off_background;
        }else{
            //操作ボタンが押されていないとき　目盛りの除去を行うバーを選択する場合
            
            //lin_tops を　コピーして仮データをつくる
            let tmp_tops_data = this._field_Line_Data;
            
            for(let i=0;i<tmp_tops_data.length;i++){
                    
                //マウスのカーソルが目盛りの範囲に入っているかどうかチェックする
                let ScaleX = tmp_tops_data[i].X;
                let ScaleY = tmp_tops_data[i].Y;
                let _act = tmp_tops_data[i].act;

                if( this.checkCursolIn( MouseX, MouseY, ScaleX, ScaleY) == true){
                    
                    //範囲内なら　act を　false にする.（トグルにする？）
                    _act = false;

                    //データを変更する
                    tmp_tops_data[i].act = _act;
                }
            }
            //データの入れ替え
            this._field_Line_Data = tmp_tops_data; 
        }
    }

    //------------------------------public-----------------------
    //setter 
    set LeftLinePos(value){
        this._l_line_pos = value;
    }

    set RightLinePos(value){
        this._r_line_pos = value;
    }
    
    set HorizontalLinePos(value){
        this._h_line_pos = value;
    }

    set LineTopsData(value){
        this._line_Tops = value;
    }

    //getter
    get LineTopsData(){
        return this._line_Tops;
    }

    set fieldLineData(value){
        this._field_Line_Data = value;
        
    }

    get fieldLineData(){
        return this._field_Line_Data;
    }

    //public-----------------------------------------------------
    //----------countFins----------------------------------------
    countFins(_field_Line_Data){

        let count = 0;

        for(let i=0; i<_field_Line_Data.length;i++){
            if( _field_Line_Data[i].act){
                count++;
            }
        }
        return count;
    }
}




//---------------------public debug-------------------------
// 画面を消去する
function clearDisp(ctx,canvasElem){
    ctx.fillStyle = "rgb(220,220,220)";
    ctx.beginPath();
    ctx.fillRect( 0,  0,  canvasElem.width, canvasElem.height);
}

//-----------------------public  debug-------------------------
//Sample Data
let sample_data_list =[
    {   No: 0,  X: 10,  Y: 50,  act: true    },
    {   No: 0,  X: 30,  Y: 32,  act: true    },
    {   No: 0,  X: 70,  Y: 32,  act: false   },
    {   No: 0,  X: 100, Y: 32,  act: true    },
    {   No: 0,  X: 200, Y: 32,  act: true    },
    {   No: 0,  X: 120, Y: 32,  act: true      },
    {   No: 0,  X: 150, Y: 32,  act: true  },
    {   No: 0,  X: 180,  Y: 50,  act: true    },
    {   No: 0,  X: 220,  Y: 32,  act: true    },
    {   No: 0,  X: 240,  Y: 32,  act: false   },
    {   No: 0,  X: 260, Y: 32,  act: true    },
    {   No: 0,  X: 280, Y: 32,  act: true    },
    {   No: 0,  X: 300, Y: 32,  act: true      },
    {   No: 0,  X: 320, Y: 32,  act: true  }  
];