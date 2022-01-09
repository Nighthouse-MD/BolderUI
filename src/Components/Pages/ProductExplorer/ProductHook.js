import { useState, useEffect } from 'react';
import * as ProductService from '../Services/ProductService';
import { styled } from "@mui/material/styles";
import { Grid } from '@mui/material';

import WorkerBuilder from '../Workers/WorkerBuilder';
import ProductWorker from '../Workers/ProductWorker';

const StyledProductGridElement = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark
}));

const productGridElement = (product, amountOfStatRows) => {
    return <StyledProductGridElement item sm={3} md={4}>
        <div>{`${product.name} - ${product.fetchedOn} - ${product.inactivatedOn ? 'Inactive -' : ''} ${amountOfStatRows}`}</div>
    </StyledProductGridElement>;
}

export default function useProducts(filter) {
    const [products, setProducts] = useState([]);
    const [productStatistics, setProductStatistics] = useState([]);
    const [loadingCounter, setLoadingCounter] = useState(0);
    let timer;

    useEffect(() => {
        setLoadingCounter(prevValue => prevValue + 1);
        ProductService.listProducts(filter).then(result => {
            const loadedProducts = result.data.products;
            setLoadingCounter(prevValue => prevValue - 1);

            if (loadedProducts.length > 0 || filter.page !== 1) {
                setLoadingCounter(prevValue => prevValue + 1);
                ProductService.listProductStatistics(loadedProducts.map(p => p.id))
                    .then(statsResult => {
                        const updatedStats = (filter.page === 1 ? [] : productStatistics).concat(statsResult.data.productStatistics);
                        setProductStatistics(updatedStats);

                        setLoadingCounter(prevValue => prevValue - 1);

                        if (filter.page === 1) setProducts([]);

                        for (let i = 0; i < loadedProducts.length; i++) {
                            const product = loadedProducts[i];
                            setLoadingCounter(prevValue => prevValue + 1);
                            setTimeout(() => {
                                const productWorker = new WorkerBuilder(ProductWorker);
                                productWorker.onmessage = (amountOfStatRows) => { setProducts(existingProducts => existingProducts.concat(productGridElement(product, amountOfStatRows))); };
                                productWorker.postMessage({ updatedStats, productId: product.id });
                                setLoadingCounter(prevValue => prevValue - 1);
                            }, i * 300);
                        }
                    });
            } else {
                setProductStatistics([]);
                setProducts([]);
            }
        });
    }, [filter.page, filter.searchWord, filter.showActiveOnly]);

    return { products, loadingCounter };
}