import { IoMdSend } from 'react-icons/io';
import './ia-chat.scss';
import { useEffect, useState } from 'react';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import { FaRobot } from 'react-icons/fa';

interface MessageProps {
    message: string;
    sender: string;
}
function Message({ message, sender }: MessageProps) {
    return (
        <div className={`message ${sender}`}>
            <div className="icon">
                <FaRobot />
            </div>

            <div className="content">
                <span>{sender}</span>
                <ReactMarkdown>
                    {message}
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default function IAChat() {
    const previousTexts: Content[] = [
        { role: "user", parts: [{ text: "You are a robot that responds in the user's language and is playful, but always helpful and accurate in your responses" }] }
    ];

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<MessageProps[]>([]);

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


    const addMessage = (message: string, sender: string) => {
        setMessages((prev) => [...prev, { message, sender }]);
        previousTexts.push({ role: sender == 'user' ? sender : 'model', parts: [{ text: message }] });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.trim() === '') return;

        addMessage(input, 'You');
        setInput('');

        const genAI = new GoogleGenerativeAI(API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const chat = model.startChat({
            history: previousTexts,
            generationConfig: {
                maxOutputTokens: 100,
            }
        });

        chat.sendMessage(input)
            .then(result => {
                const text = result.response.text();

                addMessage(text, 'IA');
            });
    };

    useEffect(() => {
        const chat = document.querySelector('.chat');
        chat?.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (API_KEY) {
            addMessage("Hi! How can i help you?", "IA");
        }

        if (!API_KEY) {
            addMessage("It looks like you haven't set up an API Key", "IA");
            addMessage("Clone [this repository](https://github.com/gabrielmjacques/desktopui) and configure it", "IA");
        }
    }, [API_KEY]);

    return (
        <>
            <form className='ia-container' onSubmit={handleSubmit}>

                <div className="chat">

                    {
                        // This is just a dummy data to show the chat
                        messages.map((msg, index) => <Message key={index} message={msg.message} sender={msg.sender} />)
                    }

                </div>

                <div className="inputs">
                    <input
                        type="text"
                        placeholder='Enter your prompt here'
                        value={input}
                        onChange={(e) => {
                            API_KEY ? setInput(e.target.value) : setInput('');
                        }}
                    />
                    <button type="submit"><IoMdSend /></button>
                </div>
            </form>
        </>
    );
}