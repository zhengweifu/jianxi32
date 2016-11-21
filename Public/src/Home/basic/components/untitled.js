		 <VerticalMiddle height={height}><IconButton color={activeBgColor} icon={<MorphReplace rotation='none'>
				<SvgIcon key={this.state.open ? 'icon_open' : 'icon_close'} width={height / 2} height={height / 2}>
					<path fill={activeBgColor} d={this.state.open ? close : dehaze}/>
				</SvgIcon>
			</MorphReplace>} onClick={e => {
				this.setState({open: !this.state.open});
		}}/></VerticalMiddle>