import React from 'react';

const SearchItem = ({ searchItem, setSearchItem }) => {
    return (
        <form className='searchForm' onSubmit={(e) => e.preventDefault}>
            <label htmlFor='search'>Search Item(s)</label>
            <input
                id='search'
                type='text'
                role='searchbox'
                placeholder='Search Item(s)'
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
        </form>
    );
};

export default SearchItem;
