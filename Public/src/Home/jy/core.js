import fabric from 'fabric';

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
  let defaultSpacing = 5;
  let defaultStorkeWidth = 1;

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
    stroke: '#999',
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

/**
 * [getActiveObjectProps 获得当前激活物体的属性值]
 * return {[type]} [属性值]
 */
export function GetActiveObjectProps() {
  let props = {
    generalProps: {},
  };

  let active = GetActiveObject();

  if(active) {
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
