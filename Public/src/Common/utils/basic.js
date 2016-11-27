export const SCREEN_SIZE = {
	xs: 480,
	sm: 768,
	md: 992,
	lg: 1200,
};

/**
 * 获取屏幕的尺寸
 * @return {json} 屏幕的尺寸
 */
export const GetScreenSize = () => {
	return {
		width: screen.width,
		height: screen.height
	};
};

/**
 * 获取文档的尺寸
 * @return {json} 文档的尺寸
 */
export const GetDocumentSize = () => {
	return {
		width: document.body.clientWidth,
		height: document.body.clientHeight
	};
};

export const GetElementHeight = (el) => {
    let elStyle      = window.getComputedStyle(el),
        elDisplay    = elStyle.display,
        elPosition   = elStyle.position,
        elVisibility = elStyle.visibility,
        elMaxHeight = elStyle.maxHeight.replace('px', '').replace('%', ''),

        wantedHeight = 0;

    if(elDisplay !== 'none' && elMaxHeight !== '0') {
        return el.offsetHeight;
    }

    el.style.position   = 'absolute';
    el.style.visibility = 'hidden';
    el.style.display    = 'block';

    wantedHeight     = el.offsetHeight;

    el.style.display    = elDisplay;
    el.style.position   = elPosition;
    el.style.visibility = elVisibility;

    return wantedHeight;
};

export const Animate = (element, props, time, callback) => {
    const start = new Date().getTime();
    let tempProps = {};
    for(let p in props) {
        props[p] = parseFloat(props[p].replace('px').replace('%'));
        let cValue = parseFloat(element.style[p].replace('px').replace('%'));
        tempProps[p] = {
            value: cValue,
            interval: props[p] - cValue,
            unit: ''
        };
        if(element.style[p].match('%')) {
           tempProps[p]['unit'] = '%';
        } else if(element.style[p].match('px')) {
            tempProps[p]['unit'] = 'px';
        }
    }
    const timer = setInterval(() => {
        const step = Math.min(1,(new Date().getTime() - start) / time);
        for(let prop in props) {
            if(tempProps[prop].unit !== '') {
                element.style[prop] = paseInt(tempProps[prop].value + step * tempProps[prop].interval) + tempProps[prop].unit;
            } else {
                element.style[prop] = tempProps[prop].value + step * tempProps[prop].interval;
            }
        }
        if(step == 1) {
            clearInterval(timer);
        }
    }, 25);

    if (typeof callback === 'function') {
        setTimeout(callback, time);
    }
};