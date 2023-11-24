import React, {Suspense} from 'react';
import PokeContainer from "./pages/home/PokeContainer";
import {Route, Routes} from "react-router-dom";
import DetailedPoke from "./pages/detailedPoke/DetailedPoke";

function App() {
    return (
        <Suspense fallback={'404'}>
            <Routes>
                <Route path={'/'} element={<PokeContainer/>}/>
                <Route path={'/:name'} element={<DetailedPoke/>}/>
            </Routes>
        </Suspense>
    );
}

export default App;
