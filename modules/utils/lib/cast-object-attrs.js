const caster = (obj, keys, type) => {
    if (!obj) {
        return;
    }
    keys.forEach(key => {
        if (key in obj) {
            switch (obj[key].constructor) {
            /**
            * Single id
            */
            case String:
                obj[key] = type(obj[key]);
                break;
            /**
            * More than on id
            */
            case Object:
            // Use $in since it's come after parsing
                obj[key]['$in'] = obj[key]['$in'].map(id => {
                    return type(id);
                });
                break;
            }
        }
    });

    return obj;
};

module.exports = caster;
