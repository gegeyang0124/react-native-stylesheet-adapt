import {
    Dimensions,
    StyleSheet,
} from 'react-native';

/**
 * 横向需要转化的样式属性数组
 * **/
const styleConvertArrWidth = [
    "width","borderRadius","borderTopLeftRadius", "borderBottomLeftRadius",
    "borderBottomRightRadius","borderTopRightRadius", "padding","paddingLeft",
    "paddingRight", "marginLeft","marginRight", "left","right","fontSize"
];

/**
 * 纵向需要转化的样式属性数组
 * **/
const styleConvertArrHeight = [
    "height","paddingTop","paddingBottom","margin","marginTop","marginBottom",
    "top","bottom","borderWidth","borderTopWidth","borderLeftWidth","borderRightWidth",
    "borderBottomWidth"
];

/**
 * 样式表创建，适配各种机型、各种屏幕 与StyleSheet用法一致
 * **/
export default class StyleSheetAdapt{

    /**
     * 页面设计大小 {width:768,height:1024};//页面设计大小
     * **/
    static designSize = {width:768,height:1024};//designSize = {width:768,height:1024};//页面设计大小

    /**
     * 转化后的style json 对象
     * **/
    static stylesJson;

    /**
     * 屏幕长宽分辨率json
     * **/
    static screen = Dimensions.get('window');

    /**
     * 屏幕与设计适配比率
     * widthScale 宽度比率
     * heightScale 高度比率
     * **/
    static scale = {
        widthScale: 1,
        heightScale: 1,
    };

    /**
     * 获取适配比例
     * **/
    static getScale(){
        this.screen = Dimensions.get('window');
        const designSize = this.screen.width > this.screen.height
            ? {
                width:this.designSize.height,
                height:this.designSize.width
            }
            : this.designSize;

        this.scale = {
            widthScale: this.screen.width / designSize.width,
            heightScale: this.screen.height / designSize.height,
        };
    }

