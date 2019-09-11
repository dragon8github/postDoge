/**
 * 最简单且最安全的方法显示一个值，举个例子: 
 * var obj = {a: 123 }
   maybe(_=> obj.a, 0); // 123
   maybe(_=> obj.b, 0); // 0
   maybe(_=> obj.a.b.s.w.holy.shit.fuck.god, 0); // 0
 */
export const maybe = (fn, n = '') => {
    try {
        const result = fn()
        return (result && result === result && result !== 'NaN' && result !== 'undefined' && result !== 'Invalid date') ? result : n
    } catch (err) {
        return n
    }
}

/**
 * 获取数组最后一位
 */
Array.prototype.last = function () {
    return this[this.length - 1]
} 

/**
 * 获取数组第一位
 */
Array.prototype.first = function () {
    return this[0]
} 


/**
 * 判断对象是否是一个空的对象，既{}
 */
export const isEmptyObject = obj => {
    if (Object.getOwnPropertyNames) {
        return (Object.getOwnPropertyNames(obj).length === 0);
    } else {
        var k;
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 将对象转化为formdata格式
 */
export const obj2formdata = (json) => {
    var data = new FormData()
    if (json) {
        Object.keys(json).forEach(function(key) {
            data.append(key, json[key])
        });
    }
    return data
}


/**
 * 将对象转化为GET参数
 */
export const obj2formdatastr = (body) => {
    if (body) {
        let formparams = '';
        Object.keys(body).forEach(key => {
            if (formparams.length > 0) {
                formparams += '&';
            }
            formparams = formparams + key + '=' + body[key];
        });
        return formparams
    }
    return ''
}

/**
 * 函数节流（throttle）
 */
export const throttle = (func, wait, options) => {
  var timeout, context, args, result;
  // 标记时间戳
  var previous = 0;
  // options可选属性 leading: true/false 表示第一次事件马上触发回调/等待wait时间后触发
  // options可选属性 trailing: true/false 表示最后一次回调触发/最后一次回调不触发
  if (!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : +(new Date());
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function() {
    // 记录当前时间戳
    var now = +(new Date());
    // 如果是第一次触发且选项设置不立即执行回调
    if (!previous && options.leading === false)
    // 将记录的上次执行的时间戳置为当前
    previous = now;
    // 距离下次触发回调还需等待的时间
    var remaining = wait - (now = previous);
    context = this;
    args = arguments;

    // 等待时间 <= 0或者不科学地 > wait（异常情况）
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
          // 清除定时器
        clearTimeout(timeout);
        // 解除引用
        timeout = null;
      }
      // 将记录的上次执行的时间戳置为当前
      previous = now;

      // 触发回调
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    }
    // 在定时器不存在且选项设置最后一次触发需要执行回调的情况下
    // 设置定时器，间隔remaining时间后执行later
    else if (!timeout && options.trailing !== false)    {
      timeout = setTimeout(later, remaining);
    }
   return result;
  };

  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};


/**
 * el-date-picker 的扩展配置
 */
export const shortcuts = [{
  text: '最近一周',
  onClick(picker) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近一个月',
  onClick(picker) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    picker.$emit('pick', [start, end]);
  }
}, {
  text: '最近三个月',
  onClick(picker) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
    picker.$emit('pick', [start, end]);
  }
}]



// Array Remove - By John Resig (MIT Licensed)
/**
 * // 移除数组中的第二项
 * array.remove(1);
 * // 移除数组中的倒数第二项
 * array.remove(-2);
 * // 移除数组中的第二项和第三项（从第二项开始，删除2个元素）
 * array.remove(1,2);
 * // 移除数组中的最后一项和倒数第二项（数组中的最后两项）
 * array.remove(-2,-1);
 *
 */
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  this.push.apply(this, rest);
  return this
};

 /**
 * 深度递归搜索
 * @param {Array} arr 你要搜索的数组
 * @param {Function} condition 回调函数，必须返回谓词，判断是否找到了。会传入(item, index, level)三个参数
 * @param {String} children 子数组的key
 */
export const deepFind = (arr, condition, children) => {
    // 即将返回的数组
    let main = []

    // 用try方案方便直接中止所有递归的程序
    try {
        // 开始轮询
        (function poll(arr, level, cb) {
            // 如果传入非数组
            if (!Array.isArray(arr)) return

            // 遍历数组
            for (let i = 0; i < arr.length; i++) {
                // 获取当前项
                const item = arr[i]

                // 先占位预设值
                main[level] = item

                // 扩展：如果是一个对象的话，添加一些标记属性
                if (Object.prototype.toString.call(item) === '[object Object]') {
                  item.__INDEX__ = i
                  item.__LEVEL__ = level
                }

                // 检验是否已经找到了
                const isFind = condition && condition(item, i, level) || false

                // 自杀函数
                const kill = () => {
                // 删除占位预设值
                  main.length = main.length - 1
                  // 触发回调
                  cb && cb()
                }

                // 如果已经找到了
                if (isFind) {
                    // 直接抛出错误中断所有轮询
                    throw Error
                // 如果存在children，那么深入递归
                } else if (children && item[children] && item[children].length) {
                    poll(item[children], level + 1,
                      // 如果本函数被触发，说明children还是找不到。
                      () => {
                      // 那么如果我是最后一条，那么我也自杀吧
                      if (i === arr.length - 1) {
                        kill()
                      }
                    })
                // 如果是最后一个且没有找到值，那么通过修改数组长度来删除当前项
                } else if (i === arr.length - 1) {
                  // 找不到，羞愧自杀
                  kill()
                }
            }
        })(arr, 0)
    // 使用try/catch是为了中止所有轮询中的任务
    } catch (err) {}

    // 返回最终数组
    return main
}

