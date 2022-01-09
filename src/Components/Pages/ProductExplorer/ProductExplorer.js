import React, { useState } from 'react';
import { Button, Grid, Container, Box, FormControlLabel, Switch } from '@mui/material';
import Loader from "react-js-loader";
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './StyledComponents';
import mergeDeep from '../../../tools/mergeDeep';
import useProducts from './ProductHook';

const ProductExplorer = () => {
    const [filter, setFilter] = useState({
        searchWord: '',
        showActiveOnly: true,
        page: 1,
        reloadAll: false
    });

    const { products, loadingCounter } = useProducts(filter)


    const onChangeSearch = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.searchWord = e.target.value;
        filterToUpdate.page = 1;
        setFilter(filterToUpdate);
    }

    const onChangeActiveSwitch = (e) => {
        e.preventDefault();
        const filterToUpdate = mergeDeep({}, filter);
        filterToUpdate.showActiveOnly = !filter.showActiveOnly;
        filterToUpdate.page = 1;
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