    /**
     * 获取横向的与屏幕的相对长度  数字后面可加以下字符
     * @prama width ;//横向宽度值,特殊值是'w'取屏幕宽, 不传也取屏幕宽 若加字符，加数字后面
     * //'dw' 获取相对当前屏幕的设计宽比的宽
     * //'w' 获取相对当前屏幕宽的宽
     * //'n' 不进行屏幕比缩放
     * //'dh' 获取相对当前屏幕的设计高比的宽
     * //'h' 获取相对当前屏幕高比的宽
     * **/
    static getWidth(width){
        this.getScale();

        if(width == undefined)
        {
            width = this.screen.width;
        }
        else
        {
            if(typeof (width) == 'string')
            {

                //'s':随屏幕调整布局
                if(width.indexOf('s') > -1){
                    width = width.replace('s', '');
                    /*let p = /[a-zA-Z]/i;
                    let b = p.test(width);//true,说明有英文字母
                    if(b){
                        if(width.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的宽
                        {
                            width = width.replace('dw', '');
                            width = width == '' ? screenGet.width : width;
                            width = parseFloat(width);

                            width =  this.scaleS.widthScale * width;
                        }
                        else if(width.indexOf('w') > -1)//获取相对当前屏幕宽的宽
                        {
                            width = width.replace('w', '');
                            width = width == '' ? 1 : width;
                            width = parseFloat(width);
                            width = width * screenGet.width;
                        }
                        else if(width.indexOf('n') > -1)//不进行屏幕比缩放
                        {
                            width.replace('n', '');
                            width = parseFloat(width);
                        }
                        else  if(width.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的宽
                        {
                            width = width.replace('dh', '');
                            width = width == '' ? screenGet.height : width;
                            width = parseFloat(width);

                            width =  this.scaleS.heightScale * width;
                        }
                        else  if(width.indexOf('h') > -1)//获取相对当前屏幕高比的宽
                        {
                            width = width.replace('h', '');
                            width = width == '' ? 1 : width;
                            width = parseFloat(width);
                            width = width * screenGet.height;
                        }
                    }
                    else {
                        width = parseFloat(width);
                        width =  this.scaleS.widthScale * width;
                    }*/
                }

                if(width.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的宽
                {
                    width = width.replace('dw', '');
                    width = width == '' ? this.screen.width : width;
                    width = parseFloat(width);

                    width =  this.scale.widthScale * width;
                }
                else if(width.indexOf('w') > -1)//获取相对当前屏幕宽的宽
                {
                    width = width.replace('w', '');
                    width = width == '' ? 1 : width;
                    width = parseFloat(width);

                    width = width * this.screen.width;
                }
                else if(width.indexOf('n') > -1)//不进行屏幕比缩放
                {
                    width.replace('n', '');
                    width = parseFloat(width);
                }
                else  if(width.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的宽
                {
                    width = width.replace('dh', '');
                    width = width == '' ? this.screen.height : width;
                    width = parseFloat(width);

                    width =  this.scale.heightScale * width;
                }
                else  if(width.indexOf('h') > -1)//获取相对当前屏幕高比的宽
                {
                    width = width.replace('h', '');
                    width = width == '' ? 1 : width;
                    width = parseFloat(width);

                    width = width * this.screen.height;
                }
                else
                {
                    width = parseFloat(width);

                    width =  this.scale.heightScale * width;
                }

            }
            else//获取相对当前屏幕的设计宽比的宽
            {
                width =  this.scale.widthScale * width;
            }
        }


        return width;
    }

    /**
     * 获取纵向的与屏幕的相对高度 数字后面可加以下字符
     * @prama height ;//纵向高度值, 特殊值是'h'取屏幕高；不传也取屏幕高,若加字符，加数字后面
     * //'dw' 获取相对当前屏幕的设计宽比的宽
     * //'w' 获取相对当前屏幕宽的宽
     * //'n' 不进行屏幕比缩放
     * //'dh' 获取相对当前屏幕的设计高比的宽
     * //'h' 获取相对当前屏幕高比的宽
     * **/
    static getHeight(height){
        this.getScale();

        if(height == undefined)
        {
            height = this.screen.height;
        }
        else
        {

            if(typeof (height) == 'string'){

                if(height.indexOf('s') > -1){
                    height = height.replace('s', '');

                    /*let p = /[a-zA-Z]/i;
                    let b = p.test(height);//true,说明有英文字母
                    if(b){
                        if(height.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的高
                        {
                            height = height.replace('dh', '');
                            height = height == '' ? screenGet.height : height;
                            height = parseFloat(height);

                            height =  this.scaleS.heightScale * height;
                        }
                        else if(height.indexOf('h') > -1)//获取相对当前屏幕高的高
                        {
                            height = height.replace('h', '');
                            height = height == '' ? 1 : height;
                            height = parseFloat(height);
                            height = height * screenGet.height;
                        }
                        else if(height.indexOf('n') > -1)//不进行屏幕比缩放
                        {
                            height.replace('n', '');
                            height = parseFloat(height);
                        }
                        else  if(height.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的高
                        {
                            height = height.replace('dw', '');
                            height = height == '' ? screenGet.width : height;
                            height = parseFloat(height);

                            height =  this.scaleS.widthScale * height;
                        }
                        else  if(height.indexOf('w') > -1)//获取相对当前屏幕宽比的高
                        {

                            height = height.replace('w', '');
                            height = height == '' ? 1 : height;
                            height = parseFloat(height);
                            height = height * screenGet.width;
                        }
                    }
                    else {
                        height = parseFloat(height);
                        height =  this.scaleS.heightScale * height;
                    }*/
                }

                if(height.indexOf('dh') > -1)//获取相对当前屏幕的设计高比的高
                {
                    height = height.replace('dh', '');
                    height = height == '' ? this.screen.height : height;
                    height = parseFloat(height);

                    height =  this.scale.heightScale * height;
                }
                else if(height.indexOf('h') > -1)//获取相对当前屏幕高的高
                {
                    height = height.replace('h', '');
                    height = height == '' ? 1 : height;
                    height = parseFloat(height);
                    height = height * this.screen.height;
                }
                else if(height.indexOf('n') > -1)//不进行屏幕比缩放
                {
                    height.replace('n', '');
                    height = parseFloat(height);
                }
                else  if(height.indexOf('dw') > -1)//获取相对当前屏幕的设计宽比的高
                {
                    height = height.replace('dw', '');
                    height = height == '' ? this.screen.width : height;
                    height = parseFloat(height);

                    height =  this.scale.widthScale * height;
                }
                else  if(height.indexOf('w') > -1)//获取相对当前屏幕宽比的高
                {
                    height = height.replace('w', '');
                    height = height == '' ? 1 : height;
                    height = parseFloat(height);
                    height = height * this.screen.width;
                }
                else
                {
                    height = parseFloat(height);
                    height =  this.scale.widthScale * height;
                }

            }
            else //获取相对当前屏幕的设计高比的高
            {
                height =  this.scale.heightScale * height;
            }
        }

        return height;
    }

    /**
     * 得到样式属性适配值
     * @prama key ;//样式属性名，也是json的key
     * @prama val ;//样式属性值，也是json的key的值
     * **/
    static getAdaptVal(key,val){

        let isConvertWidth = false;
        let isConvertHeight = false;

        styleConvertArrWidth.forEach(function (val,index,arr) {

            isConvertWidth = key == val ? true : isConvertWidth;

        });
        styleConvertArrHeight.forEach(function (val,index,arr) {

            isConvertHeight = key == val ? true : isConvertHeight;

        });

        if(isConvertWidth)
        {
            val = this.getWidth(val);
        }
        else if(isConvertHeight)
        {
            val = this.getHeight(val);
        }

        return val;

    }

    /**
     * 样式属性json中的值适配
     * @prama styleJson json ;//样式属性json
     * **/
    static styleJsonAdaptConvert(styleJson){

        for(let key in styleJson)
        {
            // console.info("key",key);
            // key.constructor == Object //对象
            if(key.constructor == Array) //数组
            {
                key.forEach((v,i,a)=>{
                    v = this.styleJsonAdaptConvert(v);
                });
            }
            else if(typeof(styleJson[key]) == 'object')//对象
            {
                styleJson[key] = this.styleJsonAdaptConvert(styleJson[key]);
            }
            else
            {
                /*if(key == "padding")
                 {
                 styleJson["paddingLeft"] = styleJson["paddingLeft"] == undefined ? styleJson[key] :
                 }
                 else if(key == "margin")
                 {

                 }*/

                styleJson[key] = this.getAdaptVal(key,styleJson[key]);
            }

        }

        return styleJson;
    }

    /**
     * 创建样式表单
     * @prama json ;//样式属性json
     * **/
    static create(styleJson) {
        this.stylesJson = this.styleJsonAdaptConvert(styleJson);
        return StyleSheet.create(this.stylesJson );
    }

    /**
     * 得到样式属性的json对象
     * @param styleID；//style样式表的句柄（ID）
     * **/
    static getStyle(styleID) {

        var style = {};
        if(typeof(styleID) == 'object')
        {
            style = styleID;
        }
        else
        {
            var s = JSON.stringify(styleID) + '';

            if (s != 'undefined') {
                style = StyleSheet.flatten(styleID);
            }

            style = JSON.parse(JSON.stringify(style));
        }

        return style;

    }
}