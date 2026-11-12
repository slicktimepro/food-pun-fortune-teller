import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, BookOpen, X } from 'lucide-react';

// --- Data for Flashcards & Games ---
const punData = [
    {
        id: 1,
        name: 'Peach',
        emoji: '🍑',
        pun: 'Warm and fuzzy',
        explanation: 'Kind and comforting, like the soft skin of a peach.',
        translation: '溫暖又毛茸茸',
        zhuyin: 'ㄨㄣ ㄋㄨㄢˇ ㄧㄡˋ ㄇㄠˊ ㄖㄨㄥˊ ㄖㄨㄥˊ',
        color: 'bg-orange-100',
        borderColor: 'border-orange-300'
    },
    {
        id: 2,
        name: 'Ice Cream',
        emoji: '🍦',
        pun: 'I scream',
        explanation: 'Sounds like "ice cream". Means yelling for what you want.',
        translation: '尖叫',
        zhuyin: 'ㄐㄧㄢ ㄐㄧㄠˋ',
        color: 'bg-pink-100',
        borderColor: 'border-pink-300'
    },
    {
        id: 3,
        name: 'Pea',
        emoji: '🫛',
        pun: 'Peaceful',
        explanation: 'A play on words; "pea" sounds like the start of "peace". Calm and quiet.',
        translation: '和平的',
        zhuyin: 'ㄏㄜˊ ㄆㄧㄥˊ ㄉㄜ˙',
        color: 'bg-green-100',
        borderColor: 'border-green-300'
    },
    {
        id: 4,
        name: 'Strawberry',
        emoji: '🍓',
        pun: 'Sweet as a strawberry',
        explanation: 'Very kind, lovely, and nice to others.',
        translation: '甜美的',
        zhuyin: 'ㄊㄧㄢˊ ㄇㄟˇ ㄉㄜ˙',
        color: 'bg-red-100',
        borderColor: 'border-red-300'
    },
    {
        id: 5,
        name: 'Pineapple',
        emoji: '🍍',
        pun: 'Pining for an apple',
        explanation: '"Pining" means wishing for something very strongly.',
        translation: '渴望',
        zhuyin: 'ㄎㄜˇ ㄨㄤˋ',
        color: 'bg-yellow-100',
        borderColor: 'border-yellow-400'
    },
    {
        id: 6,
        name: 'Banana',
        emoji: '🍌',
        pun: 'Go bananas',
        explanation: 'To go crazy, act wild, or get very excited!',
        translation: '發瘋 / 狂熱',
        zhuyin: 'ㄈㄚ ㄈㄥ / ㄎㄨㄤˊ ㄖㄜˋ',
        color: 'bg-yellow-200',
        borderColor: 'border-yellow-500'
    },
    {
        id: 7,
        name: 'Taffy',
        emoji: '🍬',
        pun: 'Laughy',
        explanation: 'Rhymes with taffy! Means full of laughter and silly.',
        translation: '充滿歡笑',
        zhuyin: 'ㄔㄨㄥ ㄇㄢˇ ㄏㄨㄢ ㄒㄧㄠˋ',
        color: 'bg-purple-100',
        borderColor: 'border-purple-300'
    },
    {
        id: 8,
        name: 'Corn',
        emoji: '🌽',
        pun: 'Cornball',
        explanation: 'A person who is silly and makes unoriginal but funny jokes.',
        translation: '俗氣但有趣的人',
        zhuyin: 'ㄙㄨˊ ㄑㄧˋ ㄉㄢˋ ㄧㄡˇ ㄑㄩˋ ㄉㄜ˙ ㄖㄣˊ',
        color: 'bg-yellow-100',
        borderColor: 'border-yellow-400'
    }
];

// --- Utility to Shuffle Arrays ---
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// --- Utility for Speech Synthesis ---
const speakText = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
    }
};

// --- Flashcard Component ---
const Flashcard = ({ item }) => {
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
};

// --- Match the Pun Game Component ---
const MatchGame = () => {
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
                    <h3 className="text-3xl font-bold text-green-700 mb-2">Awesome job, Grace!</h3>
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
                    {/* Foods Column */}
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
                    {/* Puns Column */}
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
};

