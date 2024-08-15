import React, { useState, FormEvent } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Interface Definition
interface ChatResponse {
    response: string;
}

const ChatForm: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data: ChatResponse = await res.json();
            setResponse(data.response);
            setOpen(true);
        } catch (error) {
            console.error('Error chatting with backend:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setUserInput('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Enter your query"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                variant="outlined"
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Chat
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Response</DialogTitle>
                <DialogContent>
                    <DialogContentText>{response}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ChatForm;