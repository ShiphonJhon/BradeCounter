
//----2024/12/31--------------------

    //背景を消去する
    function repaintBackground(_ctx, _canvasElem){
        let width = _canvasElem.width;
        let height = _canvasElem.height;

        _ctx.fillStyle = "rgb(240,240,240)";
        _ctx.fillRect(0,0,width,height);
    }

    //--------------------共通------------------------------
    
    //---------------Border による　トリム処理-------------
    function trimByBorder( _src, _H_Line, _L_Line, _R_Line ){

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



    //---------------------------------------------------------------- 
    //--------------------Left Border Class---------------------------
    //-----------------------------------------------------------------

    class LeftBorder {

        _canvasWidth = 100;
        _canvasHeight = 100;
        _canvasHarfWidth = Math.floor( this._canvasWidth / 2);

        _line_pos = 100;

        //ボーダーの操作を開始するボタン
        _OpeButton_clicked_flag =false;

        //マウスの左ボタンが押されている
        _MouseDownOn_flag = false;

        //opeボタンがクリックされており　マウスの左ボタンがオンされていて
        // ボーダーラインの存在範囲にマウスのカーソルがはいっていれば
        _BorderMoveOn_flag = false;

        //操作　button が　押されているかどうか
        get isActive() {
            return this._OpeButton_clicked_flag;
        } 

        
        //ボタンのスタイルの取り込み
        set button_on_background(value){
            this._button_on_backgraound = value;
        }

        set button_off_background(value){
            this._button_off_background = value;
        }

        constructor ( buttonElem, ctx, canvasElem ){

            this._canvasWidth = canvasElem.width;
            this._canvasHeight = canvasElem.height;

            this._canvasHarfWidth = Math.floor( this._canvasWidth / 2 );

            this.ctx = ctx;
            this.buttonElem = buttonElem;

            this.OpeButtonClicked = () =>{

                //操作ボタンが押された
                this._OpeButton_clicked_flag = true;

                //buttonのバックグラウンドを変更する
                this.buttonElem.style.background = this._button_on_backgraound;
            }

            this.buttonElem.addEventListener('click',this.OpeButtonClicked);            
        }

        //ボーダーラインの位置
        set line_pos(value){
            this._line_pos = value;
        }

        get line_pos(){
            return this._line_pos;
        }

        //ボーダーラインを描く
        drawBorderLine(){
            let result_line = 200;   //関数内なので外部にもれない。

            //--------------追加 2024/12/28-------------------------------
            this._canvasWidth = canvasElem.width;
            this._canvasHeight = canvasElem.height;
            //console.log(this._canvasWidth,this._canvasHeight);

            this._canvasHarfWidth = Math.floor( this._canvasWidth / 2 );
            //--------------------追加　ここまで-----------------------------

            // line_pos が　画面の半分以上に行かない様にする
            if( (this._canvasHarfWidth -10)< this._line_pos ){
                this._line_pos = this._canvasHarfWidth - 10;
                result_line = this._line_pos;
            }else if( this._line_pos < 0 ){
                this._line_pos = 0;
                result_line = this._line_pos;
            }else{
                result_line = this._line_pos;
            }


            ctx.strokeStyle = "red";   //左：赤　右：青　水平：黒
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo( result_line, 0);
            ctx.lineTo( result_line, this._canvasHeight);
            ctx.stroke();
        }

        //ボーダーラインをチェックする
        checkBorderLine( event ){

            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;
                
            //ボーダーラインの検知巾の半分の値
            const width = 2;

            let result = false;

            if( ((this._line_pos - width ) <= this.MouseX) 
                     && ( this.MouseX <= (this._line_pos + width))){
                result = true;       
            }
            return result;
        }

        //----------------------public------------------
        // MouseDouwハンドラの中に入れる処理
        //-------------------------------------------------
        inMouseDounHandler(event){

            //左マウスボタンが押されている
            this._MouseDownOn_flag = true;

            //ボーダーラインをチェックする
            if((this._OpeButton_clicked_flag == true ) && 
                (this.checkBorderLine(event) == true)){
                    this._BorderMoveOn_flag = true;
            }
        }

        //---------------------public----------------------------
        // MouseMoveハンドラに入れる処理
        //-------------------------------------------------------
        inMouseMoveHandler(event){
            
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;

            //マウスボタンが押し下げられている 　かつ
            // this._MouseDownOn_flag == true;
            // opeButtonが押し下げられている　　　　かつ
            // this._OpeButton_clicked_flag  == true
            // ボーダー変更状態がアクティブである
            //this._BorderMoveOn_flag == true
            if(  (this._MouseDownOn_flag == true) && 
                  (this._BorderMoveOn_flag == true) ){
                    //borderの位置変更
                    this._line_pos = this.MouseX;

                    //ボーダーラインを描く
                    //this.drawBorderLine();
            }
        }

        // Mouse up の中にいれる処理
        inMouseUpHandler(event){
            
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;

            // 操作ボタンの解放
            this._OpeButton_clicked_flag = false;

            this._BorderMoveOn_flag = false;

            //左マウスボタンが　解放された
            this._MouseDownOn_flag = false;
            //操作ボタンのバックグラウンドを元にもどす。
            this.buttonElem.style.background = this._button_off_background;
        }
    }
//------------------------------------------------------------------------------
//------------------------Left Border Class  ここまで---------------------------
//-------------------------------------------------------------------------------



    //---------------------------------------------------------------- 
    //--------------------Right Border Class---------------------------
    //-----------------------------------------------------------------

    class RightBorder {

        _canvasWidth = 100;
        _canvasHeight = 100;
        _canvasHarfWidth = Math.floor( this._canvasWidth / 2);

        _line_pos = 100;

        //ボーダーの操作を開始するボタン
        _OpeButton_clicked_flag =false;

        //マウスの左ボタンが押されている
        _MouseDownOn_flag = false;

        //opeボタンがクリックされており　マウスの左ボタンがオンされていて
        // ボーダーラインの存在範囲にマウスのカーソルがはいっていれば
        _BorderMoveOn_flag = false;

        
        //操作　button が　押されているかどうか
        get isActive() {
            return this._OpeButton_clicked_flag;
        } 

        
        //ボタンのスタイルの取り込み
        set button_on_background(value){
            this._button_on_backgraound = value;
        }

        set button_off_background(value){
            this._button_off_background = value;
        }

        constructor ( buttonElem, ctx, canvasElem ){

            this._canvasWidth = canvasElem.width;
            this._canvasHeight = canvasElem.height;
            this._canvasHarfWidth = Math.floor( this._canvasWidth / 2 );
            this.ctx = ctx;
            this.buttonElem = buttonElem;

            this.OpeButtonClicked = () =>{

                //操作ボタンが押された
                this._OpeButton_clicked_flag = true;

                //buttonのバックグラウンドを変更する
                this.buttonElem.style.background = this._button_on_backgraound;
            }

            this.buttonElem.addEventListener('click',this.OpeButtonClicked);            
        }

        //ボーダーラインの位置
        set line_pos(value){
            this._line_pos = value;
        }

        get line_pos(){
            return this._line_pos;
        }

        //ボーダーラインを描く
        drawBorderLine(){
            let result_line = 200;   //関数内なので外部にもれない。

            
            //--------------追加 2024/12/28-------------------------------
            this._canvasWidth = canvasElem.width;
            this._canvasHeight = canvasElem.height;
            //console.log(this._canvasWidth,this._canvasHeight);

            this._canvasHarfWidth = Math.floor( this._canvasWidth / 2 );
            //--------------------追加　ここまで-----------------------------



            //もし　_line_pos が　画面の半分を超えたら　それ以上は行けない様にする
            if( this._line_pos < this._canvasHarfWidth + 10 ){
                result_line = this._canvasHarfWidth + 10;
            }else if( (this._canvasWidth - 1 )< this._line_pos){
                result_line = this._canvasWidth - 1;
            }else{
                result_line = this._line_pos;
            }

            ctx.strokeStyle = "blue";   //左：赤　右：青　水平：黒
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo( result_line, 0);
            ctx.lineTo( result_line, this._canvasHeight);
            ctx.stroke();
        }

        //ボーダーラインをチェックする
        checkBorderLine( event ){

            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;
                
            //ボーダーラインの検知巾の半分の値
            const width = 2;

            let result = false;

            if( ((this._line_pos - width ) <= this.MouseX) 
                     && ( this.MouseX <= (this._line_pos + width))){
                result = true;       
            }
            return result;
        }

        // MouseDouwハンドラの中に入れる処理
        inMouseDounHandler(event){

            //左マウスボタンが押されている
            this._MouseDownOn_flag = true;

            //ボーダーラインをチェックする
            if((this._OpeButton_clicked_flag == true ) && 
                (this.checkBorderLine(event) == true)){
                    this._BorderMoveOn_flag = true;
            }
        }

        // MouseMoveハンドラに入れる処理
        inMouseMoveHandler(event){
            
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;

            //マウスボタンが押し下げられている 　かつ
            // this._MouseDownOn_flag == true;
            // opeButtonが押し下げられている　　　　かつ
            // this._OpeButton_clicked_flag  == true
            // ボーダー変更状態がアクティブである
            //this._BorderMoveOn_flag == true
            if(  (this._MouseDownOn_flag == true) && 
                  (this._BorderMoveOn_flag == true) ){
                    //borderの位置変更
                    this._line_pos = this.MouseX;

                    //ボーダーラインを描く
                    //this.drawBorderLine();
            }
        }

        // Mouse up の中にいれる処理
        inMouseUpHandler(event){
            
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;

            // 操作ボタンの解放
            this._OpeButton_clicked_flag = false;

            this._BorderMoveOn_flag = false;

            //左マウスボタンが　解放された
            this._MouseDownOn_flag = false;
            //ボタンのバックグラウンドを元にもどす。
            this.buttonElem.style.background = this._button_off_background;
        }
    }
//------------------------------------------------------------------------------
//------------------------Right Border Class  ここまで---------------------------
//-------------------------------------------------------------------------------


    //---------------------------------------------------------------- 
    //--------------------Horizontal Border Class---------------------------
    //-----------------------------------------------------------------

    class HorizontalBorder {

        _canvasWidth = 100;
        _canvasHeight = 100;
        _canvasHarfWidth = Math.floor( this._canvasWidth / 2);

        _line_pos = 100;

        //ボーダーの操作を開始するボタン
        _OpeButton_clicked_flag = false;

        //マウスの左ボタンが押されている
        _MouseDownOn_flag = false;

        //opeボタンがクリックされており　マウスの左ボタンがオンされていて
        // ボーダーラインの存在範囲にマウスのカーソルがはいっていれば
        _BorderMoveOn_flag = false;

        
        //操作　button が　押されているかどうか
        get isActive() {
            return this._OpeButton_clicked_flag;
        } 

        
        //ボタンのスタイルの取り込み
        set button_on_background(value){
            this._button_on_backgraound = value;
        }

        set button_off_background(value){
            this._button_off_background = value;
        }

        constructor ( buttonElem, ctx, canvasElem ){

            this._canvasWidth = canvasElem.width;
            this._canvasHeight = canvasElem.height;
            this._canvasHarfWidth = Math.floor( this._canvasWidth / 2 );
            this.ctx = ctx;
            this.buttonElem = buttonElem;

            this.OpeButtonClicked = () =>{

                //操作ボタンが押された
                this._OpeButton_clicked_flag = true;

                //buttonのバックグラウンドを変更する
                this.buttonElem.style.background = this._button_on_backgraound;
            }

            this.buttonElem.addEventListener('click',this.OpeButtonClicked);            
        }

        //ボーダーラインの位置
        set line_pos(value){
            this._line_pos = value;
        }

        get line_pos(){
            return this._line_pos;
        } 

        //ボーダーラインを描く
        drawBorderLine(){
            let result_line = 200;   //関数内なので外部にもれない。
            
            //--------------追加 2024/12/28-------------------------------
            this._canvasWidth = canvasElem.width;
            this._canvasHeight = canvasElem.height;        
            //console.log(this._canvasWidth,this._canvasHeight);
            this._canvasHarfWidth = Math.floor( this._canvasWidth / 2 );
            //--------------------追加　ここまで-----------------------------

            if( this._line_pos < 0){
                this._line_pos = 0;
                result_line = 0;
            }else if( this._canvasHeight <   this._line_pos ){
                this._line_pos = this._canvasHeight;
                result_line = this._canvasHeight;
            }else{
                result_line = this._line_pos;
            }

            // ここでは　水平線を描く
            ctx.strokeStyle = "black";   //左：赤　右：青　水平：黒
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo( 0, result_line);
            ctx.lineTo( this._canvasWidth, result_line);
            ctx.stroke();
        }

        
        //水平ボーダーラインをチェックする
        checkBorderLine_H( event ){
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;  
            //ボーダーラインの検知巾の半分の値
            const width = 2;
            let result = false;

            if( ((this._line_pos - width ) <= this.MouseY) 
                && ( this.MouseY <= (this._line_pos + width))){
                result = true;
            }
            return result;
        }

        /*
        //垂直ボーダーラインをチェックする
        checkBorderLine( event ){
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;  
            //ボーダーラインの検知巾の半分の値
            const width = 2;
            let result = false;
            if( ((this._line_pos - width ) <= this.MouseX) 
                     && ( this.MouseX <= (this._line_pos + width))){
                result = true;       
            }
            return result;
        }
        */

        // MouseDouwハンドラの中に入れる処理
        inMouseDounHandler(event){

            //左マウスボタンが押されている
            this._MouseDownOn_flag = true;

            //ボーダーラインをチェックする
            if((this._OpeButton_clicked_flag == true ) && 
                (this.checkBorderLine_H(event) == true)){
                    this._BorderMoveOn_flag = true;
            }
        }

        // MouseMoveハンドラに入れる処理
        inMouseMoveHandler(event){
            
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;

            //マウスボタンが押し下げられている 　かつ
            // this._MouseDownOn_flag == true;
            // opeButtonが押し下げられている　　　　かつ
            // this._OpeButton_clicked_flag  == true
            // ボーダー変更状態がアクティブである
            //this._BorderMoveOn_flag == true
            if(  (this._MouseDownOn_flag == true) && 
                  (this._BorderMoveOn_flag == true) ){
                    //borderの位置変更
                    //垂直線の場合
                    //this._line_pos = this.MouseX;

                    //水平線の場合
                    this._line_pos = this.MouseY;

                    //ボーダーラインを描く
                    //this.drawBorderLine();
            }
        }

        // Mouse up の中にいれる処理
        inMouseUpHandler(event){
            
            //マウスの位置の取得
            this.MouseX = event.offsetX;
            this.MouseY = event.offsetY;

            // 操作ボタンの解放
            this._OpeButton_clicked_flag = false;

            //BorderLineの移動モード終了
            this._BorderMoveOn_flag = false;

            //左マウスボタンが　解放された
            this._MouseDownOn_flag = false;
            //ボタンのバックグラウンドを元にもどす。
            this.buttonElem.style.background = this._button_off_background;
        }
    }
//-------------------------------------------------------------------------------
//--------------------Horizontal Border Class  ここまで---------------------------
//-------------------------------------------------------------------------------