// --- Main Component for Grace's Learning Portal ---
export default function FortuneTellerPuns({ onBack }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="max-w-6xl mx-auto py-8 px-6 space-y-12 relative">
            {/* Global Styles for Flip Cards & Shake */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  25% { transform: translateX(-5px) rotate(-1deg); }
                  50% { transform: translateX(5px) rotate(1deg); }
                  75% { transform: translateX(-5px) rotate(-1deg); }
                }
                .animate-shake {
                  animation: shake 0.4s ease-in-out;
                }
            `}} />

            {/* EXPANDABLE RIGHT-SIDE TAB & DRAWER */}
            <div className="fixed right-0 top-20 bottom-0 z-50 flex pointer-events-none">
                {/* The Tab Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="self-center pointer-events-auto bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-2.5 rounded-l-2xl shadow-2xl flex flex-col items-center gap-2 transition-all transform hover:scale-105 cursor-pointer border-y-2 border-l-2 border-pink-400"
                    title="Wordplay Guide (雙關語指南)"
                >
                    <BookOpen size={24} />
                    <span className="text-xs tracking-wider uppercase [writing-mode:vertical-lr] font-extrabold">
                        Wordplay Guide
                    </span>
                </button>

                {/* The Expandable Panel */}
                <div className={`pointer-events-auto bg-white border-l-4 border-pink-400 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full max-h-full ${isSidebarOpen ? 'w-96 sm:w-[420px]' : 'w-0'}`}>
                    <div className="flex-shrink-0 p-5 bg-pink-600 text-white flex justify-between items-center min-w-[384px] shadow-sm">
                        <h3 className="font-extrabold text-lg flex items-center gap-2">
                            💡 Wordplay Guide <span className="text-xs bg-pink-500 px-2 py-0.5 rounded-full">雙關語小百科</span>
                        </h3>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="text-white hover:bg-pink-700 p-1.5 rounded-full transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 text-sm min-w-[384px] text-slate-700 pb-32 overscroll-contain">
                        {/* Peach */}
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-orange-900 text-base mb-1">🍑 Peach (水蜜桃)</h4>
                            <p className="mb-2"><strong>Peach fuzz</strong> refers to the soft hair on a peach. This plays on the cozy expression <strong>"warm and fuzzy"</strong> (溫暖又舒服).</p>
                            <p className="text-xs text-slate-500 font-mono">中文：水蜜桃絨毛讓人聯想到「溫暖舒服」的感覺。</p>
                        </div>

                        {/* Pineapple */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-yellow-900 text-base mb-1">🍍 Pineapple (鳳梨)</h4>
                            <p className="mb-2">The verb <strong>"to pine"</strong> means wanting or missing something very much (渴望).</p>
                            <p className="text-xs text-slate-500 font-mono">中文：「Pine」當動詞是渴望的意思，結合 apple 就成了 pineapple！</p>
                        </div>

                        {/* Strawberry */}
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-red-900 text-base mb-1">🍓 Strawberry (草莓)</h4>
                            <p className="mb-2"><strong>"Sweet"</strong> can describe taste and personality! You can also say someone is <strong>"sweet as pie"</strong> or <strong>"sweet as sugar"</strong>.</p>
                            <p className="text-xs text-slate-500 font-mono">中文：「Sweet」既能形容甜美的味道，也能形容善良溫柔的人格。</p>
                        </div>

                        {/* Corn */}
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-amber-900 text-base mb-1">🌽 Corn (玉米)</h4>
                            <p className="mb-2">A <strong>"corny joke"</strong> is a silly, old-fashioned joke. A <strong>"cornball"</strong> is a person who tells those goofy jokes and loves being cheesy!</p>
                            <p className="text-xs text-slate-500 font-mono">中文：「Corny」指老套有趣的笑話，而「Cornball」就是喜歡講老套笑話的幽默傻瓜。</p>
                        </div>

                        {/* Banana */}
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-yellow-900 text-base mb-1">🍌 Banana (香蕉)</h4>
                            <p className="mb-2">The phrase <strong>"go bananas"</strong> means to go crazy, act wild, or get super excited (發瘋 / 狂熱).</p>
                            <p className="text-xs text-slate-500 font-mono">中文：「Go bananas」用來形容情緒非常亢奮或瘋狂。</p>
                        </div>

                        {/* Ice Cream */}
                        <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-pink-900 text-base mb-1">🍦 Ice Cream (冰淇淋)</h4>
                            <p className="mb-2">Listen to the rhyme: <br /><em>"I scream. You scream. We all scream for ice cream!"</em> <br /><strong>"I scream"</strong> sounds just like <strong>"ice cream"</strong>!</p>
                            <p className="text-xs text-slate-500 font-mono">中文：「I scream」（我尖叫）聽起來和「Ice cream」（冰淇淋）一模一樣！</p>
                        </div>

                        {/* Pea */}
                        <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-emerald-900 text-base mb-1">🫛 Pea (豌豆)</h4>
                            <p className="mb-2">A fun soundalike pun! <strong>"Pea"</strong> sounds just like <strong>"peace"</strong>. Saying someone is <strong>"peaceful"</strong> means they are calm and gentle.</p>
                            <p className="text-xs text-slate-500 font-mono">中文：「Pea」（豌豆）發音和「Peace」（和平）一樣，代表寧靜與平和。</p>
                        </div>

                        {/* Taffy */}
                        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-xl shadow-xs">
                            <h4 className="font-bold text-purple-900 text-base mb-1">🍬 Taffy (太妃糖)</h4>
                            <p className="mb-2">A delightful rhyming pun! <strong>"Taffy"</strong> rhymes with <strong>"laughy"</strong> (like Laffy Taffy candy), meaning full of giggles, silliness, and laughter!</p>
                            <p className="text-xs text-slate-500 font-mono">中文：「Taffy」（太妃糖）和「Laughy」（歡笑）押韻，象徵充滿笑聲與歡樂！</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Button */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-bold transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm border border-pink-100 w-fit hover:shadow-md cursor-pointer"
                >
                    <span className="text-xl">←</span> Back to Dashboard (返回主選單)
                </button>
            )}

            {/* Embedded Puns Header */}
            <header className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles size={120} />
                </div>
                <div className="relative z-10 max-w-3xl">
                    <div className="inline-block bg-pink-100 text-pink-800 font-bold px-4 py-1 rounded-full text-sm mb-4">
                        Interactive Game 🔮
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 tracking-tight">
                        Food Pun Fortune Teller
                    </h1>
                    <div className="text-pink-600 font-bold text-lg mb-3">
                        食物雙關語東南西北
                        <span className="text-xs text-slate-400 font-mono tracking-widest ml-2">
                            ㄕˊ ㄨˋ ㄕㄨㄤ ㄍㄨㄢ ㄩˇ ㄉㄨㄥ ㄋㄢˊ ㄒㄧ ㄅㄟˇ
                        </span>
                    </div>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Hi Grace. Let's learn some fun wordplay! Click on the flashcards to reveal the hidden puns, what they mean in English, and their Chinese translations.
                    </p>
                    <p className="text-sm text-pink-600 font-bold mt-2 font-mono">
                        嗨，葛瑞絲。讓我們一起學習有趣的雙關語！點擊閃卡來揭開隱藏的雙關語、英文含意與中文翻譯。
                    </p>
                </div>
            </header>

            {/* Step 1: Study the Puns */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-inner text-white font-bold text-xl">1</div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Study the Puns (學習雙關語)</h2>
                        <p className="text-slate-500 text-sm mt-0.5">Click any card to flip it and see its pun meaning and Zhuyin!</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {punData.map(item => (
                        <Flashcard key={item.id} item={item} />
                    ))}
                </div>
            </section>

            {/* Step 2: Play the Matching Game */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center shadow-inner text-white font-bold text-xl">2</div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Play the Game (雙關語配對遊戲)</h2>
                        <p className="text-slate-500 text-sm mt-0.5">Match each food item with its funny pun!</p>
                    </div>
                </div>
                <MatchGame />
            </section>
        </div>
    );
}