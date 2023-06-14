import React from 'react'
import { useState } from 'react';
import Login from './Login';
import Profile from './Profile';

import AuthenticatedContext from '../Middleware/authenticatedContext';

const Container = () => {
    
    const [authenticated, setAuthenticated] = useState(null);
    const value = { authenticated, setAuthenticated };

    return (
        <AuthenticatedContext.Provider value={value}>
            <div>
                {
                    localStorage.getItem("j-token")||authenticated?<Profile/>:<Login/>
                }
            </div>
        </AuthenticatedContext.Provider>
    )
}

export default Container