/**
 * 深度设置
 */
export const deepSet = (ary, path, cb) => {
  // （重要）保存引用
  let obj = ary
  // 不断轮询路径
  while (path.length) {
    // 从左往右取出路径
    const key = path.shift()
    // 获取当前路径的值
    obj = obj[key]
    // 判断路径，如果异常则直接中断循环
    if (!obj) break
  }
  // 回调，注入指定路径的ary引用
  cb && cb(obj)
  // （重点）返回被串改的数组
  return ary
}

/**
 * chunk 数组分块函数
 * 对数组进行分块，满足条件的分为hit组，不满足分到miss组
 *
 * const ary = [1, 2, 3, 4, 5, 6, 7, 8]
 * const result = chunk(ary, _ => _ > 1)
 * console.log(result)
 */
export const chunk = (ary, fn) => ary.reduce(({ hit, miss } = {}, v) => {
  fn(v) ? hit.push(v) : miss.push(v)
  return { hit, miss }
}, { hit: [], miss: [] })


export const poll = (conditionFn, callback, wait = 4, maxTimeout = 10, timeout = 0) => {
  // 请求是否超出阈值
  if (++timeout > maxTimeout * 1000 / wait) throw new Error('overtime')
  // 如果条件满足，那么执行，否则轮询
  conditionFn() ? callback() : setTimeout(() => {poll(conditionFn, callback, wait, maxTimeout, timeout) }, wait)
}


export const pureMap = (ary = [], validate = () => true, cb = () => undefined) => {
  // copy
  let _ary = JSON.parse(JSON.stringify(ary))

  // filter
  _ary = _ary.map(v => {
    // validate
      if (validate(v)) {
        // callback
        return cb(v) || v
      } else {
        // default
        return v
      }
  });

  // filter ary
  return _ary
}

export const addClass = (el, cls) => {
  
    if (el.classList) {
        el.classList.add(cls)
    } else {
        var cur = ' ' + getClassName(el) + ' '
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim())
        }
    }
}

export const hasClass = (el, className) => {
  if (el.classList)
    el.classList.contains(className);
  else
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

export const getClassName = (el) => {
    return (el.className instanceof SVGAnimatedString ? el.className.baseVal : el.className)
}

export const removeClass = (el, cls) => {
    if (el.classList) {
        el.classList.remove(cls)
    } else {
        var cur = ' ' + getClassName(el) + ' ',
            tar = ' ' + cls + ' '
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ')
        }
        el.setAttribute('class', cur.trim())
    }
}

export const exclude = (obj, ...attribute) =>  {
  // copy
  let _ = JSON.parse(JSON.stringify(obj))
    // 删除属性
  for (let i = 0, len = attribute.length; i < len; i++) {
    const attr = attribute[i]
      delete _[attr]
  }
  // pure obj
  return _
}



/**
 * 反向递归
 * @param {*} key       需要匹配的值
 * @param {*} treeData  匹配的数组
 */
export function getTreeDeepArr(key, treeData) {
  let arr = []; // 在递归时操作的数组
  let returnArr = []; // 存放结果的数组
  let depth = 0; // 定义全局层级
  // 定义递归函数
  function childrenEach(childrenData, depthN) {
    for (var j = 0; j < childrenData.length; j++) {
      depth = depthN; // 将执行的层级赋值 到 全局层级
      arr[depthN] = (childrenData[j].tagId);
      if (childrenData[j].tagId == key) {
        returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
        break
      } else {
        if (childrenData[j].childList) {
          depth++;
          childrenEach(childrenData[j].childList, depth);
        }
      }
    }
    return returnArr;
  }
  return childrenEach(treeData, depth);
}

// 补全
export const pad = (target, n) => {
    var zero = new Array(n).join('0');
    var str = zero + target;
    var result = str.substr(-n);
    return result;
}

// 获取24小时，从指定的时间开始
export const get24hourfrom = (start, count = 24) => {
  return [...Array(count)].map((v, index, array) => {
      return pad((index + start) % 24, 2)
  })
}


// 设置高亮
export const point = dom => {
  if (hasClass(dom, 'changing')) {
     removeClass(dom, 'changing')
  } else {
     addClass(dom, 'changing')
     addClass(dom, 'point')
     dom.addEventListener("webkitAnimationEnd", function() {
       removeClass(dom, 'changing')
     })
  }
}


// 缓存器
export const memoized = function (fn) {
  // 缓存队列
  var cache = {}
  return function () {
    // 以入参为key（todo:最好作为可配置）
    var __KEY__ = Array.prototype.slice.call(arguments)
    // 记录缓存
    return cache[__KEY__] || (cache[__KEY__] = fn.apply(this, arguments))
  }
}
