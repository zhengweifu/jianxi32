import React from 'react';

import ProductNumber from './ProductNumber';

import Grid from '../../../Common/components/Grid';
import Col from '../../../Common/components/Col';

import GridList from '../../../Common/components/GridList';

import SvgIcon from '../../../Common/components/SvgIcon';

import { heart } from '../../../Common/svgIcons/janexi/Basic';

import { CYAN500, GREY500, GREY200 } from '../../../Common/styles/colors';

import ProductHeaderPanel from './ProductHeaderPanel';

import CreateNodePanel  from './CreateNodePanel';

import BuyerShowPanel from './BuyerShowPanel';

import PopupGroup from './PopupGroup';

import ImageItem from '../../../Common/components/ImageItem';

import ColorItem from '../../../Common/components/ColorItem';

import GeneralPropertiesPanel from './GeneralPropertiesPanel';

import TextPropertiesPanel from './TextPropertiesPanel';

import ColorSchemesPanel from './ColorSchemesPanel';

import NodePanel from './NodePanel';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { 
    setGeneralPanelVisible, 
    setTextPanelVisible, 
    setImgPanelVisible, 
    setNodeActiveIndex,
    setGeneralPanelProps, 
    setTextPanelProps, 
    setImgPanelProps,
    setTextColorActiveIndex,
    setTextStrokeActiveIndex,
    setTextShadowActiveIndex
} from '../actions';

import fabric from 'fabric';

// import { GetActiveObjectProps } from '../core';
import Product from '../Product';

// console.log(PatternLibrariesPanel.getWrappedInstance());
// import { AddText } from '../core'; 
import { separationShadow } from '../Product';

