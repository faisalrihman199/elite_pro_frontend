import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAPI } from './APIContext';
import axios from 'axios';

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const { getUser, getConfig } = useAPI();
    const user = getUser() || null;
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const wsServer = import.meta.env.VITE_APP_SOCKET_URL;
    const server = import.meta.env.VITE_APP_API_URL;
    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessageData, setNewMessage] = useState({});
    const [newConversation, setNewConversation] = useState({});

    // Chat
    const allConversations = async () => {
        const response = await axios.get(`${server}/chat/getConversations`, getConfig());
        return response.data;
    };
    const contactList = async () => {
        const response = await axios.get(`${server}/employee/contactList`, getConfig());
        return response.data;
    };
    const oneConversation = async (id) => {
        const response = await axios.get(`${server}/chat/getOneConversation/${id}`, getConfig());
        return response.data;
    };

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await allConversations();
                setConversations(res.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };

        if (user) {
            fetchConversations();
        }
    }, [user]);

    useEffect(() => {
        let reconnectInterval = null;

        const connectSocket = () => {
            if (user) {
                const wsUrl = `${wsServer}?token=${user.token}`;
                const newSocket = new WebSocket(wsUrl);

                newSocket.onopen = () => {
                    console.log('WebSocket connected');
                    setIsConnected(true);
                    clearInterval(reconnectInterval);
                    sendTestMessage(newSocket); // Send test message after connection
                };

                newSocket.onmessage = (message) => {
                    console.log('Message received:', message);
                    
                    const msg = JSON.parse(message.data);
                    if (msg.action === 'receiveMessage') {
                        setNewMessage(msg.message);  // This should update the state
                    }

                    // Handle received message logic here
                };

                newSocket.onclose = () => {
                    console.log('WebSocket disconnected');
                    setIsConnected(false);
                    if (!reconnectInterval) {
                        reconnectInterval = setInterval(() => {
                            console.log('Reconnecting WebSocket...');
                            connectSocket();
                        }, 10000);
                    }
                };

                newSocket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };

                setSocket(newSocket);

                return () => {
                    newSocket.close();
                    clearInterval(reconnectInterval);
                    setIsConnected(false);
                };
            } else {
                setSocket(null);
                setIsConnected(false);
                clearInterval(reconnectInterval);
            }
        };

        connectSocket();

        return () => {
            clearInterval(reconnectInterval);
        };
    }, [user, wsServer]);


    const sendMessage = (content, senderId, receiverId) => {
        return new Promise((resolve, reject) => {
            if (socket && isConnected) {
                const messageAction = {
                    action: 'sendMessage',
                    content: content,
                    senderId: senderId,
                    receiverId: receiverId,
                };

                socket.send(JSON.stringify(messageAction));
                console.log('Message sent:', messageAction);

                // Handle acknowledgment from the server
                socket.onmessage = (response) => {
                    const data = JSON.parse(response.data);
                    if (data) {
                        console.log('Acknowledgment received:', data);
                        resolve(data);
                    } else {
                        reject(new Error('Unexpected response format.'));
                    }
                };
            } else {
                reject(new Error('WebSocket is not connected. Cannot send message.'));
            }
        });
    };

    const sendTestMessage = (socket) => {
        if (socket && isConnected) {
            const testMessage = {
                action: 'sendMessage',
                content: 'Test message from WebSocket!',
                senderId: 4,
                receiverId: 2,
            };
            console.log('Sending test message:', testMessage);
            socket.send(JSON.stringify(testMessage));
        } else {
            console.log('Socket is not connected, unable to send test message');
        }
    };
    const disconnectSocket = () => {
        if (socket && isConnected) {
            socket.close();  // Close the WebSocket connection
            setIsConnected(false);
            console.log('WebSocket disconnected');
        }
    };
    const provider = {
        socket, isConnected, sendMessage, conversations, contactList, activeConversation, oneConversation, disconnectSocket, newMessageData
    }

    return (
        <SocketContext.Provider value={provider}>
            {children}
        </SocketContext.Provider>
    );
};
const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };

