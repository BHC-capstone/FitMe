import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
import TrainerList from './trainer_list/TrainerList';
import Trainerdetail from './trainer_list/Trainerdetail';
import NotFound from './trainer_list/notfound';

const App = () => {
	return (
		<div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<TrainerList />}></Route>
                  <Route path="/trainer_info/:id" element={<Trainerdetail />}></Route>
                  <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
		</div>
	);
};

export default App;