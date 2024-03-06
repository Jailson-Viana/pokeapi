import { BrowserRouter, Routes, Route } from "react-router-dom"
import { DetailsPage } from "../components/pages/details-page"
import { RenderPagesList } from "../../src/components/renderpages/index"

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<RenderPagesList />}></Route> 
                <Route exact path="/:name" element={<DetailsPage />}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export { AppRoute }