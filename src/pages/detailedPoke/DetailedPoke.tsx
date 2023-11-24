import React, {useState} from 'react';
import {pokeAPI} from "../../service/PokeService";
import {useParams, NavLink, useNavigate} from "react-router-dom";
import {IType} from "../../models/IPoke";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import {useAppDispatch} from "../../hooks/redux";
import {pokeSlice} from "../../store/reducers/PokeReducer";
import {getSortedPoke} from "../../store/reducers/ActionCreators";


const DetailedPoke: React.FC = () => {
    const {name} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [curImg, setCurImg] = useState<number>(1);
    const [onItem, setOnItem] = useState<number>(null);
    const {data: pokeInfo, error, isLoading} = pokeAPI.useGetPokeByNameQuery(name);

    const {setSortId} = pokeSlice.actions;


    const changeImg = (imgNum: number) => {
        if (imgNum === 0) {
            setCurImg(2);
            return;
        }
        if (imgNum === 3) {
            setCurImg(1);
            return;
        }
        setCurImg(imgNum);
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

    const getFilteredItems = (sortUrl: string) => {
        const splitSortUrl: string[] = sortUrl.split('/');
        const typeNumber = splitSortUrl.splice(splitSortUrl.length - 2, 1);

        dispatch(setSortId({id: typeNumber[0], value: sortUrl}));
        dispatch(getSortedPoke());
        navigate('/');
    }

    return (
        <div className={'poke-detailed'}>
            <div className={'mb-3'}>
                <NavLink to={'/'} className={'btn btn-secondary btn-sm'}>Go back</NavLink>
            </div>
            <div className="card">
                <div id="carouselExampleControls" className="carousel slide">
                    <div className="carousel-inner">
                        {pokeInfo.sprites.other.home.front_default &&
                            <div className={`carousel-item ${curImg === 1 ? 'active' : ''}`}>
                                <img src={pokeInfo.sprites.other.home.front_default} className="d-block w-100"
                                     alt="default"/>
                            </div>}
                        {pokeInfo.sprites.other.home.front_shiny &&
                            <div className={`carousel-item ${curImg === 2 ? 'active' : ''}`}>
                                <img src={pokeInfo.sprites.other.home.front_shiny} className="d-block w-100"
                                     alt="shiny"/>
                            </div>}

                        {!pokeInfo.sprites.other.home.front_shiny && !pokeInfo.sprites.other.home.front_default &&
                            pokeInfo.sprites.front_default &&

                            <div className={`carousel-item ${curImg === 2 ? 'active' : ''}`}>
                                <img src={pokeInfo.sprites.front_default} className="d-block w-100"
                                     alt="default_little"/>
                            </div>}

                        {!pokeInfo.sprites.other.home.front_shiny && !pokeInfo.sprites.other.home.front_default &&
                            !pokeInfo.sprites.front_default && <h5 className={'text-center'}>No images</h5>}
                    </div>
                    <button className="carousel-control-prev"
                            onClick={() => changeImg(curImg - 1)}
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next"
                            onClick={() => changeImg(curImg + 1)}
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{pokeInfo.name}</h3>

                    <div className={'d-flex poke-detailed__lists-block mb-2'}>
                        <div className={'poke-detailed__list'}>
                            <p className={'fw-bolder mb-1'}>Skills:</p>
                            <ul className="list-group">
                                {pokeInfo.moves.map((skill, i) =>
                                    <li className="list-group-item" key={i}>{skill.move.name}</li>
                                )}
                            </ul>
                        </div>
                        <div className={'poke-detailed__list'}>
                            <p className={'fw-bolder mb-1'}>Types:</p>
                            <ul className="list-group">
                                {pokeInfo.types.map((typeData: IType, i) =>
                                    <li className="d-flex align-items-center justify-content-between list-group-item type-li"
                                        key={i}
                                        onMouseEnter={() => {
                                            setOnItem(i);
                                        }}
                                        onMouseLeave={() => {
                                            setOnItem(null);
                                        }}
                                    >
                                        <div>
                                            {typeData.type.name}
                                        </div>
                                        <div>
                                            {onItem === i &&
                                                <button className={'btn type-btn btn-sm btn-outline-secondary'}
                                                    onClick={() => getFilteredItems(typeData.type.url)}
                                                >
                                                    Filter by
                                                </button>}
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedPoke;