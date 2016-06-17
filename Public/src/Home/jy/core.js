import fabric from 'fabric';
import Is from '../../Common/utils/Is';
/**
 * [GetTextWidth 获取文字的长度]
 * @param {[type]} text     [文字内容]
 * @param {[type]} fontSize    [文字大小]
 * @param {[type]} fontFamily  [字体]
 * @param {[type]} strokeWidth [描边宽度]
 * @param {[type]} space       [文字间距]
 */
export function GetTextWidth(text, fontSize, fontFamily, strokeWidth, space) {

    strokeWidth = strokeWidth !== undefined ? strokeWidth : 0;
    space = space !== undefined ? space : 0;

    if(text === undefined || fontSize === undefined || fontFamily === undefined) {
        return 0;
    }

    if(!window.FUN_TEMP_TEXT) {
        window.FUN_TEMP_TEXT = new fabric.Text(text, {
            fontFamily: fontFamily,
            fontSize: fontSize,
            strokeWidth: strokeWidth
        });
    } else {
        window.FUN_TEMP_TEXT.set({text, fontSize, fontFamily, strokeWidth});
    }

    let width = window.FUN_TEMP_TEXT.getWidth() + (text.length - 1) * space;

    return width;
}

/**
 * [GetCanvas 获取画布]
 */
function GetCanvas() {
    if(window.JYCANVAS.mid === undefined) {
        window.JYCANVAS.mid = 0;
    }
    return window.JYCANVAS;
}

/**
 * [GetActiveObject 获取当前激活的物体]
 */
function GetActiveObject() {
    let canvas = GetCanvas();
    let group = canvas.getActiveObject();
    let object = canvas.getActiveGroup();

    if(group) {
        return group;
    } else if(object) {
        return object;
    } else {
        return null;
    }
}

/**
 * [AddText 添加文字]
 * @param {[type]} content [文字内容]
 */
export function AddText(content) {
    let canvas = GetCanvas();

    // let text = new fabric.Text(content, {
    //   mid: canvas.mid++,
    //   left: 0,
    //   top: 0,
    //   fontFamily: 'Helvetica',
    //   fontSize: 20,
    //   fill: '#ccc',
    //   stroke: '#999',
    //   shadow: '5px 5px 5px transparent',
    //   strokeWidth: 1,
    //   padding: 2
    // });
    let defaultFamily = 'Helvetica';
    let defaultFontSize = 20;
    let defaultSpacing = 2;
    let defaultStorkeWidth = 0.3;

    // let defaultWidth = GetTextWidth(content, defaultFontSize, defaultFamily, defaultStorkeWidth, defaultSpacing);

    // let defaultRadius = defaultWidth * 180 / (Math.PI * 0.01);

    let text = new fabric.CurvedText(content, {
        mid: canvas.mid++,
        left: 0,
        top: 0,
        fontFamily: defaultFamily,
        fontSize: defaultFontSize,
        bendAngle: 0,
        effect: 'bend',
        fill: '#ccc',
        stroke: '#666',
        shadow: '5px 5px 5px transparent',
        strokeWidth: defaultStorkeWidth,
        textAlign: 'center',
        spacing: defaultSpacing,
        padding: 2
    });

    canvas.centerObject(text);

    canvas.add(text);

    return text.mid;
}

export function AddImage(url, maxSize = 200) {
    let canvas = GetCanvas();
    const id = canvas.mid++;
    fabric.Image.fromURL(url, img => {
        const width = img.getWidth();
        const height = img.getHeight();
        let scale = 1;
        if(width >= height) {
            if(width > maxSize) {
                scale = maxSize / width;
            } 
        } else {
            if(height > maxSize) {
                scale = maxSize / height;
            }
        }
        img.set({
            mid: id,
            width: width * scale,
            height: height * scale,
            padding: 2
        });
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });

    return id;
}

/**
 * 删除当前激活的物体
 */
export function RemoveObject() {
    let canvas = GetCanvas();
    let active = GetActiveObject();
    if(active) {
        canvas.remove(active);
    }

    return active.mid;
}

/**
 * 删除当前激活的物体
 */
export function RemoveObjectFromId(mid) {
    let canvas = GetCanvas();
    let object = GetObjectFromId(mid);
    if(object) {
        canvas.remove(object);
    }

    return object.mid;
}

export function GetObjectFromId(mid) {
    let canvas = GetCanvas();
    const object = canvas.getObjects().find(item => item.mid === mid);
    console.log(object);
    return object;
}


/**
 * [ToCenterV 当前激活的物体垂直居中]
 */
export function ToCenterV() {
    let canvas = GetCanvas();
    let active = GetActiveObject();
    if(active) {
        canvas.centerObjectV(active);
    }
}

/**
 * [ToCenterH 当前激活的物体水平居中]
 */
export function ToCenterH() {
    let canvas = GetCanvas();
    let active = GetActiveObject();
    if(active) {
        canvas.centerObjectH(active);
    }
}

/**
 * [GetTextProps 获取文字的属性]
 * @param {[type]} text [文字物体]
 */
function GetTextProps(text) {
    let props = {};
    let propNames = ['text', 'fontSize', 'fontFamily', 'fill', 'stroke', 'strokeWidth', 'shadow', 'bendAngle', 'spacing'];
    for(let propName of propNames) {
        props[propName] = text.get(propName);
        if(propName === 'shadow' && props[propName]) {
            props[propName] = {
                offsetX: props[propName]['offsetX'], 
                offsetY: props[propName]['offsetY'], 
                blur: props[propName]['blur'], 
                color: props[propName]['color']
            };
        }
    }

    return props;
}

/**
 * [SetTextProps 设置文字属性]
 * @param {[type]} props [文字属性]
 */
export function SetTextProps(props) {
    let canvas = GetCanvas();
    let active = GetActiveObject();
    if(active && active.type === 'curvedText') {
        active.setText(props.text); // CurvedText bug 
        active.set(props);
        // active.set('text', props.text);
        canvas.renderAll();
    }
}

function GetGeneralProps(object) {
    let props = {};
    let propNames = ['left', 'top', 'angle', 'scaleX', 'scaleY', 'flipX', 'flipY'];

    for(let propName of propNames) {
        props[propName] = object.get(propName);
    }

    return props;
}

/**
 * [SetGeneralProps 设置一般属性]
 * @param {[type]} key [一般属性]
 */
export function SetGeneralProps(key, value) {
    let canvas = GetCanvas();
    let active = GetActiveObject();
    if(active) {
        let opts = {};
        if(Is(key, 'Object')) {
            opts = key;
        } else {
            opts[key] = value;
        }

        for(let k in opts) {
            if(k === 'angle') {
                if(!active.centeredRotation) {
                    active.centeredRotation = true;
                }
                active.setAngle(opts[k]);
                continue;
            } else if((k === 'scaleX' || k === 'scaleY') && !active.centeredScaling) {
                // active.centeredScaling = true;
            } 
            
            active.set(k, opts[k]); 
        }
        // if(Is(key, 'Object')) {
        //   active.set(key);
        // } else {
        //   active.set(key, value);
        // }
        canvas.renderAll();
    }
}

/**
 * [getActiveObjectProps 获得当前激活物体的属性值]
 * return {[type]} [属性值]
 */
export function GetActiveObjectProps() {
    let props = {};

    let active = GetActiveObject();

    if(active) {

        props['generalProps'] = GetGeneralProps(active);

        let type = active.type;
        switch (type) {
            case 'curvedText':
                props['textProps'] = GetTextProps(active);
                break;
            default:

        }
    }

    return props;
}
