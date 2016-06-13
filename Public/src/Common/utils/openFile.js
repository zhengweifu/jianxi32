/**
 * 打开文件
 * file     ［ file  控件 ］
 * onLoad   ［ 加载完成调用 ］
 */
export default (file, onLoad) => {
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = e => {
        if(onLoad) {
            onLoad(e.target.result);
        }
    };
};
