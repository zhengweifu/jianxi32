import fabric from 'fabric';

function getCanvas() {
  if(window.JYCANVAS.mid === undefined) {
    window.JYCANVAS.mid = 0;
  }
  return window.JYCANVAS;
}


function getActiveObject() {
  let canvas = getCanvas();
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

export function addText(content) {
  let canvas = getCanvas();

  var text = new fabric.Text(content, {
    mid: canvas.mid++,
    left: 0,
    top: 0,
    fontFamily: 'Helvetica',
    fontSize: 20,
    fill: '#ccc',
    stroke: '#999',
    // shadow: '#666 5px 5px 5px',
    strokeWidth: 1,
    padding: 2
  });

  canvas.centerObject(text);

  canvas.add(text);

  return text.mid;
}

export function toCenterV() {
  let canvas = getCanvas();
  let active = getActiveObject();
  if(active) {
    canvas.centerObjectV(active);
  }
}

export function toCenterH() {
  let canvas = getCanvas();
  let active = getActiveObject();
  if(active) {
    canvas.centerObjectH(active);
  }
}

function getTextProps(text) {
  let props = {};
  let propNames = ['text', 'fontSize', 'fontFamily', 'fill', 'stroke'];
  for(let propName of propNames) {
    props[propName] = text.get(propName);
  }
  return props;
}

/**
 * [getActiveObjectProps 获得当前激活物体的属性值]
 * return {[type]} [属性值]
 */
export function getActiveObjectProps() {
  let props = {
    generalProps: {},
  };

  let active = getActiveObject();

  if(active) {
    let type = active.type;
    switch (type) {
      case 'text':
        props['textProps'] = getTextProps(active);
        break;
      default:

    }
  }

  return props;
}
