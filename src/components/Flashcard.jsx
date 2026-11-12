import React, { useState } from 'react';

// Utility for Speech Synthesis
const speakText = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }
};

export default function Flashcard({ item }) {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div
            className="relative w-full h-72 cursor-pointer group perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front of Card */}
                <div className={`absolute w-full h-full backface-hidden rounded-2xl border-4 ${item.borderColor} ${item.color} shadow-lg flex flex-col items-center justify-center p-4 hover:shadow-xl transition-shadow`}>
                    <span className="text-7xl mb-3 drop-shadow-md">{item.emoji}</span>
                    <h3 className="text-3xl font-bold text-gray-800 tracking-wide">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                speakText(item.name);
                            }}
                            className="text-xs bg-white/80 hover:bg-white text-slate-800 font-bold px-3 py-1 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer"
                        >
                            🔊 Listen
                        </button>
                        <span className="text-xs text-gray-500 font-medium bg-white/50 px-2.5 py-1 rounded-full">
                            Tap to flip!
                        </span>
                    </div>
                </div>
                {/* Back of Card */}
                <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl border-4 ${item.borderColor} bg-white shadow-lg flex flex-col items-center justify-center p-5 text-center`}>
                    <h4 className="text-xl font-bold text-indigo-600 mb-1">"{item.pun}"</h4>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            speakText(item.pun);
                        }}
                        className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 rounded-full shadow-sm mb-2 hover:scale-105 transition-transform cursor-pointer"
                    >
                        🔊 Listen
                    </button>
                    <p className="text-gray-700 text-xs mb-2 font-medium line-clamp-2">{item.explanation}</p>
                    <div className="w-full h-px bg-gray-200 my-1"></div>
                    <p className="text-base font-bold text-gray-800">{item.translation}</p>
                    <p className="text-xs text-blue-600 font-mono tracking-widest mt-1 bg-blue-50 px-2 py-0.5 rounded">{item.zhuyin}</p>
                </div>
            </div>
        </div>
    );
}