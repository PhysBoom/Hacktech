import React, {useState, useEffect, useContext} from 'react';
import TextInputBox from '../components/TextInputBox';
import AuthContext from '../context/auth-context';
import axios from 'axios';
import {FullScreenLoader} from '../components/Loaders';

function SentenceGen() {
    const auth = useContext(AuthContext);
    const [curSentenceGame, setCurSentenceGame] = useState(null);
    const [curSentence, setCurSentence] = useState("");
    const [countdownTimer, setCountdownTimer] = useState(null);
    const [loading, setLoading] = useState(false);

    async function initiateSentenceGame(){
        setLoading(true);
        const resp = await auth.fetchUserData();
        console.log(resp);
        if (!resp.data.success){
            return; // Notify something here...
        }
        const user_data = resp.data.user;
        let game_id_to_load = "";
        if (user_data.sentence_game_games.length > 0){
            game_id_to_load = user_data.sentence_game_games[0];
        } else {
            const resp = await axios({
                method: "POST",
                url: "/sentence-game/new",
                data: {
                    uuid: user_data.object_id
                }
            });
            if (resp.data.success){
                game_id_to_load = resp.data.game_id;
            }
            console.log(resp);
        }

        const game_resp = await axios({
            method: "GET",
            url: `/sentence-game/${game_id_to_load}`,
        });

        console.log(game_resp)

        if (game_resp.data.success){
            setCurSentenceGame(game_resp.data.game);
        } else {
            // Notify something here...
        }
        setLoading(false);
    }

    async function handleTextboxSubmit(e){
        // Check if key pressed was enter
        if (e.keyCode === 13){
            setLoading(true);
            const resp = await axios({
                method: "POST",
                url: `/sentence-game/${curSentenceGame.object_id}/play-round`,
                data: {
                    sentence: curSentence
                }
            });
            setCurSentenceGame(resp.data.game);
            setCurSentence("");
            setLoading(false);
        }
    }

    useEffect(() => {
        initiateSentenceGame();
    }, []);

    // Update the countdown timer every second.
    function updateCountdownTimer() {
        const duration = curSentenceGame.duration;
        const start_time = curSentenceGame.start_time;
        // Get the current UNIX time
        const cur_time = Math.floor(Date.now() / 1000);
        // Calculate the time remaining
        const time_remaining = duration - (cur_time - start_time);
        // If the time remaining is less than 0, end the game
        if (time_remaining <= 0){
            // End game.
        } else {
            // If the time remaining is greater than 0, set the countdown timer to MM:SS
            setCountdownTimer(`${Math.floor(time_remaining / 60)}:${time_remaining % 60}`);
        }
    }

    useEffect(() => {
        if (curSentenceGame){
            updateCountdownTimer();
            const interval = setInterval(() => {
                updateCountdownTimer();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [curSentenceGame]);
            

    return (
        
        <div className="w-screen h-screen">
            {loading && <FullScreenLoader />}
            <div className="flex flex-row w-full h-full p-6">
                <div className="flex flex-col h-full border-2 rounded-md border-black p-4 justify-between w-full max-h-256">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-row w-full justify-between items-center">
                            <div className="border-2 rounded-md rounded-md border-black p-2">
                                <h3 className="text-xl text-black flex flex-row space-x-6"><span>{`Turns Remaining: ${curSentenceGame ? curSentenceGame.rounds - curSentenceGame.round_number : "0"} `}</span><span>{`${countdownTimer? countdownTimer : "00:00"}`}</span></h3>
                            </div>
                            <div className="border-2 rounded-md border-black p-2">
                                <h3 className="text-xl text-black">{`Score: ${curSentenceGame && parseFloat(curSentenceGame.score).toFixed(0)}`}</h3>
                            </div>
                        </div>
                        <h3 className="text-4xl text-black font-semibold w-full">{curSentenceGame && curSentenceGame.sentence}</h3>
                        <div className="border-2 rounded-md border-black p-2 w-full h-full overflow-y-auto">
                            {curSentenceGame && Object.keys(curSentenceGame.past_sentences).length > 0 && Object.entries(curSentenceGame.past_sentences).map(([key, value], i) => {
                                return (
                                    <div className="flex flex-row justify-between" key={i}>
                                        <div className="text-xl text-black">{value.sentence}</div>
                                        <div className="text-xl text-black">{parseFloat(value.score).toFixed(0)}</div>
                                    </div>
                                )
                            })}
                            {!curSentenceGame || Object.keys(curSentenceGame.past_sentences).length === 0 && <div className="text-xl text-black">Go write some sentences!</div>}
                        </div>
                    </div>
                    <TextInputBox type="textarea" placeholder="Enter a sentence..." value={curSentence} rows='1' onChange={e => setCurSentence(e.target.value)} onKeyDown={e => handleTextboxSubmit(e)}/>
                </div>

            </div>
        </div>
    )
}

export default SentenceGen