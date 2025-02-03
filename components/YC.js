import React, { useState, useEffect, useRef } from 'react';
import { Button, Container } from '.';
import { Reveal } from 'react-awesome-reveal';
import { fadeInLeft, fadeInUp } from '@/keyframes';

const words = ['Podcasts', 'Videos'];
const LongText = `
The discussion emphasizes recognizing true love versus infatuation, 
the importance of self-awareness in relationships, and the need for open communication.
 Healing from past traumas is crucial for personal growth and healthier connections. 
 It highlights that breakups can be blessings, allowing individuals to reevaluate their
  needs and pursue genuine love.You may be interested in these questions:How can one differentiate 
  between love and infatuation? What are effective ways to heal after a breakup? How important is communication
   in a relationship? Highlights 00:18 Understanding the true nature of love is essential for building healthy relationships.
    It's crucial to evaluate your feelings deeply and ensure they are genuine rather than based on infatuation. 01:01 True love
     requires mutual feelings and cannot be one-sided. This understanding helps individuals recognize when they are genuinely in 
     love versus simply infatuated. 02:45 Love encompasses kindness, patience, and selflessness, which are vital for nurturing 
     relationships. It's important to define love personally and understand its complexities. 06:53 Chemistry and connection 
     are different aspects of relationships; chemistry can be misleading. Understanding the difference helps avoid confusion in 
     identifying suitable partners. 08:04 Compatibility in relationships goes beyond initial chemistry and connection. 
     It involves adaptability and a deeper understanding of each other to build a lasting bond.09:23 Self-honesty is essential
      in relationships to avoid wasting time with incompatible partners. Being aware of your true feelings can guide better 
      decision-making about staying or leaving. 11:54 Understanding the difference between chemistry and connection is crucial
       for relationship success. Recognizing when one's feelings are surface-level can prevent wasted time in unfulfilling
        partnerships. 14:38 Asking important questions early in a relationship can reveal compatibility. Failing to communicate 
        openly may lead to discovering uncomfortable truths later on. 16:09 Communication issues in relationships often stem from 
        individuals suppressing their true selves to meet unrealistic expectations. This leads to conflict when their authentic
         selves eventually emerge, causing misunderstandings. 17:01 Many individuals feel pressured to portray a certain image 
         at the start of relationships, leading to unrealistic expectations. This can create a disconnect when their true selves 
         are revealed later. 18:34 It's crucial for individuals to understand themselves before entering a relationship. 
         This self-awareness helps in presenting an authentic self, preventing future conflicts. 19:40 Society often discourages
          self-exploration, focusing instead on external achievements. This lack of encouragement can hinder personal growth 
          and understanding of one's true desires. 24:12 Many individuals receive misguided advice about relationships,
           particularly from those who have not healed from their own experiences. This can lead to difficulties in forming 
           genuine connections with loved ones.24:35 Misunderstanding how to truly connect with a loved one can result in
            emotional mishandling. People often confuse general dating advice with the unique dynamics of real love.
            26:50 A lack of education on relationship skills is prevalent, with many focusing on career training instead.
             Understanding how to communicate and connect is crucial for both personal and professional success.
             30:02 Balancing masculine and feminine energies is essential for maintaining attraction in relationships. 
             Individuals must learn to express emotions while still embodying their dominant energy to foster genuine connections.
             32:20 Understanding the balance between masculine and feminine energies in relationships is crucial for personal growth*
              and connection. Communication and transparency can foster a healthier dynamic between partners.33:30 Recognizing that
               fear can undermine masculine energy is vital. Men often become overly accommodating due to the fear of losing their 
               partners, which can detract from their attractiveness.34:10 Effective communication about needs and boundaries is 
               essential. Partners must be open to discussing their feelings to maintain a healthy relationship and avoid 
               misunderstandings.36:22 Navigating conflicts requires patience and understanding. Recognizing that disagreements 
               are a normal part of relationships helps partners to develop necessary skills for resolution and growth.
                40:25 Healing from past relationships is essential for personal growth and fostering healthy connections. 
                Vulnerability and openness are key to attracting partners who truly respect and appreciate you. 
                41:13 People often close themselves off after being hurt, making it difficult to find genuine connections. 
                This cycle of emotional defense can lead to repeating the same mistakes in relationships. 43:19 It's vital to
                 differentiate between your actions and the partner's shortcomings. Being loving and kind should not be compromised 
                 due to previous negative experiences with unworthy partners. 46:41 Choosing partners who are emotionally available 
                 and supportive is crucial for healthy relationships. Many people mistakenly believe they can fix or improve their
                  partners, leading to dissatisfaction. 48:29  Knowing when to leave a relationship can be challenging, as many fear loneliness or the reality of wasted time. It's essential to recognize when one partner is unwilling to put in the necessary effort for growth.48:47 The fear of being alone often leads individuals to stay in unfulfilling relationships, prolonging their unhappiness. This fear can prevent them from making necessary changes for personal growth. 52:01 Effective communication is crucial in relationships. Writing letters can help convey deep feelings without the misunderstandings that often arise in verbal discussions. 55:53 Personal growth is vital before considering reconciliation. Both partners should focus on self-improvement rather than trying to change for each other, ensuring a healthier future relationship. 56:39 Breakups can be challenging, but understanding the underlying reasons for the relationship can lead to personal growth and healing. Recognizing why you were in the relationship can help in moving forward effectively.0:58:35 It's important to differentiate between missing a person and missing the feelings associated with them. This awareness can prevent confusing emotions that hinder the healing journey. 1:00:13 Focusing on healing is crucial after a breakup, as it helps address past traumas that may affect future relationships. This process can clarify whether the past relationship was truly right for you. 1:01:32 Having an accountability partner, like a friend or therapist, can support you through the healing process. They help keep you on track and encourage you to avoid repeating past mistakes. 1:04:41 Love fully and be yourself to reveal who truly belongs in your life. Emphasizing authenticity fosters deeper connections and allows for healthier relationships to flourish.1:04:48 Receiving poor relationship advice can hinder personal growth. One example is the notion of getting under someone to get over someone, which ultimately leads to more problems. 1:05:02 Defining one's purpose in life can significantly impact relationships. Pursuing a mission to heal hearts fosters happier and healthier connections with others. 1:05:13 Understanding the importance of love over financial status can transform relationships. Emphasizing emotional support and shared goals enhances relationship fulfillment beyond material concerns.
`;

