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



let App = (props) => {
	return (
		<div>
			<GridList cols={3}>
				<RaisedButton bgColor='#f67' labelColor='#eee' fullWidth={true}/>
				<RaisedButton bgColor='#34f' labelColor='#eee' fullWidth={true}/>
				<RaisedButton bgColor='#678' fullWidth={true}
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
			<Input />
			<InputNumber />

			<InputNumberSlider label='位置' labelWidth={40} labelColor='#aaa' labelFontSize={13}/>
			<InputNumberSlider label='旋转' labelWidth={40} labelColor='#aaa' labelFontSize={13}/>
			<InputNumberSlider label='缩放' labelWidth={40} labelColor='#aaa' labelFontSize={13}/>
			<GridList cols={2}>
				<InputNumberSliderGroup
					lock={true}
					max={10}
					min={0}
					labels={['x', 'y', 'z']}
					labelWidth={10}
					defaults={[0, 5, 2]}
				/>
				<InputNumberSliderGroup
					max={100}
					min={0}
					type='INT'
					labels={['x', 'y', 'z']}
					labelWidth={10}
					defaults={[0, 5, 20]}
				/>
			</GridList>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));