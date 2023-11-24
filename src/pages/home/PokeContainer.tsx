import React, {useEffect, useState} from 'react';
import {pokeAPI} from "../../service/PokeService";
import PokeItem from "./PokeItem";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import {pokeSlice} from "../../store/reducers/PokeReducer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import Error from "../../components/Error";
import {ITypeResult} from "../../models/IPoke";
import {getSortedPoke} from "../../store/reducers/ActionCreators";

const PokeContainer = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [limit, setLimit] = useState<number>(12);
    const [offset, setOffset] = useState<number>(0);
    const [curPage, setCurPage] = useState<number>(1);

    const [searchVal, setSearchVal] = useState(null);
    const [searchTouched, setSearchTouched] = useState<boolean>(false);

    const {data: pokeData, error, isLoading} = pokeAPI.useFetchAllPokeQuery({limit, offset});
    const {data: pokeTypeList} = pokeAPI.useGetPokeTypeListQuery(null);

    const {lastPage, sortedItems, sortedTypeId} = useAppSelector(state => state.pokeReducer);
    const {setClickedPage, setSortId} = pokeSlice.actions;

    useEffect(() => {
        if (lastPage) {
            setCurPage(lastPage);
            setOffset(12 * (lastPage - 1));
        }
    }, [])

    const doSort = (sort: string) => {
        if (!sort) {
            return;
        }
        const splitSortUrl: string[] = sort.split('/');
        const typeNumber = splitSortUrl.splice(splitSortUrl.length - 2, 1);

        if (sort === 'Show All') {
            dispatch(setSortId(null));
        } else {
            dispatch(setSortId({id: typeNumber[0], value: sort}));
            dispatch(getSortedPoke());
        }
    }

    if (isLoading) {
        return (
            <Loader/>
        )
    }
    if (error) {
        return (
            <Error error={error}/>
        )
    }

    return (
        <div className={'pokemon'}>
            <div className={'pokemon__container'}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Search pokemon by name</span>
                    <form onSubmit={e => {
                        e.preventDefault();
                        navigate(`/${searchVal}`);
                    }} className={`d-flex ${searchTouched && !searchVal ? 'needs-validation was-validated' : ''}`}
                    >
                        <input
                            className="form-control"
                            type="text"
                            onBlur={() => setSearchTouched(true)}
                            onChange={e => setSearchVal(e.target.value)}
                            required
                        />
                        <button type={'submit'} className={'btn btn-sm btn-outline-secondary'}>
                            Search
                        </button>
                    </form>
                </div>

                <div className={'mb-3'}>
                    <h5 className={'fs-6 mb-1'}>Filter by type</h5>
                    <select className="form-select"
                            onChange={e => doSort(e.target.value)}
                            defaultValue={sortedTypeId.value}
                    >
                        <option selected>Show all</option>

                        {pokeTypeList && pokeTypeList.results.map((type: ITypeResult, i) =>
                            <option key={i} value={type.url}>{type.name}</option>
                        )}

                    </select>
                </div>

                <div className="list-group mb-3">
                    {pokeData && !sortedItems && pokeData.results.map((poke, i) =>
                        <PokeItem key={i} poke={poke}/>
                    )}

                    {sortedItems && sortedItems.pokemon.map((poke, i) =>
                        <PokeItem key={i} poke={poke.pokemon}/>
                    )}
                </div>

                {pokeData && !sortedItems &&
                    <Pagination
                        pageSize={limit}
                        currentPage={lastPage ? lastPage : curPage}
                        totalItemsCount={pokeData.count}
                        onPageChange={(page) => {
                            setCurPage(page);
                            setOffset(12 * (page - 1));
                            dispatch(setClickedPage(page));
                        }}
                    />
                }
            </div>
            {error && <>Error</>}
        </div>
    );
};

export default PokeContainer;