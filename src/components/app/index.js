import React from 'react';
import Header from '../header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BallsNavigation from '../balls-navigation';

function About() {
    return (
        <div className="page page-about">
            <h1>{'About'}</h1>
        </div>
    );
}

function Page1() {
    return (
        <div className="page page-1">
            <h1>{'Page 1'}</h1>
        </div>
    );
}

function Page2() {
    return (
        <div className="page page-2">
            <h1>{'Page 2'}</h1>
        </div>
    );
}

export default function App() {
    return <div className="balls-app-root">
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={BallsNavigation} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/page1" component={Page1} />
                    <Route exact path="/page2" component={Page2} />
                </Switch>
            </div>
        </BrowserRouter>
    </div>;
}