const ChatInterface = ({ onBack, referenceText }) => {
    const [chatMessages, setChatMessages] = useState([
        { role: 'system', message: 'Hi this is Sophia ,What can I help with?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef(null);

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            const newMessages = [...chatMessages, { role: 'user', message: inputValue }];
            setChatMessages(newMessages);
            setInputValue('');
            setIsLoading(true);

            try {
                const response = await fetch('https://aftervisit-0b4087b58b8e.herokuapp.com/api/ask-question', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: LongText,
                        question: inputValue,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch AI response');
                }

                const data = await response.json();
                const aiResponse = data.answer || 'I am sorry, I could not process your question.';
                setChatMessages([...newMessages, { role: 'ai', message: aiResponse }]);
            } catch (error) {
                console.error('Error fetching AI response:', error);
                setChatMessages([
                    ...newMessages,
                    { role: 'ai', message: 'There was an error processing your question. Please try again.' },
                ]);
            } finally {
                setIsLoading(false);
            }
        }
    };
    // Scroll to the latest message
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading && inputValue.trim()) {
            handleSendMessage();
        }
    };

    return (
        <div
            className="lg:w-1/3 p-5 text-white bg-gray-800 overflow-y-auto rounded-lg"
            style={{ maxHeight: '60vh' }}
        >
            <h2 className="text-2xl font-bold mb-5">Chat with Sophia</h2>
            <div className="overflow-y-auto mb-5" style={{ height: '40vh' }}>
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                        <p ref={chatContainerRef}
                            className={`inline-block p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#8E72D7]' : 'bg-gray-700'
                                } text-white`}
                        >
                            {msg.message}
                        </p>
                    </div>
                ))}
                {isLoading && (
                    <div className="text-center text-sm text-gray-400">Sophia is typing...</div>
                )}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                    placeholder="Type your question..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    onKeyPress={handleKeyPress}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className={`ml-2 px-4 py-2 rounded-full text-white ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#8E72D7]'
                        }`}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
            <button
                onClick={onBack}
                className="mt-5 text-sm text-[#8E72D7] underline"
            >
                Back to Extracted Data
            </button>
        </div>
    );
};



const YC = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [extractedData, setExtractedData] = useState(null); // For extracted response
    const [additionalInput, setAdditionalInput] = useState('');

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const [listBtn, setListBtn] = useState([
        { name: 'All', status: true },
        { name: 'Leadership', status: false },
        { name: 'Learning', status: false },
        { name: 'Personal Growth', status: false },
        { name: 'Wellness', status: false },
        { name: 'Relationships', status: false },
    ]);

    const [step, setStep] = useState(0);
    const questions = [
        'Reflect on a relationship in your life that brings you joy. What makes it meaningful?',
        'What are the qualities you value most in a relationship?',
        'How do you express gratitude to people you care about?',
    ];
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep((prev) => prev - 1);
        }
    };

    const handleAnswerChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[step] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleFilter = (theme) => {
        const updatedButtons = listBtn.map((btn) => ({
            ...btn,
            status: btn.name === theme,
        }));
        setListBtn(updatedButtons);
    };

    // Typing effect for "Podcasts" and "Videos"
    const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '');

    useEffect(() => {
        const word = words[currentWordIndex];
        const speed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (text.length < word.length) {
                    setText(word.slice(0, text.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                if (text.length > 0) {
                    setText(word.slice(0, text.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, currentWordIndex]);





    const handleExtract = async () => {
        const selectedOptions = [
            checkedItems.option1 && 'Content Enhancement & Structuring',
            checkedItems.option2 && 'Audience Engagement & Personalization',
            checkedItems.option3 && 'AI-Generated Additions',
            checkedItems.option4 && 'Interaction & Engagement',
        ].filter(Boolean); // Filter out unchecked options

        const additionalInput = document.getElementById('additionalInput')?.value || '';
        // Show an alert if no options are selected
        if (selectedOptions.length === 0) {
            alert("Please select at least one option before extracting.");
            return; // Stop execution
        }

        const longText = `
            The discussion emphasizes recognizing true love versus infatuation, 
            the importance of self-awareness in relationships, and the need for open communication.
             Healing from past traumas is crucial for personal growth and healthier connections. 
             It highlights that breakups can be blessings, allowing individuals to reevaluate their
              needs and pursue genuine love.You may be interested in these questions:How can one differentiate 
              between love and infatuation? What are effective ways to heal after a breakup? How important is communication
               in a relationship? Highlights 00:18 Understanding the true nature of love is essential for building healthy relationships.
                It's crucial to evaluate your feelings deeply and ensure they are genuine rather than based on infatuation. 01:01 True love
                 requires mutual feelings and cannot be one-sided. This understanding helps individuals recognize when they are genuinely in 
                 love versus simply infatuated. 02:45 Love encompasses kindness, patience, and selflessness, which are vital for nurturing 
                 relationships. It's important to define love personally and understand its complexities. 06:53 Chemistry and connection 
                 are different aspects of relationships; chemistry can be misleading. Understanding the difference helps avoid confusion in 
                 identifying suitable partners. 08:04 Compatibility in relationships goes beyond initial chemistry and connection. 
                 It involves adaptability and a deeper understanding of each other to build a lasting bond.09:23 Self-honesty is essential
                  in relationships to avoid wasting time with incompatible partners. Being aware of your true feelings can guide better 
                  decision-making about staying or leaving. 11:54 Understanding the difference between chemistry and connection is crucial
                   for relationship success. Recognizing when one's feelings are surface-level can prevent wasted time in unfulfilling
                    partnerships. 14:38 Asking important questions early in a relationship can reveal compatibility. Failing to communicate 
                    openly may lead to discovering uncomfortable truths later on. 16:09 Communication issues in relationships often stem from 
                    individuals suppressing their true selves to meet unrealistic expectations. This leads to conflict when their authentic
                     selves eventually emerge, causing misunderstandings. 17:01 Many individuals feel pressured to portray a certain image 
                     at the start of relationships, leading to unrealistic expectations. This can create a disconnect when their true selves 
                     are revealed later. 18:34 It's crucial for individuals to understand themselves before entering a relationship. 
                     This self-awareness helps in presenting an authentic self, preventing future conflicts. 19:40 Society often discourages
                      self-exploration, focusing instead on external achievements. This lack of encouragement can hinder personal growth 
                      and understanding of one's true desires. 24:12 Many individuals receive misguided advice about relationships,
                       particularly from those who have not healed from their own experiences. This can lead to difficulties in forming 
                       genuine connections with loved ones.24:35 Misunderstanding how to truly connect with a loved one can result in
                        emotional mishandling. People often confuse general dating advice with the unique dynamics of real love.
                        26:50 A lack of education on relationship skills is prevalent, with many focusing on career training instead.
                         Understanding how to communicate and connect is crucial for both personal and professional success.
                         30:02 Balancing masculine and feminine energies is essential for maintaining attraction in relationships. 
                         Individuals must learn to express emotions while still embodying their dominant energy to foster genuine connections.
                         32:20 Understanding the balance between masculine and feminine energies in relationships is crucial for personal growth*
                          and connection. Communication and transparency can foster a healthier dynamic between partners.33:30 Recognizing that
                           fear can undermine masculine energy is vital. Men often become overly accommodating due to the fear of losing their 
                           partners, which can detract from their attractiveness.34:10 Effective communication about needs and boundaries is 
                           essential. Partners must be open to discussing their feelings to maintain a healthy relationship and avoid 
                           misunderstandings.36:22 Navigating conflicts requires patience and understanding. Recognizing that disagreements 
                           are a normal part of relationships helps partners to develop necessary skills for resolution and growth.
                            40:25 Healing from past relationships is essential for personal growth and fostering healthy connections. 
                            Vulnerability and openness are key to attracting partners who truly respect and appreciate you. 
                            41:13 People often close themselves off after being hurt, making it difficult to find genuine connections. 
                            This cycle of emotional defense can lead to repeating the same mistakes in relationships. 43:19 It's vital to
                             differentiate between your actions and the partner's shortcomings. Being loving and kind should not be compromised 
                             due to previous negative experiences with unworthy partners. 46:41 Choosing partners who are emotionally available 
                             and supportive is crucial for healthy relationships. Many people mistakenly believe they can fix or improve their
                              partners, leading to dissatisfaction. 48:29  Knowing when to leave a relationship can be challenging, as many fear loneliness or the reality of wasted time. It's essential to recognize when one partner is unwilling to put in the necessary effort for growth.48:47 The fear of being alone often leads individuals to stay in unfulfilling relationships, prolonging their unhappiness. This fear can prevent them from making necessary changes for personal growth. 52:01 Effective communication is crucial in relationships. Writing letters can help convey deep feelings without the misunderstandings that often arise in verbal discussions. 55:53 Personal growth is vital before considering reconciliation. Both partners should focus on self-improvement rather than trying to change for each other, ensuring a healthier future relationship. 56:39 Breakups can be challenging, but understanding the underlying reasons for the relationship can lead to personal growth and healing. Recognizing why you were in the relationship can help in moving forward effectively.0:58:35 It's important to differentiate between missing a person and missing the feelings associated with them. This awareness can prevent confusing emotions that hinder the healing journey. 1:00:13 Focusing on healing is crucial after a breakup, as it helps address past traumas that may affect future relationships. This process can clarify whether the past relationship was truly right for you. 1:01:32 Having an accountability partner, like a friend or therapist, can support you through the healing process. They help keep you on track and encourage you to avoid repeating past mistakes. 1:04:41 Love fully and be yourself to reveal who truly belongs in your life. Emphasizing authenticity fosters deeper connections and allows for healthier relationships to flourish.1:04:48 Receiving poor relationship advice can hinder personal growth. One example is the notion of getting under someone to get over someone, which ultimately leads to more problems. 1:05:02 Defining one's purpose in life can significantly impact relationships. Pursuing a mission to heal hearts fosters happier and healthier connections with others. 1:05:13 Understanding the importance of love over financial status can transform relationships. Emphasizing emotional support and shared goals enhances relationship fulfillment beyond material concerns.
        `;

        setIsLoading(true); // Set loading state to true

        try {
            const response = await fetch('https://aftervisit-0b4087b58b8e.herokuapp.com/api/extract-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: longText, // Pass the long text here
                    selectedOptions, // Pass selected options
                    additionalInput, // Include any additional input from the user
                }),
            });

            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`Failed with status ${response.status}`);
            }

            const result = await response.json();
            setExtractedData(result); // Update the state with the extracted data
        } catch (error) {
            console.error('Error extracting data:', error);
            alert('An error occurred while extracting the data. Please try again.');
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };




    return (
        <Container className="flex flex-col sm:flex-col mt-20 mb-32">
            {/* Header Section */}
            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                <h1 className="text-5xl lg:text-6xl font-bold text-center mb-10">Hey YC</h1>
            </Reveal>
            <div className="w-full sm:w-[50%] pr-0 sm:pr-10 lg:pr-20 mt-[-20px] sm:mt-5 lg:mt-10">
                <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                    <h1 className="text-3xl lg:text-4xl font-bold ">Turning</h1>
                </Reveal>
                <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                    <h1 className="text-3xl lg:text-4xl font-bold ">
                        <span
                            className="text-[#937BD0] inline-block"
                            style={{
                                display: 'inline-block',
                                minWidth: `${longestWord.length}ch`,
                            }}
                        >
                            {text}
                        </span>
                    </h1>
                </Reveal>
                <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-10">Into AI Coaching</h1>
                </Reveal>
            </div>

            <div className="w-full sm:w-[50%] pr-0 sm:pr-10 lg:pr-20 mt-[-20px] sm:mt-5 lg:mt-10">
                <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-10">Title</h1>
                </Reveal>
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mb-5">
                {listBtn.map((item, index) => (
                    <Reveal keyframes={fadeInUp} duration={500} delay={index * 100} key={index}>
                        <Button
                            onClick={() => handleFilter(item.name)}
                            variant={item.status ? 'primary' : 'secondary'}
                            className="w-full px-4 py-2 text-sm rounded-2xl"
                        >
                            {item.name}
                        </Button>
                    </Reveal>
                ))}
            </div>

            {/* Video Cards with Chat */}
            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[0, 1].map((_, index) => (
                        <div key={index} className="flex flex-col lg:flex-row h-auto bg-black rounded-lg overflow-hidden">
                            {/* Chat Section */}
                            <div className="lg:w-2/3 bg-gray-800 p-5 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-white text-2xl font-bold mb-5">{index === 0 ? 'Healing Anxiety Coach' : 'Dopamine Detox'}</h2>
                                    <div className="bg-gray-700 p-5 rounded-lg shadow-md">
                                        <p className="text-white mb-4">{questions[step]}</p>
                                        <textarea
                                            value={answers[step]}
                                            onChange={handleAnswerChange}
                                            placeholder="Type your answer here..."
                                            className="w-full p-3 rounded-lg bg-gray-900 text-white"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handleBack}
                                        disabled={step === 0}
                                        className={`px-4 py-2 rounded-3xl ${step === 0 ? 'bg-gray-600' : 'bg-gray-500'} text-white`}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        disabled={step === questions.length - 1}
                                        className={`px-4 py-2 rounded-3xl ${step === questions.length - 1 ? 'bg-gray-600' : 'bg-[#8E72D7]'} text-white`}
                                    >
                                        {step === questions.length - 1 ? 'Finish' : 'Next'}
                                    </button>
                                </div>
                            </div>

                            {/* Video Section */}
                            <div className="lg:w-2/3 bg-black flex justify-center items-center">
                                <iframe
                                    className="w-full h-60 md:h-full object-cover"
                                    src="https://www.youtube.com/embed/mPQBcb9wf8Q?si=HYGDjV0y2c6fdqmk"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>
            <div className="w-full sm:w-[50%] pr-0 sm:pr-10 lg:pr-20 mt-[-20px] sm:mt-5 lg:mt-10">
                <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                    <h1 className="text-3xl lg:text-4xl font-bold mt-5 mb-5">Easy Coach Editor</h1>
                </Reveal>
            </div>
            {/* Video Card with Extract Feature */}
            <Reveal keyframes={fadeInLeft} duration={800} delay={200}>
                <div className="flex flex-col lg:flex-row h-auto mt-10 bg-gray-800 rounded-lg overflow-hidden">
                    {isChatActive ? (
                        <ChatInterface onBack={() => setIsChatActive(false)} />
                    ) : extractedData ? (
                        <div
                            className="lg:w-1/3 p-5 text-white overflow-y-auto"
                            style={{
                                maxHeight: '60vh', // Adjust the height to match the video
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-5">Extracted Insights:</h2>
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold">Key Themes:</h3>
                                <ul className="list-disc pl-5">
                                    {extractedData.key_themes.map((theme, index) => (
                                        <li key={index}>{theme}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-5">
                                <h3 className="text-xl font-semibold">Actionable Points:</h3>
                                {Object.entries(extractedData.actionable_points).map(([key, points]) => (
                                    <div key={key} className="mt-3">
                                        <h4 className="font-semibold">{key}:</h4>
                                        <ul className="list-disc pl-5">
                                            {points.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {additionalInput ? (
                                <div className="mt-5">
                                    {extractedData.additional_requests &&
                                        extractedData.additional_requests.user_input &&
                                        extractedData.additional_requests.user_input.trim() && ( // Check for null, empty string, or whitespace
                                            <div className="mt-5">
                                                <h3 className="text-xl font-semibold">Additional Insights:</h3>
                                                <p className="bg-gray-700 p-4 rounded-lg mt-2">
                                                    {extractedData.additional_requests.user_input}
                                                </p>
                                            </div>
                                        )}
                                </div>
                            ) : null}

                            <button
                                onClick={() => setIsChatActive(true)}
                                className="mt-5 bg-[#8E72D7] text-white px-6 py-2 rounded-full shadow-lg"
                            >
                                Continue chatting with Sophia
                            </button>
                        </div>
                    ) : (
                        <div className="lg:w-1/3 p-5 flex flex-col justify-between">
                            <h2 className="text-white text-2xl font-bold mb-5">
                                Hi, here's what Sophia can do for you:
                            </h2>

                            {/* Options in Cards */}
                            <div className="space-y-3">
                                {[
                                    { id: 'option1', label: 'Content Enhancement & Structuring' },
                                    { id: 'option2', label: 'Audience Engagement & Personalization' },
                                    { id: 'option3', label: 'AI-Generated Additions' },
                                    { id: 'option4', label: 'Interaction & Engagement' },
                                ].map(({ id, label }) => (
                                    <label
                                        key={id}
                                        className="bg-gray-700 p-4 rounded-lg shadow-md flex items-center space-x-3 cursor-pointer"
                                        onClick={() => handleCheckboxChange(id)}
                                    >
                                        <div
                                            className={`h-6 w-6 rounded border border-gray-500 flex justify-center items-center ${checkedItems[id] ? 'bg-blue-500' : 'bg-gray-800'
                                                }`}
                                        >
                                            {checkedItems[id] && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-white"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 5.707 8.879A1 1 0 004.293 9.707l3 3a1 1 0 001.414 0l7-7z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-white">{label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Additional Input Field */}
                            <div className="mt-5">
                                <label className="text-white mb-2 block">Anything else you want to add?</label>
                                <textarea
                                    id="additionalInput"
                                    placeholder="Type your additional request here..."
                                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
                                    value={additionalInput}
                                    onChange={(e) => setAdditionalInput(e.target.value)} // Update state on change
                                ></textarea>
                            </div>

                            {/* Extract Button */}
                            <button
                                onClick={handleExtract}
                                disabled={isLoading}
                                className={`mt-5 ${isLoading ? 'bg-[#8E72D7] cursor-not-allowed' : 'bg-[#8E72D7]'
                                    } text-white px-6 py-2 rounded-full shadow-lg`}
                            >
                                {isLoading ? 'Extracting...' : 'Extract'}
                            </button>
                        </div>
                    )}

                    {/* Video Section */}
                    <div className="lg:w-2/3 bg-black flex justify-center items-center">
                        <iframe
                            className="w-full h-90 md:h-full lg:h-full object-cover"
                            src="https://www.youtube.com/embed/mPQBcb9wf8Q?si=HYGDjV0y2c6fdqmk"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </Reveal>
        </Container >
    );
};

export default YC;
