'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { IoIosChatbubbles, IoMdClose } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
import Image from 'next/image';
import axiosFe from '@/helpers/call-fe'; // Assuming this path is correct
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
    sender: 'bot' | 'user';
    text: string;
}

// --- API Call (Keep as is, but added clearer error handling) ---
const getBotResponse = async (input: string, locale: string) => {
    try {
        const response = await axiosFe.post('/api/ask', { message: input, lang: locale });
        if (response?.data?.answer && typeof response.data.answer === 'string') {
            return response.data.answer;
        } else {
            console.warn('API response structure unexpected or answer missing:', response.data);
            return null;
        }
    } catch (error: any) {
        console.error('Error fetching bot response:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Failed to connect to chatbot service';
        throw new Error(errorMessage);
    }
};

// --- Localization Messages (Added suggestedQuestions) ---
const messages = {
    vi: {
        title: 'Trợ lý du lịch ảo',
        greeting: 'Xin chào! Tôi có thể giúp gì về chuyến đi của bạn?',
        placeholder: 'Nhập câu hỏi về du lịch...',
        send: 'Gửi',
        loading: 'Chatbot đang suy nghĩ...',
        error: 'Rất tiếc, đã xảy ra lỗi. Vui lòng thử lại sau.',
        apiError: 'Xin lỗi, tôi chưa thể trả lời câu hỏi này. Bạn có thể hỏi khác được không?',
        closeChat: 'Đóng chat',
        openChat: 'Mở chat hỗ trợ',
        suggestedQuestions: [
            "Những địa điểm du lịch nổi tiếng ở Thành phố Hồ Chí Minh?",
            "Thời tiết ở Thành phố Hồ Chí Minh như thế nào?",
            "Chi phí cho chuyến đi 3 ngày ở Thành phố Hồ Chí Minh là bao nhiêu?",
        ],
    },
    en: {
        title: 'Virtual Travel Assistant',
        greeting: 'Hi there! How can I help with your travel plans?',
        placeholder: 'Ask a travel question...',
        send: 'Send',
        loading: 'Chatbot is thinking...',
        error: 'Sorry, an error occurred. Please try again later.',
        apiError: 'Sorry, I can\'t answer that question right now. Could you ask something else?',
        closeChat: 'Close chat',
        openChat: 'Open support chat',
        suggestedQuestions: [
            "Famous tourist spots in Ho Chi Minh City?",
            "How's the weather in Ho Chi Minh City?",
            "Cost for a 3-day trip to Ho Chi Minh City?",
        ],
    },
    ja: {
        title: 'バーチャル旅行アシスタント',
        greeting: 'こんにちは！旅行の計画についてお手伝いできますか？',
        placeholder: '旅行に関する質問を入力...',
        send: '送信',
        loading: 'チャットボットが考えています...',
        error: '申し訳ありませんが、エラーが発生しました。後でもう一度お試しください。',
        apiError: '申し訳ありませんが、現在その質問にはお答えできません。他の質問をしていただけますか？',
        closeChat: 'チャットを閉じる',
        openChat: 'サポートチャットを開く',
        suggestedQuestions: [
            "ブンタウの有名な観光スポットは？",
            "ブンタウの天気はどうですか？",
            "ブンタウで3日間の旅行費用はいくらですか？",
        ]
    }
};

const CHAT_HISTORY_KEY = 'vt_chatbot_history_v2';

const VirtualAssistant = () => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showFab, setShowFab] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const t = messages[locale as keyof typeof messages] ?? messages.en;

    const [messagesList, setMessagesList] = useState<ChatMessage[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
                if (savedHistory) {
                    const parsedHistory = JSON.parse(savedHistory);
                    if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
                        const validHistory = parsedHistory.filter(
                            (item): item is ChatMessage =>
                                item && typeof item.sender === 'string' && typeof item.text === 'string' && (item.sender === 'user' || item.sender === 'bot')
                        );
                        if (validHistory.length > 0) return validHistory;
                    }
                }
            } catch (error) {
                console.error('Failed to load or parse chat history from localStorage:', error);
                localStorage.removeItem(CHAT_HISTORY_KEY);
            }
        }
        return [{ sender: 'bot', text: t.greeting }];
    });

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }, []);

    useEffect(() => {
        if (isChatOpen) {
            scrollToBottom();
        }
    }, [messagesList, isChatOpen, scrollToBottom]);

    useEffect(() => {
        if (typeof window !== 'undefined' && messagesList.length > 0) {
            try {
                if (messagesList.length > 1 || (messagesList.length === 1 && messagesList[0].text !== t.greeting)) {
                    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messagesList));
                }
            } catch (error) {
                console.error('Failed to save chat history to localStorage:', error);
            }
        }
    }, [messagesList, t.greeting]);

    // --- Send a specific message text (used by handleSend and suggested questions) ---
    const sendUserMessage = useCallback(async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: messageText.trim() };
        setMessagesList((prev) => [...prev, newUserMessage]);
        setInput(''); // Clear input field
        setIsLoading(true);
        // scrollToBottom(); // Will be handled by useEffect on messagesList change

        try {
            const botMsgText = await getBotResponse(messageText.trim(), locale);
            const botMsg: ChatMessage = {
                sender: 'bot',
                text: botMsgText ?? t.apiError,
            };
            setMessagesList((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Error in sendUserMessage:", error);
            setMessagesList((prev) => [
                ...prev,
                { sender: 'bot', text: (error as Error).message || t.error }
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, locale, t, setIsLoading, setMessagesList, setInput /* scrollToBottom removed, handled by useEffect */]);


    const handleSend = useCallback(async () => {
        sendUserMessage(input);
    }, [input, sendUserMessage]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
            e.preventDefault();
            handleSend();
        }
    };
    
    const handleSuggestedQuestionClick = (question: string) => {
        sendUserMessage(question);
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowFab(window.scrollY > 150);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    const fabVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    };

    const chatWindowVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', duration: 0.4 } },
        exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } }
    };

    // Condition to show suggested questions
    const shouldShowSuggestions = !isLoading &&
                                   isChatOpen &&
                                   t.suggestedQuestions &&
                                   t.suggestedQuestions.length > 0 &&
                                   (
                                       (messagesList.length === 1 && messagesList[0].sender === 'bot') || // Only greeting
                                       (messagesList.length > 1 && messagesList[messagesList.length - 1].sender === 'bot') // Last message from bot
                                   );

    return (
        <>
            <AnimatePresence>
                {showFab && !isChatOpen && (
                    <motion.button
                        key="fab"
                        variants={fabVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={toggleChat}
                        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                        aria-label={t.openChat}
                    >
                        <IoIosChatbubbles size={28} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        key="chat-window"
                        variants={chatWindowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md h-[75vh] max-h-[600px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-200/50"
                        style={{
                            bottom: showFab ? 'calc(4.5rem + 1.5rem)' : '1.5rem',
                        }}
                    >
                        <header className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-between shadow-sm flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full overflow-hidden bg-white/30 flex items-center justify-center">
                                    <Image src="/chatbot.png" alt="Bot" width={20} height={20} className="rounded-full" />
                                </div>
                                <h2 className="text-lg font-semibold">{t.title}</h2>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1"
                                aria-label={t.closeChat}
                            >
                                <IoMdClose size={24} />
                            </button>
                        </header>

                        <div className="flex-1 px-4 py-4 overflow-y-auto text-sm space-y-3 bg-gradient-to-br from-gray-50 to-gray-100/70 custom-scrollbar">
                             {messagesList.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'bot' && (
                                        <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden bg-gray-300 self-start border border-gray-200">
                                            <Image src="/chatbot.png" alt="Bot Avatar" width={28} height={28} />
                                        </div>
                                    )}
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl max-w-[80%] shadow-sm leading-relaxed ${
                                            msg.sender === 'bot'
                                                ? 'bg-white text-gray-800 rounded-bl-lg border border-gray-200/80'
                                                : 'bg-blue-600 text-white rounded-br-lg shadow-md'
                                        }`}
                                    >
                                        {msg.text.split('\n').map((line, i) => (
                                          <span key={i}>
                                            {line}
                                            {i < msg.text.split('\n').length - 1 && <br />}
                                          </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Suggested Questions Section */}
                            {shouldShowSuggestions && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: messagesList.length * 0.05 + 0.1 }} // Delay after last message
                                    className="pt-2 pb-1 flex flex-col items-start space-y-2" // Changed to flex-col for stacked appearance
                                >
                                    {t.suggestedQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestedQuestionClick(question)}
                                            className="px-3 py-1.5 text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-full transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm hover:shadow-md w-auto text-left"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                             {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 justify-start px-2 py-2"
                                >
                                    <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden bg-gray-300">
                                        <Image src="/images/chatbot.png" alt="Bot Avatar" width={28} height={28} />
                                    </div>
                                    <div className="px-4 py-2.5 rounded-2xl rounded-bl-lg bg-white text-gray-500 shadow-sm border border-gray-200/80 italic flex gap-1.5 items-center">
                                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={chatEndRef} className="h-1" />
                        </div>

                        <div className="px-4 py-3 border-t border-gray-200 flex items-center bg-white flex-shrink-0">
                            <input
                                type="text"
                                placeholder={t.placeholder}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                disabled={isLoading}
                                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition duration-200"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="ml-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white p-2.5 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                aria-label={t.send}
                            >
                                <FiSend size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

             <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 10px;
                    border: 3px solid transparent;
                }
                 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </>
    );
};

export default VirtualAssistant;