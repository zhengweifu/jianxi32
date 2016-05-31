import React from 'react';
import ReactDOM from 'react-dom';

import GridList from '../components/GridList';

import Paper from '../components/Paper';

import RaisedButton from '../components/RaisedButton';

import SvgIcon from '../components/SvgIcon';

import Slider from '../components/Slider';

import Input from '../components/Input';

import InputNumber from '../components/InputNumber'; 

import InputNumberSlider from '../components/InputNumberSlider'; 

import InputNumberSliderGroup from '../components/InputNumberSliderGroup';

import Grid from '../components/Grid';
import Col from '../components/Col';

import Popover from '../components/Popover';

import VerticalSeparation from '../components/VerticalSeparation';

import Modal from '../components/Modal';

import Overlay from '../components/Overlay';

import List from '../components/List';

import { visibility, highlightOff } from '../svgIcons/google/Action';

let App = (props) => {
	return (
		<div>
			<VerticalSeparation>
				<RaisedButton fullWidth={true}/>
				<RaisedButton fullWidth={true}/>
				<RaisedButton fullWidth={true}/>
				<RaisedButton fullWidth={true}/>
				<RaisedButton fullWidth={true}/>
			</VerticalSeparation>
			<GridList cols={3}>
				<RaisedButton fullWidth={true}/>
				<RaisedButton fullWidth={true}/>
				<RaisedButton fullWidth={true}
					leftIcon={
						<SvgIcon>
							<path d='M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z'/>
						</SvgIcon>
					}
					label='component'
					labelColor='#eee'
				/>
			</GridList>

			<GridList cols={3}>
				<Slider max={100} min={-100} defaultValue={10} step={1} onChange={(e, v) => console.log(v)}/>
			</GridList>
			<Grid>
				<Col width={1 / 5}>
					<Input />
					<InputNumber />
				</Col>
				<Col width={4 / 5}>
					<Grid gutter={20}>
						<Col width={1 / 3} gutter={20}>
							<InputNumberSlider label='位置' labelWidth={40} labelColor='#aaa' labelFontSize={13}/>
						</Col>
						<Col width={1 / 3} gutter={20}>
							<InputNumberSlider label='旋转' labelWidth={40} labelColor='#aaa' labelFontSize={13}/>
						</Col>
						<Col width={1 / 3} gutter={20}>
							<InputNumberSlider label='缩放' labelWidth={40} labelColor='#aaa' labelFontSize={13}/>
						</Col>
					</Grid>
				</Col>
			</Grid>
			<div style={{height: 20, overflow: 'visible'}}>
				<Popover>aaasada<br/>aaasada<br/>aaasada<br/>aaasada<br/>aaasada<br/></Popover>
			</div>
			<InputNumberSliderGroup
				lock={true}
				max={10}
				min={0}
				labels={['x', 'y']}
				labelWidth={10}
				defaults={[0, 5]}
			/>
			<InputNumberSliderGroup
				max={100}
				min={0}
				type='INT'
				labels={['x', 'y', 'z']}
				labelWidth={10}
				defaults={[0, 5, 20]}
			/>

			<Modal open={false}>....</Modal>

			<List items={[
				{leftIcon: <SvgIcon><path d={visibility}/></SvgIcon>, title: '张三', rightIcon: <SvgIcon><path d={highlightOff}/></SvgIcon>},
				{title: '李四'},
				{title: '王五'},
				{title: '赵六'}
			]}/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));