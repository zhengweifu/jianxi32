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

// import BuyerShowPanel from './BuyerShowPanel';

import RaisedButton from '../../../Common/components/RaisedButton';

import PopupGroup from './PopupGroup';

import ImageItem from '../../../Common/components/ImageItem';

import ColorItem from '../../../Common/components/ColorItem';

import GeneralPropertiesPanel from './GeneralPropertiesPanel';

import TextPropertiesPanel from './TextPropertiesPanel';

import ColorSchemesPanel from './ColorSchemesPanel';

import NodePanel from './NodePanel';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { WEB_ROOT } from '../../../config';

import { DEFAULT_ACTIVE_COLOR, DEFAULT_GRAY_COLOR } from '../config';

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
    setTextShadowActiveIndex,
    setCanvasActiveIndex,
    addNodeData
} from '../actions';

import fabric from 'fabric';

// import { GetActiveObjectProps } from '../core';
import Product from '../Product';

// console.log(PatternLibrariesPanel.getWrappedInstance());
// import { AddText } from '../core'; 
import { separationShadow } from '../Product';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.clipStrokDefaultColor = 'rgba(255, 141, 92, 0.3)';
        this.clipStrokActiveColor = 'rgba(255, 141, 92, 1)';
    }

    setObjectProps(object) {
        let props = window.PRODUCT.GetActiveObjectProps();
        console.log('fefef: ', object.type);
        switch (object.type) {
            case 'curvedText':
                this.propertiesPanelGroup.setState({'opens': [false, true, false, false]});
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
                this.propertiesPanelGroup.setState({'opens': [false, false, true, false]});
                this.props.setImgPanelVisible(true);
                this.props.setGeneralPanelVisible(true);
                this.props.setTextPanelVisible(false);
                this.props.setGeneralPanelProps(props.generalProps);
                break;
            case 'path-group':
                this.propertiesPanelGroup.setState({'opens': [true, false, false, false]});
                this.props.setImgPanelVisible(false);
                this.props.setGeneralPanelVisible(true);
                this.props.setTextPanelVisible(false);
                this.props.setGeneralPanelProps(props.generalProps);
                break;
            default:
                this.propertiesPanelGroup.setState({'opens': [false, false, false, false]});
        }
    }

    setClipStroke(color) {
        if(this.shapes) {
            for(let shape of this.shapes) {
                for(let s of shape.paths) {
                    s.set({
                        stroke: color
                    });
                }
            }
            window.PRODUCT.canvas.renderAll();
        }
    }

    createProducts() {
        this.products = [];
        for(let i = 0, l = this.props.canvasItems.length; i < l; i++) {
            let product = new Product('viewport-2d-' + i, this.props.canvasWidth - 2, this.props.canvasHeight - 2);
            if(this.props.canvasItems[i]['clipSvg']) {
                fabric.loadSVGFromURL(this.props.canvasItems[i]['clipSvg'], (objects, options) => {
                    // console.log(objects);
                    let shape = fabric.util.groupSVGElements(objects, options);
                    // product.canvas.add(shape);
                    if(!this.shapes) {
                        this.shapes = [];
                    }
                    this.shapes.push(shape);
                    // console.log(this.shapes);
                    this.setClipStroke(this.clipStrokDefaultColor);
                    
                    product.canvas.clipTo = function (ctx) {
                        shape.render(ctx);
                    };
                    product.canvas.renderAll();
                });
            }
            product.canvas.on({
                'object:selected': options => {
                    // console.log('selected: ', options);
                    // console.log(GetActiveObjectProps());

                    let currentObject = options.target;

                    let nodeId  = currentObject.mid;
                    let aId = this.props.nodeData[this.props.canvasActiveIndex].items.findIndex(item => item.id === nodeId);
                    // console.log(nodeId, aId, this.props.nodeData.items);
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
                },

                'mouse:down': options => {
                    this.setClipStroke(this.clipStrokActiveColor);
                },

                'mouse:up': options => {
                    this.setClipStroke(this.clipStrokDefaultColor);
                }
            });
            this.products.push(product);
            this.props.addNodeData();
        }
    }

    setProductFromIndex(index) {
        if(window.PRODUCT) {
            window.PRODUCT.UnselectAll();
            this.props.setNodeActiveIndex(-1);
            this.props.setImgPanelVisible(false);
            this.props.setGeneralPanelVisible(false);
            this.props.setTextPanelVisible(false);
        }
        window.PRODUCT = this.products[index];
        this.props.setCanvasActiveIndex(index);
    }

    saveProject() {
        let outputData = {
            projectDatas: []
        };

        for(let p of this.products) {
            outputData.projectDatas.push(p.canvas.toJSON());
        }

    }

    componentDidMount() {
        console.log('componentDidMount');

        this.createProducts();
        this.setProductFromIndex(0);
    }

    renderCanvasItems() {
        const cols = this.props.canvasItems.length;

        const imgItems = this.props.canvasItems.map((item, index) => {
            const active = this.props.canvasActiveIndex === index ? true : false;
            return (
                <div key={'img-item-' + index} style={{textAlign: 'center'}}><ImageItem
                    active={active}
                    defaultBorderColor={DEFAULT_GRAY_COLOR}
                    activeColor={DEFAULT_ACTIVE_COLOR}
                    // img={item.genius}
                    img={item.img}
                    onClick={e => {
                        this.setProductFromIndex(index);
                    }}
                /></div>
            );
        });

        const canvasItems = this.props.canvasItems.map((item, index) => {
            return (
                <div key={'canvas-item-' + index} style={{display: this.props.canvasActiveIndex === index ? 'block' : 'none'}}>
                <canvas
                    id={'viewport-2d-' + index}
                    style={{
                        width: this.props.canvasWidth,
                        height: this.props.canvasHeight,
                        borderBottom: `1px solid ${DEFAULT_GRAY_COLOR}`,
                        boxSizing: 'border-box'
                    }}>
                </canvas>
                </div>
            );
        });

        const currentBGImageURL = this.props.canvasItems[this.props.canvasActiveIndex] ? this.props.canvasItems[this.props.canvasActiveIndex].img : '';

        return (
            <div style={{
                border: `1px solid ${DEFAULT_GRAY_COLOR}`,
                boxSizing: 'border-box'
                }}>
                <div style={{
                    backgroundImage: currentBGImageURL ? `url('${currentBGImageURL}')` : ''
                    }}>
                    {canvasItems}
                </div>
                <div style={{textAlign: 'center', margin: '6px 0px'}}>
                    <GridList
                        style={{display: 'inline-block'}}
                        cellHeight={100}
                        cols={0}>
                        {imgItems}
                    </GridList>
                </div>
            </div>
        );
    }

    render() {
        const heartSvg = <SvgIcon 
            style={{margin: '0px 2px 0px 2px'}}
            color={DEFAULT_ACTIVE_COLOR}
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
                        // border: `1px solid ${DEFAULT_GRAY_COLOR}`,
                        boxSizing: 'border-box'
                        }}>
                        {this.renderCanvasItems()}
                    </div>
                </Col>
                <Col gutter={0} width={(this.props.controllerWidth + centerSpace) / mlenght}>
                    <div style={{
                            // border: `1px solid ${DEFAULT_GRAY_COLOR}`,
                            boxSizing: 'border-box',
                            height: this.props.controllerHeight,
                            paddingLeft: centerSpace
                        }}>
                        <ProductHeaderPanel bgColor={DEFAULT_ACTIVE_COLOR} productDescribtion='AIR100000000音响'/>

                        <div>
                            <span style={{
                                marginRight: 10,
                                fontSize: 25,
                                color: DEFAULT_ACTIVE_COLOR}}>
                                ¥59
                            </span>
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
                        <CreateNodePanel bgColor={DEFAULT_ACTIVE_COLOR} fbColor={DEFAULT_GRAY_COLOR}/>
                        <div style={{marginTop: 10}}></div>
                        <PopupGroup items={[
                            {title: '一般属性', height: 290, visible: this.props.generalPanelVisible, content: <GeneralPropertiesPanel />, zDepth: 8},
                            {title: '文字属性', height: 290, visible: this.props.textPanelVisible, content: <TextPropertiesPanel />, zDepth: 4},
                            {title: '色彩风格', height: 290, visible: this.props.imgPanelVisible, content: <ColorSchemesPanel />, zDepth: 4},
                            {title: '节点面板', height: 290, visible: true, content: <NodePanel />, zDepth: 1}
                        ]} ref={ref => this.propertiesPanelGroup = ref }/>
                        <RaisedButton
                            label='保存我的方案'
                            bgColor={CYAN500}
                            fullWidth={true}
                            onClick={this.saveProject.bind(this)}
                        />
                    </div>
                </Col>
            </Grid>
        </div> 
        );
    }
}

App.defaultProps = {
    canvasWidth: 602,
    canvasHeight: 482,
    controllerWidth: 400,
    controllerHeight: 590
};

App.propTypes = {
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
        nodeData: state.canvasData.nodeData,
        colorItems: state.textColorPanelData.colors,
        strokeColorItems: state.textStrokePanelData.colors,
        shadowColorItems: state.textShadowPanelData.colors,
        canvasActiveIndex: state.canvasData.activeIndex,
        canvasItems: state.canvasData.items
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
        setTextShadowActiveIndex,
        setCanvasActiveIndex,
        addNodeData
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
