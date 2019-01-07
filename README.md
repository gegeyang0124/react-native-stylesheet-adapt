# react-native-stylesheet-adapt
StyleSheet样式表创建，适配各种机型、各种屏幕 与StyleSheet用法一致

###  安装组件：
npm i --save react-native-stylesheet-adapt

##### StyleSheetAdapt 样式表创建，适配各种机型、各种屏幕 与StyleSheet用法一致 (方法参数，进入源文件查看，里面详细注解)：
```javascript
StyleSheetAdapt.create();//创建样式表单
StyleSheetAdapt.getStyle();//得到样式属性的json对象
StyleSheetAdapt.designSize = {width:768,height:1024};// 设置页面设计大小 可不设置 默认设计大小12寸平板电脑（{width:768,height:1024}）

//数字后面可加以下字符 若加字符，加数字后面
//'dw' 获取相对当前屏幕的设计宽比的宽
//'w' 获取相对当前屏幕宽的宽
//'n' 不进行屏幕比缩放
//'dh' 获取相对当前屏幕的设计高比的宽
//'h' 获取相对当前屏幕高比的宽
//如：
const styles = StyleSheetAdapt.create({
    testStyle2:{
        width:'0.1w',//屏幕宽的10分之1
        height:'0.1h',//屏幕高的10分之1
    },
    testStyle3:{
            width:'100dw',//按设计大小宽比适配 会随屏幕调整布局
            height:'100dw',//按设计大小宽比适配
        },
    testStyle:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});//创建样式表单
```

### 示例
```javascript
import StyleSheetAdapt from "react-native-stylesheet-adapt";
import React, {Component} from 'react';
import {View} from 'react-native';

/**
设置页面设计大小（只需设置一次） 可不设置
默认设计大小12寸平板电脑（{width:768,height:1024}）
**/
StyleSheetAdapt.designSize = {width:768,height:1024};
const styles = StyleSheetAdapt.create({
    testStyle2:{
        width:100,
        height:200,
    },
    testStyle:{
        transform:[
            {rotateX:'180deg'}
        ],
    },
});//创建样式表单
//StyleSheetAdapt.styleJsonAdaptConvert();//样式属性json中的值适配

type Props = {};
export default class Test extends Component<Props> {

    constructor(props) {
        super(props);

    }

    alert(){
        //与react-native 中的Alert用法一致
        Alert.alert();
    }

    componentWillMount(){

    }

    componentDidMount() {
    }

    render() {

        const {resultEstimateData,noticesData,resultFinishProgress,
            tripListData,customerObj,isNews,pictures,path,dataSize,picture} = this.state;

        return (
             <View>
                            <View style={styles.testStyle}></View>
                            <View style={StyleSheetAdapt.testStyle2}></View>
                            <View style={StyleSheetAdapt.styleJsonAdaptConvert({
                                width:100,
                                height:200,
                            })}></View>
           </View>
        );
    }
}
```

### 欢迎交流
欢迎提问交流；若有bug，请添加bug截图或代码片段，以便更快更好的解决问题。<br>
欢迎大家一起交流

### [我的博客](http://blog.sina.com.cn/s/articlelist_6078695441_0_1.html)

