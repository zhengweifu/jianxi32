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