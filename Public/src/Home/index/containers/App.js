import React, { Component } from 'react';

import NavBar from '../../basic/components/NavBar';

import ProductItem from '../../basic/components/ProductItem';

import { WEB_ROOT, INTERFACE_ROOT, FONT_FAMILY } from '../../../config';

import GridList from '../../../Common/components/GridList';

import RaisedButton from '../../../Common/components/RaisedButton';

import SvgIcon from '../../../Common/components/SvgIcon';

import { SCREEN_SIZE, GetDocumentSize } from '../../../Common/utils/basic';

import { keyboardArrowRight } from '../../../Common/svgIcons/google/Hardware';

import { phone, email } from '../../../Common/svgIcons/google/Communication';

import ReactSwipe from 'react-swipe';

import { BasicColor, ActiveColor } from '../config';

import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            products: [],
            docWidth: GetDocumentSize().width
        };

        // 从接口获取数据
        axios.get(INTERFACE_ROOT + 'Home/Index/getInitData').then(response => {
            const data = response.data;
            this.setState({
                products: data.products,
                banners: data.banners
            });
        });

        window.addEventListener('resize', event => {
            this.setState({docWidth: GetDocumentSize().width});
        }, false );

        document.addEventListener('wheel', (e) => {
            console.log(window.pageYOffset, document.body.scrollTop);
        }, false);
    }

    render() {
        let porductCount = 3, profileCount = 2, contactUSCount = 2, contactUSGutter = 200;
        if(this.state.docWidth < SCREEN_SIZE.md && this.state.docWidth >= SCREEN_SIZE.sm) {
            porductCount = 2;
            contactUSGutter = 100;
        } else if(this.state.docWidth < SCREEN_SIZE.sm) {
            porductCount = 1;
            profileCount = 1;
            contactUSCount = 1;
            contactUSGutter = 0;
        }

        // 渲染产品元素
        const productElements = this.state.products.map((product, index) => {
            return <ProductItem onButtonClick={e => {
                window.location.href = product.link;
            }} buttonBgColor={product.buttonclassname} img={product.path} labelheader={product.labelheader} labelbody={product.labelbody}/>;
        });

        const bannerElements = this.state.banners.map((banner, index) => {
            return <div key={`banner_item_${index}`}><div style={{
                    width: '100%',
                    height: this.state.docWidth < SCREEN_SIZE.md ? 500 : 800,
                    backgroundImage: `url(${banner.url})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    position: 'relative'
                }}>
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: 120
                }}><p style={{fontSize: 30, marginBottom: 10, fontFamily: FONT_FAMILY}}>{banner.labelheader}</p>
                <p style={{fontSize: 16, marginBottom: 10, fontFamily: FONT_FAMILY}} dangerouslySetInnerHTML={{__html: banner.labelcontent}}></p>
                <RaisedButton label='马上体验' bgColor={banner.buttonclassname} fontSize={18} rightIcon={
                    <SvgIcon>
                        <path d={keyboardArrowRight} />
                    </SvgIcon>
                } onClick={e => {
                    window.location.href = banner.link;
                }} fontFamily={FONT_FAMILY} style={{
                    boxShadow: 'none',
                    borderRadius: 0
                }} styleButton={{
                    padding: '5px 15px'
                }}/></div>
            </div></div>;
        });

        const bannerElement = this.state.banners.length > 0 ? <ReactSwipe swipeOptions={{
            startSlide: 1,
            speed: 400,
            auto: 3000,
            continuous: true
        }}>{bannerElements}</ReactSwipe> : '';

        // 公司简介图片的样式
        const profileImgStyle = {
            width: '100%',
            height: 350,
            
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain'
        };

        // 公司简介文字标题的样式
        const titleStyle = {
            color: ActiveColor,
            marginBottom: 10,
            fontSize: 30,
            fontFamily: FONT_FAMILY
        };

        // 公司简介文字头部的样式
        const headerStyle = {
            marginBottom: 10,
            fontSize: 18,
            fontFamily: FONT_FAMILY
        };

        // 公司简介文字内容的样式
        const contentStyle = {
            fontSize: 14,
            fontFamily: FONT_FAMILY
        };

        // 渲染公司简介元素
        const companyProfileElement = <div><GridList cols={profileCount} gutter={40}>
            <div style={Object.assign({}, profileImgStyle, {backgroundImage: `url(${WEB_ROOT}Public/imgs/tt01.png)`})}></div>
            <div style={{margin: '10px 0px'}}>
                <p style={titleStyle}>理想</p>
                <p style={headerStyle}>简兮简兮.方将万舞</p>
                <p style={contentStyle}>世界正在变的越来越多元化，简兮生活馆为多元化生活而生，这个舞台也许还不够庞大，但个性与精致在这里不停地生长，我们希望更多的人站上这个舞台，如诗经云：简兮简兮.方将万舞。这里是示例文案。世界正在变的越来越多元化，简兮生活馆为多元化生活而生，这个平台也许还不够庞大，但个性与精致在这里不停地生长。这里是示例文案。世界正在变的越来越多元化，简兮生活馆为多元化生活而生，这个平台也许还不够庞大，但个性与精致在这里不停地生长。这里是示例文案。</p>
            </div>
        </GridList><GridList cols={profileCount} gutter={40}>
            <div style={{margin: '10px 0px'}}>
                <p style={titleStyle}>行动</p>
                <p style={headerStyle}>简兮简兮.方将万舞</p>
                <p style={contentStyle}>上海简兮网络技术有限公司是一家专注Web开发应用的综合服务提供商。简兮科技主要致力于Web2D和Web3D开发应用。Web2D，主要是通过领先的H5技术完成在线图片编工具，辑被誉为线上的“PS”。该技术被广泛用于在线DIY定制服务，比如：在线DIY T恤图案定制、在线DIY手机壳定制、等等的图片在线DIY定制工具。Web3D，相比起目前网上主流的以图片、FLASH、动画的展示方式来说，WEB3D技术让用户有了浏览的自主感，可以以自己的角度去观察，还有许多虚拟特效和互动操作。使用Web3D实现网络上的虚拟现实展示（VR）对于建筑房地产虚拟漫游展示、产品模拟动态展示提供了优秀的解决方案。</p>
            </div>
            <div style={Object.assign({}, profileImgStyle, {backgroundImage: `url(${WEB_ROOT}Public/imgs/tt02.png)`})}></div>
        </GridList></div>;

        

        // 容器的样式
        const containerStyle = {
            width: this.state.docWidth >= 970 ? 970 : '90%',
            padding: '100px 0px',
            margin: 'auto'
        };

        const spliteElement = <div style={{width: '100%', borderBottom: `2px solid ${ActiveColor}`}}></div>;

        const contactUSStyle = {
            margin: '10px 0px',
            padding: '20px 0px',
            borderRadius: 5,
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
        };

        const contactUSElement = <GridList center={true} gutter={contactUSGutter} cols={contactUSCount}>
            <div style={contactUSStyle}><SvgIcon color='#000'>
                <path d={phone}/>
            </SvgIcon><span style={{paddingLeft: 10, paddingTop: 4, fontFamily: FONT_FAMILY}}>18521092332 | 18521597226</span></div>
            <div style={contactUSStyle}><SvgIcon color='#000'>
                <path d={email}/>
            </SvgIcon><span style={{paddingLeft: 10, paddingTop: 4, fontFamily: FONT_FAMILY}}>Janexi@21cn.com</span></div>
        </GridList>;


        const footElement = <div style={{textAlign: 'center'}}>
            <p style={contentStyle}>© 2015-2018 简兮网络版权所有 沪ICP备05036958号</p>
        </div>;

        

        return <div>
            <NavBar logo={`${WEB_ROOT}Public/imgs/${this.state.docWidth < SCREEN_SIZE.md ? 'logo_no' : 'logo'}.png`}
                height={this.state.docWidth < SCREEN_SIZE.md ? 60 : 84}
                items={['首页', '产品展示', '公司简介', '关于我们']} rootStyle = {{
                    position: 'fixed',
                    zIndex: 15,
                    borderBottom: `2px solid ${ActiveColor}`
                }} onItemClick={(e, item, index) => {
                    let scrollTop;
                    switch(index) {
                        case 0:
                            scrollTop = 0;
                            break;
                        case 1:
                            scrollTop = this.jxProductLabel.offsetTop;
                            break;
                        case 2:
                            scrollTop = this.jxIntrodutionLabel.offsetTop;
                            break;
                        case 3:
                            scrollTop = this.jxAboutLabel.offsetTop;
                            break;
                    }
                    // console.log(scrollTop);
                    if(scrollTop !== undefined) {
                        window.scrollTo(0, scrollTop);
                    }
                }}
            />
            {bannerElement}
            {spliteElement}
            <div style={containerStyle} ref={ref => this.jxProductLabel = ref}><GridList cols={porductCount}>
                {productElements}
            </GridList></div>
            {spliteElement}
            <div style={containerStyle} ref={ref => this.jxIntrodutionLabel = ref}>
                {companyProfileElement}
            </div>
            {spliteElement}
            <div style={containerStyle} ref={ref => this.jxAboutLabel = ref}>
                {contactUSElement}
            </div>
            {spliteElement}
            {footElement}
        </div>;
    }
}

export default App;
