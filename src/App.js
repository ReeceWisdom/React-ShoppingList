import { useState, useEffect } from 'react';
import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import apiRequest from './apiRequest';
import { FiLoader } from 'react-icons/fi';

function App() {
    const name = 'Reece Wisdom';
    const API_URL = 'http://localhost:3500/items';

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleGet = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error("'GET' Request Unsuccessful!");
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        setTimeout(() => {
            (async () => await handleGet())();
        }, 1000);
    }, []);

    const handleCheck = async (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setItems(listItems);
        const myItem = listItems.filter((item) => item.id === id);
        const putOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checked: myItem[0].chceked }),
        };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, putOptions);
        if (result) setFetchError(result);
    };

    const handleDelete = async (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
        const deleteOptions = {
            method: 'DELETE',
        };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);
        if (result) setFetchError(result);
    };

    const handleAdd = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(myNewItem),
        };
        const result = await apiRequest(API_URL, postOptions);
        if (result) setFetchError(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        handleAdd(newItem);
        setNewItem('');
    };

    return (
        <div className='App'>
            <Header title='Shopping List' />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem searchItem={searchItem} setSearchItem={setSearchItem} />
            <main>
                {isLoading && <FiLoader className='loader' />}
                {fetchError && !isLoading && (
                    <p className='errorText'>{fetchError}</p>
                )}
                {!fetchError && !isLoading && (
                    <Content
                        items={items.filter((item) =>
                            item.item
                                .toLowerCase()
                                .includes(searchItem.toLowerCase())
                        )}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                    />
                )}
            </main>
            <Footer length={items.length} author={name} />
        </div>
    );
}
export default App;
