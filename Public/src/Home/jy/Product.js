import fabric from 'fabric';
import Is from '../../Common/utils/Is';

export function separationShadow(shadow) {
    let result = {
        hShadow: 0,
        vShadow: 0,
        blur: 0,
        color: 'transparent'
    };

    if(shadow) {
        if(Is(shadow, 'String')) {
            let split = shadow.split(/px /g);
            if(split.length > 0) {
                result.hShadow = parseInt(split[0]);
            }

            if(split.length > 1) {
                result.vShadow = parseInt(split[1]);
            }

            if(split.length > 2) {
                result.blur = parseInt(split[2]);
            }

            if(split.length > 3) {
                result.color = split[3];
            }
        } else if(Is(shadow, 'Object')) {
            result.hShadow = shadow.offsetX;
            result.vShadow = shadow.offsetY;
            result.blur = shadow.blur;
            result.color = shadow.color;
        }
    }

    return result;
}

export function mergeShadow(hShadow, vShadow, blur, color) {
    return `${hShadow}px ${vShadow}px ${blur}px ${color}`;
}

class Product {
    constructor(idName, width, height) {
        this.canvas = new fabric.Canvas(idName, {
            width: width,
            height: height
        });

        this.canvas.mid = 0;
    }

    /**
     * [GetActiveObject 获取当前激活的物体]
     */
    GetActiveObject() {
        let group = this.canvas.getActiveObject();
        let object = this.canvas.getActiveGroup();

        if(group) {
            return group;
        } else if(object) {
            return object;
        } else {
            return null;
        }
    }

    MoveTo(from, to) {
        this.canvas.moveTo(this.canvas.item(from), to);
    }

    UnselectAll() {
        this.canvas.deactivateAll().renderAll();
    }

    SelectFromIndex(index) {
        this.UnselectAll();
        this.canvas.setActiveObject(this.canvas.item(index));
    }

    GetActiveObjectIndex() {
        return this.canvas.getObjects().findIndex(item => item == this.GetActiveObject());
    }

    ToUpLayer() {
        let activeIndex = this.GetActiveObjectIndex();
        if(activeIndex > 0) {
            const to = activeIndex - 1;
            this.MoveTo(activeIndex, to);
            return {from: activeIndex, to: to};
        }
        return null;
    }

    ToDownLayer() {
        let activeIndex = this.GetActiveObjectIndex();
        const length = this.canvas.getObjects().length;
        if(activeIndex >= 0 && activeIndex < length - 1) {
            const to = activeIndex + 1;
            this.MoveTo(activeIndex, to);
            return {from: activeIndex, to: to};
        }
        return null;
    }

    /**
     * [AddText 添加文字]
     * @param {[type]} content [文字内容]
     */
    AddText(content) {
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
            mid: this.canvas.mid++,
            left: 0,
            top: 0,
            fontFamily: defaultFamily,
            fontSize: defaultFontSize,
            bendAngle: 0,
            effect: 'bend',
            fill: '#ccc',
            stroke: '#ff8d5c',
            shadow: '5px 5px 5px transparent',
            strokeWidth: defaultStorkeWidth,
            textAlign: 'center',
            spacing: defaultSpacing,
            padding: 2
        });

        this.canvas.centerObject(text);

        this.canvas.add(text);

        return text.mid;
    }

    AddImage(url, maxSize = 200) {
        const id = this.canvas.mid++;
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
            this.canvas.centerObject(img);
            this.canvas.add(img);
            this.canvas.renderAll();
        });

        return id;
    }

    /**
     * 删除当前激活的物体
     */
    RemoveObject() {
        let active = this.GetActiveObject();
        if(active) {
            this.canvas.remove(active);
        }

        return active.mid;
    }

    /**
     * 删除当前激活的物体
     */
    RemoveObjectFromId(mid) {
        let object = this.GetObjectFromId(mid);
        if(object) {
            this.canvas.remove(object);
        }

        return object.mid;
    }

    GetObjectFromId(mid) {
        const object = this.canvas.getObjects().find(item => item.mid === mid);
        return object;
    }


    /**
     * [ToCenterV 当前激活的物体垂直居中]
     */
    ToCenterV() {
        let active = this.GetActiveObject();
        if(active) {
            this.canvas.centerObjectV(active);
        }
    }

    /**
     * [ToCenterH 当前激活的物体水平居中]
     */
    ToCenterH() {
        let active = this.GetActiveObject();
        if(active) {
            this.canvas.centerObjectH(active);
        }
    }

    /**
     * [GetTextProps 获取文字的属性]
     * @param {[type]} text [文字物体]
     */
    GetTextProps(text) {
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
    SetTextProps(props) {
        let active = this.GetActiveObject();
        if(active && active.type === 'curvedText') {
            active.setText(props.text); // CurvedText bug 
            active.set(props);
            // active.set('text', props.text);
            this.canvas.renderAll();
        }
    }

    GetGeneralProps(object) {
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
    SetGeneralProps(key, value) {
        let active = this.GetActiveObject();
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
            this.canvas.renderAll();
        }
    }

    /**
     * [getActiveObjectProps 获得当前激活物体的属性值]
     * return {[type]} [属性值]
     */
    GetActiveObjectProps() {
        let props = {};

        let active = this.GetActiveObject();

        if(active) {

            props['generalProps'] = this.GetGeneralProps(active);

            let type = active.type;
            switch (type) {
                case 'curvedText':
                    props['textProps'] = this.GetTextProps(active);
                    break;
                default:

            }
        }

        return props;
    }
}

export default Product;
