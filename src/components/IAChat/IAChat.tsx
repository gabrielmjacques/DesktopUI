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
        { role: 'user', parts: [{ text: 'Você é um robo que responde em português e é brincalhão, mas sempre prestativo e preciso em suas respostas' }] }
    ];

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<MessageProps[]>([
        { message: 'Olá, como posso ajudar?', sender: 'IA' }
    ]);

    const addMessage = (message: string, sender: string) => {
        setMessages((prev) => [...prev, { message, sender }]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.trim() === '') return;

        addMessage(input, 'You');
        setInput('');

        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const chat = model.startChat({
            history: previousTexts,
            generationConfig: {
                maxOutputTokens: 100
            }
        });

        chat.sendMessage(input)
            .then(result => {
                const text = result.response.text();
                previousTexts.push({ role: 'user', parts: [{ text: input }] });

                addMessage(text, 'IA');
            });
    };

    useEffect(() => {
        const chat = document.querySelector('.chat');
        chat?.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    }, [messages]);

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
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit"><IoMdSend /></button>
                </div>
            </form>
        </>
    );
}