class App extends React.Component {
    setObjectProps(object) {
        let props = window.PRODUCT.GetActiveObjectProps();
        // console.log('fefef: ', object.type);
        switch (object.type) {
            case 'curvedText':
                this.props.setImgPanelVisible(false);
                this.props.setGeneralPanelVisible(true);
                this.props.setTextPanelVisible(true);
                this.props.setGeneralPanelProps(props.generalProps);
                this.props.setTextPanelProps(props.textProps);
                this.props.setTextColorActiveIndex(this.props.colorItems.findIndex(item => item == props.textProps.fill));
                this.props.setTextStrokeActiveIndex(this.props.strokeColorItems.findIndex(item => item == props.textProps.stroke));
                this.props.setTextShadowActiveIndex(
                    this.props.shadowColorItems.findIndex(item => item == separationShadow(props.textProps.shadow).color)
                );
                break;
            case 'image':
                this.props.setImgPanelVisible(true);
                this.props.setGeneralPanelVisible(true);
                this.props.setTextPanelVisible(false);
                this.props.setGeneralPanelProps(props.generalProps);
                break;
            default:
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        let product = window.PRODUCT = new Product('viewport-2d', this.props.canvasWidth - 2, this.props.canvasHeight - 2);

        // AddText('mynameiszhengweifu');
        window.PRODUCT.canvas.on({
            'object:selected': options => {
                // console.log('selected: ', options);
                // console.log(GetActiveObjectProps());

                let currentObject = options.target;

                let nodeId  = currentObject.mid;
                let aId = this.props.nodeData.items.findIndex(item => item.id === nodeId);
                console.log(nodeId, aId, this.props.nodeData.items);
                this.props.setNodeActiveIndex(aId);

                this.setObjectProps(currentObject);
            },

            'selection:cleared': options => {
                // console.log('unselected: ', options);
                this.props.setNodeActiveIndex(-1);

                this.props.setImgPanelVisible(false);
                this.props.setGeneralPanelVisible(false);
                this.props.setTextPanelVisible(false);
            },

            'object:modified': options => {
                let currentObject = options.target;
                this.setObjectProps(currentObject);
            }
        });
    }

    render() {
        const heartSvg = <SvgIcon 
            style={{margin: '0px 2px 0px 2px'}}
            color={this.props.tangerine}
            width={14} height={14} 
            viewBox='0 0 512 512' >
            <path d={heart} />
        </SvgIcon>;
        // style={{width: this.props.canvasWidth + this.props.controllerWidth + 15, margin: 'auto'}}
        const centerSpace = 15;
        const mlenght = this.props.canvasWidth + this.props.controllerWidth + centerSpace;

        return (
        <div>
            <Grid gutter={0} style={{width: mlenght, margin: 'auto'}}>
                <Col gutter={0} width={this.props.canvasWidth / mlenght}>
                    <div style={{
                        border: `1px solid ${this.props.grayeee}`,
                        boxSizing: 'border-box'
                        }}>
                        <canvas
                            id='viewport-2d'
                            style={{
                                width: this.props.canvasWidth - 2,
                                height: this.props.canvasHeight - 2,
                                borderBottom: `1px solid ${this.props.grayeee}`,
                                boxSizing: 'border-box'
                                }}>
                        </canvas>

                        <div style={{width: '50%', margin: '10px auto'}}>
                            <GridList
                                cellHeight={100}
                                cols={3}>
                                <ImageItem
                                    defaultBorderColor={this.props.grayeee}
                                    activeColor={this.props.tangerine}
                                    img='/jianxi32/Public/src/Home/jy/images/tx01.jpg'/>
                                <ImageItem
                                    defaultBorderColor={this.props.grayeee}
                                    activeColor={this.props.tangerine}
                                    img='/jianxi32/Public/src/Home/jy/images/tx01.jpg'/>
                                <ImageItem
                                    defaultBorderColor={this.props.grayeee}
                                    activeColor={this.props.tangerine}
                                    img='/jianxi32/Public/src/Home/jy/images/tx01.jpg'/>
                            </GridList>
                        </div>
                    </div>
                </Col>
                <Col gutter={0} width={(this.props.controllerWidth + centerSpace) / mlenght}>
                    <div style={{
                            // border: `1px solid ${this.props.grayeee}`,
                            boxSizing: 'border-box',
                            height: this.props.controllerHeight,
                            paddingLeft: centerSpace
                        }}>
                        <ProductHeaderPanel bgColor={this.props.tangerine} productDescribtion='AIR100000000圆领 女款'/>

                        <div>
                            <span style={{
                                marginRight: 10,
                                fontSize: 25,
                                color: this.props.tangerine}}>
                                $59
                            </span>
                            {heartSvg}
                            {heartSvg}
                            {heartSvg}
                            {heartSvg}
                            {heartSvg}
                            <span style={{
                                padding: '0px 20px 0px 5px',
                                fontSize: 16,
                                color: this.props.tangerine}}>4.7</span>
                            <span>(
                                <a >96个评价</a>
                            )</span>
                        </div>

                        <div style={{marginTop: 10}}></div>

                        <GridList gutter={35}>
                            <ProductNumber />
                            <GridList cols={5}>
                                <div style={{color: GREY500, lineHeight: '24px', height: 24, verticalAlign: 'middle'}}>颜色</div>
                                <ColorItem width={24} height={24}/> 
                            </GridList>
                        </GridList>
                        <div style={{marginTop: 10}}></div>
                        <CreateNodePanel bgColor={this.props.tangerine} fbColor={this.props.grayeee}/>
                        <div style={{marginTop: 10}}></div>
                        <PopupGroup items={[
                            {title: '一般属性', height: 280, visible: this.props.generalPanelVisible, content: <GeneralPropertiesPanel />, zDepth: 8},
                            {title: '文字属性', height: 280, visible: this.props.textPanelVisible, content: <TextPropertiesPanel />, zDepth: 4},
                            {title: '色彩风格', height: 280, visible: this.props.imgPanelVisible, content: <ColorSchemesPanel />, zDepth: 4},
                            {title: '节点面板', height: 280, visible: true, content: <NodePanel />, zDepth: 1}
                        ]}/>
                    </div>
                </Col>
            </Grid>
            <div style={{margin: '0px 20px'}}>
                <BuyerShowPanel items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
            </div>
        </div> 
        );
    }
}

App.defaultProps = {
    tangerine: '#ff8d5c',
    grayeee: GREY200,
    canvasWidth: 600,
    canvasHeight: 480,
    controllerWidth: 400,
    controllerHeight: 590
};

App.propTypes = {
    tangerine: React.PropTypes.string,
    grayeee: React.PropTypes.string,
    canvasWidth: React.PropTypes.number,
    canvasHeight: React.PropTypes.number,
    controllerWidth:React.PropTypes.number,
    controllerHeight: React.PropTypes.number
};

function mapStateToProps(state) {
    return {
        generalPanelVisible: state.generalPanelData.visible,
        textPanelVisible: state.textPanelData.visible,
        imgPanelVisible: state.imgPanelData.visible,
        nodeData: state.nodeData,
        colorItems: state.textColorPanelData.colors,
        strokeColorItems: state.textStrokePanelData.colors,
        shadowColorItems: state.textShadowPanelData.colors
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setGeneralPanelVisible,
        setTextPanelVisible,
        setImgPanelVisible,
        setGeneralPanelProps,
        setTextPanelProps,
        setImgPanelProps,
        setNodeActiveIndex,
        setTextColorActiveIndex,
        setTextStrokeActiveIndex,
        setTextShadowActiveIndex
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
