import axios from 'axios';

const url = '';//'http://localhost:3000';

const listProducts = (filter) => {
    return axios.post(`${url}/products/byfilter`, filter
    ).then(response => {
        return response;
    }).catch(error => {
        console.log(error);
    });
}


const listProductStatistics = (productIds) => {
    return axios.post(`${url}/productstatistics/byproductids`,
        {
            productIds: productIds,
            onlyAllSellers: false
        }
    ).then(response => {
        return response;
    }).catch(error => {
        console.log(error);
    });
}

export { listProducts, listProductStatistics };