import './Search.css';

const Search = () => {
    return(
        <div className="search">
            <div className='search-container'>
                <div className='search-form'>
                    <form>
                        <input type="text" placeholder="State"/>
                        <input type="text" placeholder="City"/>
                        <button>Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Search;