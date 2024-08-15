"use client"

import React from 'react';
import ChatForm from '@components/ChatForm';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Chat with Flask</h1>
            <ChatForm />
        </div>
    );
};

export default HomePage;