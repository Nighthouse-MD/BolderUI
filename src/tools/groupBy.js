const groupBy = (xs, key) => {
    const groupedToObject = xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});

    return Object.keys(groupedToObject).map(k => groupedToObject[k]);
};

export default groupBy;