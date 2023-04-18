{
    // 浅拷贝
    function shallowCopy(target) {
        if (target == null || typeof target !== 'object') return target;
        const newObj =
            typeof target === 'object' && target instanceof Array ? [] : {};
        Object.keys(target).forEach(key => {
            newObj[key] = target[key];
        });
        return newObj;
    }
}
{
    // 深拷贝
        if (target === null || typeof target !== 'object') return target;
        if (target instanceof Date) return new Date(target);
        if (target instanceof RegExp) return new RegExp(target);
        if (target instanceof HTMLElement) return target;
        const source = target.constructor();
        if (hash.get(target)) return hash.get(target);
        hash.set(target, source);
        Reflect.ownKeys(target).forEach(key => {
            source[key] = cloneDeep(target[key], hash);
        });
        return source;
    }
  
