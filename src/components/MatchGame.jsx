import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

// Shared Pun Data
const punData = [
    { id: 1, name: 'Peach', emoji: '🍑', pun: 'Warm and fuzzy', translation: '溫暖又毛茸茸' },
    { id: 2, name: 'Ice Cream', emoji: '🍦', pun: 'I scream', translation: '尖叫' },
    { id: 3, name: 'Pea', emoji: '🫛', pun: 'Peaceful', translation: '和平的' },
    { id: 4, name: 'Strawberry', emoji: '🍓', pun: 'Sweet as a strawberry', translation: '甜美的' },
    { id: 5, name: 'Pineapple', emoji: '🍍', pun: 'Pining for an apple', translation: '渴望' },
    { id: 6, name: 'Banana', emoji: '🍌', pun: 'Go bananas', translation: '發瘋 / 狂熱' },
    { id: 7, name: 'Taffy', emoji: '🍬', pun: 'Laughy', translation: '充滿歡笑' },
    { id: 8, name: 'Corn', emoji: '🌽', pun: 'Cornball', translation: '俗氣但有趣的人' }
];

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const speakText = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }
};

export default function MatchGame() {
    const [foods, setFoods] = useState([]);
    const [puns, setPuns] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedPun, setSelectedPun] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [shakeWrong, setShakeWrong] = useState(false);

    const initGame = () => {
        setFoods(shuffleArray(punData));
        setPuns(shuffleArray(punData));
        setSelectedFood(null);
        setSelectedPun(null);
        setMatchedPairs([]);
        setShakeWrong(false);
    };

    useEffect(() => {
        initGame();
    }, []);

    useEffect(() => {
        if (selectedFood && selectedPun) {
            if (selectedFood.id === selectedPun.id) {
                setMatchedPairs(prev => [...prev, selectedFood.id]);
                speakText(`${selectedFood.name}! ${selectedPun.pun}`);
                setSelectedFood(null);
                setSelectedPun(null);
            } else {
                setShakeWrong(true);
                setTimeout(() => {
                    setShakeWrong(false);
                    setSelectedFood(null);
                    setSelectedPun(null);
                }, 600);
            }
        }
    }, [selectedFood, selectedPun]);

    const isGameComplete = matchedPairs.length === punData.length && punData.length > 0;

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-indigo-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"></div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-extrabold text-indigo-800 flex items-center gap-2">
                        🎮 Match the Pun!
                    </h2>
                    <p className="text-gray-600 mt-2 font-medium">Connect the food item to its matching pun phrase.</p>
                </div>
                <button
                    onClick={initGame}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded-full transition-colors cursor-pointer"
                >
                    <RotateCcw size={18} /> Reset Game
                </button>
            </div>
            {isGameComplete ? (
                <div className="text-center py-12 bg-green-50 rounded-2xl border-2 border-green-200 animate-pulse">
                    <span className="text-6xl mb-4 block">🎉</span>
                    <h3 className="text-3xl font-bold text-green-700 mb-2">Awesome job!</h3>
                    <p className="text-green-600">You matched all the puns correctly!</p>
                    <button
                        onClick={initGame}
                        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer"
                    >
                        Play Again
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-700 mb-4 text-center border-b-2 border-dashed border-gray-300 pb-2">Food Items</h3>
                        {foods.map((food) => {
                            const isMatched = matchedPairs.includes(food.id);
                            const isSelected = selectedFood?.id === food.id;
                            return (
                                <button
                                    key={`food-${food.id}`}
                                    disabled={isMatched || shakeWrong}
                                    onClick={() => {
                                        speakText(food.name);
                                        setSelectedFood(prev => prev?.id === food.id ? null : food);
                                    }}
                                    className={`w-full flex items-center p-4 rounded-xl border-2 text-left transition-all duration-200
                                        ${isMatched ? 'opacity-50 bg-gray-100 border-gray-200 cursor-not-allowed' :
                                            isSelected ? 'bg-indigo-100 border-indigo-500 shadow-md scale-[1.02]' :
                                                'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer shadow-sm'}
                                        ${isSelected && shakeWrong ? 'animate-shake' : ''}
                                    `}
                                >
                                    <span className="text-3xl mr-4">{food.emoji}</span>
                                    <span className="text-xl font-bold text-gray-800">{food.name}</span>
                                    {isMatched && <CheckCircle2 className="ml-auto text-green-500" size={24} />}
                                </button>
                            );
                        })}
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-700 mb-4 text-center border-b-2 border-dashed border-gray-300 pb-2">Pun Phrases</h3>
                        {puns.map((punObj) => {
                            const isMatched = matchedPairs.includes(punObj.id);
                            const isSelected = selectedPun?.id === punObj.id;
                            return (
                                <button
                                    key={`pun-${punObj.id}`}
                                    disabled={isMatched || shakeWrong}
                                    onClick={() => {
                                        speakText(punObj.pun);
                                        setSelectedPun(prev => prev?.id === punObj.id ? null : punObj);
                                    }}
                                    className={`w-full flex items-center p-4 rounded-xl border-2 text-left transition-all duration-200 min-h-[76px]
                                        ${isMatched ? 'opacity-50 bg-gray-100 border-gray-200 cursor-not-allowed' :
                                            isSelected ? 'bg-pink-100 border-pink-500 shadow-md scale-[1.02]' :
                                                'bg-white border-gray-200 hover:border-pink-300 hover:bg-pink-50 cursor-pointer shadow-sm'}
                                        ${isSelected && shakeWrong ? 'animate-shake' : ''}
                                    `}
                                >
                                    <span className="text-lg font-bold text-gray-800">"{punObj.pun}"</span>
                                    {isMatched && <CheckCircle2 className="ml-auto text-green-500" size={24} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}