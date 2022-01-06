import React, { useState, useEffect } from 'react';
import { Card, Button, Grid, Container, Box, FormControlLabel, Switch } from '@mui/material';
import * as helper from './ProductExplorerHelper';
import Loader from "react-js-loader";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './StyledComponents';
import { styled } from "@mui/material/styles";
import mergeDeep from '../../../tools/mergeDeep';

const StyledProductGridElement = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark
}));

const productGridElement = (product, stats) => {
    const amountOfStatRows = stats.filter(ps => ps.productToTrackId === product.id.toString()).length;
    return <StyledProductGridElement item sm={3} md={4}>
        <div>{`${product.name} - ${product.fetchedOn} - ${product.inactivatedOn ? 'Inactive -' : ''} ${amountOfStatRows}`}</div>

    </StyledProductGridElement>;
}

const emptyGridElement = <StyledProductGridElement item sm={12} md={12}>
    No products found
</StyledProductGridElement>;

const ProductExplorer = () => {
    const [filter, setFilter] = useState({
        searchWord: '',
        showActiveOnly: true,
        page: 1
    });
    const [products, setProducts] = useState([]);
    const [productStatistics, setProductStatistics] = useState([]);
    const [loadingCounter, setLoadingCounter] = useState(0);

    useEffect(() => {
        if (filter.page <= 1) return;

        setLoadingCounter(loadingCounter + 1);
        helper.listProducts(filter).then(result => {
            const loadedProducts = result.data.products;

            if (loadedProducts.length > 0) {
                setLoadingCounter(loadingCounter + 1);
                helper.listProductStatistics(loadedProducts.map(p => p.id))
                    .then(statsResult => {
                        setLoadingCounter(loadingCounter - 1);

                        const updatedStats = productStatistics.concat(statsResult.data.productStatistics);
                        setProductStatistics(updatedStats);

                        setLoadingCounter(loadingCounter - 1);
                        setProducts(products.concat(loadedProducts.map(p => productGridElement(p, updatedStats))));
                    });
            }
        });
    }, [filter.page]);

    useEffect(() => {
        reload();
    }, [filter.searchWord, filter.showActiveOnly]);

    const reload = () => {
        setLoadingCounter(loadingCounter + 1);
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.page = 1;
        setFilter(filterToUpdate);

        helper.listProducts(filterToUpdate).then(result => {
            const loadedProducts = result.data.products;

            if (loadedProducts.length > 0) {
                setLoadingCounter(loadingCounter + 1);
                helper.listProductStatistics(loadedProducts.map(p => p.id))
                    .then(statsResult => {
                        setLoadingCounter(loadingCounter - 1);

                        const updatedStats = statsResult.data.productStatistics;
                        setProductStatistics(updatedStats);

                        setLoadingCounter(loadingCounter - 1);
                        setProducts(loadedProducts.map(p => productGridElement(p, updatedStats)));
                    });
            } else {
                setProducts([emptyGridElement]);
            }
        });
    };

    const onChangeSearch = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.searchWord = e.target.value;
        setFilter(filterToUpdate);
    }

    const onChangeActiveSwitch = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.showActiveOnly = !filter.showActiveOnly;
        setFilter(filterToUpdate);
    }

    const onClickLoadMore = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.page = filter.page + 1;
        setFilter(filterToUpdate);
    }

    const search =
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                id='search'
                key='search'
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChangeSearch}
                value={filter.searchWord}
            />
        </Search>;

    return (
        <Container style={{ backgroundColor: 'white' }} maxWidth="xl">
            <h1>Product Explorer</h1>
            <Grid container>
                loading counter: {loadingCounter}
                {search}
                <FormControlLabel control={<Switch defaultChecked checked={filter.showActiveOnly} onClick={onChangeActiveSwitch} />} label="Show Active Only" />
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={4} style={{ marginLeft: '-15px', marginTop: '10px' }}>
                {products}
            </Grid>
            {loadingCounter > 0 || <Button className="buttonOverride" variant="contained" color="secondary" onClick={onClickLoadMore} >
                Load More
            </Button>}
            {loadingCounter <= 0 || <Loader type="ekvalayzer" bgColor={"#000000"} color={'#FFFFFF'} size={20} />}
        </Container >
    );
};

export default ProductExplorer;