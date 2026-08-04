import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import "./Chatbot.css";
import axios from "axios";
const Chatbot = () => {
   const [messages, setMessages] = useState([
    {
        sender: "bot",
        text: "👋 Hi! I'm CarbonTrack AI.\nAsk me anything about carbon emissions or sustainability."
    }
]);

const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
        sender: "user",
        text: input
    };

    setMessages(prev => [...prev, userMessage]);

    const question = input;

    setInput("");

    setLoading(true);

    try {
       const token = localStorage.getItem("token");

const response = await axios.post(
    "http://localhost:8080/api/chat",
    {
        message: question
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

        setMessages(prev => [
            ...prev,
            {
                sender: "bot",
                text: response.data.reply
            }
        ]);

    } catch (error) {

        setMessages(prev => [
            ...prev,
            {
                sender: "bot",
                text: "⚠️ Unable to contact CarbonTrack AI."
            }
        ]);

    }

    setLoading(false);

};
    return (
        <>
            <div
                className="chatbot-button"
                onClick={() => setOpen(!open)}
            >
                <FaRobot />
            </div>

            {
                open && (

                    <div className="chat-window">

                        <div className="chat-header">

                            <span>
                                🤖 CarbonTrack AI
                            </span>

                            <button
                                onClick={() => setOpen(false)}
                            >
                                ✖
                            </button>

                        </div>

                        <div className="chat-body">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={
                                    msg.sender === "user"
                                        ? "user-message"
                                        : "bot-message"
                                }
                            >
                                {msg.text}
                            </div>

                        ))}
                        {
                            loading && (
                                <div className="bot-message">
                                    🤖 CarbonTrack AI is typing...
                                </div>
                            )
                        }

                    </div>
                    <div className="chat-footer">

                        <input
                            type="text"
                            placeholder="Ask CarbonTrack AI..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />

                        <button onClick={sendMessage}>
                            ➤
                        </button>

                    </div>

                    </div>

                )
            }

        </>
    );

};

export default Chatbot;