import React, { Component } from 'react';

import ProductItem from '../../basic/components/ProductItem';

import { WEB_ROOT, INTERFACE_ROOT, FONT_FAMILY } from '../../../config';

import GridList from '../../../Common/components/GridList';

import { SCREEN_SIZE, GetDocumentSize } from '../../../Common/utils/basic';

import ReactSwipe from 'react-swipe';

import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            docWidth: GetDocumentSize().width
        };

        // 从接口获取数据
        axios.get(INTERFACE_ROOT + 'Home/Product/getInitData').then(response => {
            const data = response.data;
            this.setState({
                products: data,
            });
        });

        window.addEventListener('resize', event => {
            this.setState({docWidth: GetDocumentSize().width});
        }, false );
    }

    render() {
        let porductCount = 3;
        if(this.state.docWidth < SCREEN_SIZE.md && this.state.docWidth >= SCREEN_SIZE.sm) {
            porductCount = 2;
        } else if(this.state.docWidth < SCREEN_SIZE.sm) {
            porductCount = 1;
        }
        const productElements = this.state.products.map((product, index) => {
            return <ProductItem onButtonClick={e => {
                window.location.href = product.link;
            }} buttonBgColor={product.buttonclassname} img={product.path} labelheader={product.labelheader} labelbody={product.labelbody}/>;
        });
        return <GridList cols={porductCount}>
            {productElements}
        </GridList>;
    }
}

export default App;
