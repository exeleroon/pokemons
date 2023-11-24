import React, {FC, useEffect, useState} from 'react';
import {IPoke} from "../../models/IPoke";
import {NavLink} from "react-router-dom";

interface PokeItemProps {
    poke: IPoke;
}

const PokeItem: FC<PokeItemProps> = ({poke}) => {
    const itemRef: React.RefObject<any> = React.createRef();
    const [onItem, setOnItem] = useState<boolean>(false);

    const randomColor = () => {
        const color: number[] = [];
        for (let i = 0; i < 3; i++) {
            color.push(Math.floor(Math.random() * 256));
        }
        return 'rgba(' + color.join(', ') + ', 0.3)';
    }

    const setRandomColor = (el: any, randomAndHover: boolean) => {
        setOnItem(randomAndHover);
        el.style.backgroundColor = randomAndHover ? randomColor() : 'inherit';
    }

    useEffect(() => {
        const el = itemRef.current;
        if (el) {
            el.addEventListener("mouseenter", () => setRandomColor(el, true));
            el.addEventListener("mouseleave", () => setRandomColor(el, false));
        }
    }, [])

    return (
        <div className="d-flex justify-content-between align-items-center list-group-item list-group-item-action"
             ref={itemRef}
        >
            <div>{poke.name}</div>
            {onItem && <div>
                <NavLink to={`/${poke.name}`} className={'btn btn-outline-secondary btn-sm'}>Go to detail view</NavLink>
            </div>}
        </div>
    )
};

export default PokeItem;