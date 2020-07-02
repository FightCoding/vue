/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {

    if (arguments.length === 0 || !time ) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time);
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return [
                '日', '一', '二', '三', '四', '五', '六'
            ][value];
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}

//保留几位小数截取
export function numFilter(value, num) {
    // 截取当前数据到小数点后两位
    let tempVal = parseFloat(value).toFixed(num+1);
    let realVal = tempVal.substring(0, tempVal.length - 1);
    return realVal;
}

//保留几位小数截取,会四舍五入
export function numFilterRound(value, num) {
    // 截取当前数据到小数点后两位
    let realVal = parseFloat(value).toFixed(num);
    return realVal;
}

/**
 * Generates a unique element ID.
 */
export function guid(prefix) {
    return (prefix || '') + Math.round(Math.random() * 1000000).toString();
}

// 查找元素所在数组的下标,未找到时返回-1
export function find(list, compare) {
    if (!list || list.length === 0) {
        return -1;
    }
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (compare(item)) {
            return i;
        }
    }
    return -1;
}

// base64 转 File 对象
export function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    try {
        return new File([u8arr], filename, {type: mime});
    } catch (e) {
    }
    // 有一些浏览器对File不兼容尝试使用Blob代替
    try {
        return new Blob([u8arr], {type: mime});
    } catch (e) {
        throw new Error('您的浏览器过于老旧，请使用谷歌浏览器（Chrome）访问网站');
    }
}

// 深拷贝
export function clone(item, deepCloneImg = false) {
    if (!item) { return item; } // null, undefined values check

    const types = [Number, String, Boolean];
    let result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function(type) {
        if (item instanceof type) {
            result = type( item );
        }
    });

    if (typeof result == "undefined") {
        if (Object.prototype.toString.call( item ) === "[object Array]") {
            result = [];
            item.forEach(function(child, index, array) {
                result[index] = clone( child );
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                // 图片cloneNode后需要重新加载，所以不进行img的深拷贝，这样有一个妥协，如果修改了img的属性就会有问题
                if (item.tagName === "IMG" && !deepCloneImg) {
                    result = item;
                } else {
                    result = item.cloneNode( true );
                }
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (let i in item) {
                        result[i] = clone( item[i] );
                    }
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }
    return result;
}

/**
 * 四舍五入计算百分比
 * @param numerator 分子
 * @param denominator 分母
 * @param decimalNum 小数点位数
 */
export function calculatePercent(numerator, denominator, decimalNum = 0) {
    const power = Math.pow(10, decimalNum);
    return Math.round(numerator / denominator * 100 * power) / power;
}

/**
 * 将小数转为不带百分号的百分比
 * @param rate 要转化的小数
 * @returns {number}
 */
export function changeDecimalToPercent(rate, decimalNum) {
    if (!rate) {
        return decimalNum !== undefined ? 0.00 : 0;
    }

    if (decimalNum !== undefined) {
        return (rate * 100).toFixed(decimalNum);
    }

    const strValue = rate.toString();
    const decimalIndex = strValue.indexOf('.');
    const decimalLen = strValue.length - decimalIndex - 3;
    return numFilterRound(rate * 100, decimalLen < 0 ? 0 : decimalLen);
}
