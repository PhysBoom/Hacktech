import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonPrimary } from '../components/Buttons';

function GameModeLink(props) {
    const history = useHistory();
    return (
        <ButtonPrimary onClick={() => history.push(props.to)}>{props.children}</ButtonPrimary>
    );
}

function GameModes() {
    return (
        <>
            <section class="flex flex-col space-y-5 pt-10 lg:pt-[60px] pb-10 lg:pb-20 items-center justify-center h-full w-full">
                <h1 class="text-center text-2xl font-bold">Gamemodes</h1>
                <div class="h-full w-full">
                    <div class="flex flex-row justify-center items-center">
                        <div class="w-full h-full md:w-1/2 xl:w-1/3 px-4">
                            <div class="bg-white shadow-lg h-full rounded-lg overflow-hidden mb-10">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxd4j9qyrXukMVtD7cC--F9xkJfIDUbGj-g&usqp=CAU"
                                    alt="image"
                                    class="w-full"
                                />
                                <div class="p-8 text-center">
                                    <h3 className="text-2xl font-semibold text-black mb-6">
                                        SentenceGen
                                    </h3>
                                    <p class="text-base text-body-color leading-relaxed mb-7">
                                        SentenceGen is a game in which you must write a sentence that means the same thing as one given to you. You get points for complexity, so try to be sophisticated, but make sure not to lose the meaning.
                                    </p>

                                    <GameModeLink to="/sentencegen">Play Now!</GameModeLink>
                                </div>
                            </div>
                        </div>
                        <div class="w-full h-full md:w-1/2 xl:w-1/3 px-4">
                            <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-10">
                                <img
                                    src={require("../images/synonymizer.png")}
                                    alt="image"
                                    class="w-full"
                                />
                                <div class="p-8 text-center">
                                    <h3 className="text-2xl text-black  font-semibold mb-6">
                                        Synonymizer
                                    </h3>
                                    <p class="text-base text-body-color leading-relaxed mb-7">
                                        Synonymizer is a game in which you must write a given word's synonym as fast as possible. You get points for both accuracy and for time, so be sure to be swift! See if you can make it onto the leaderboard!
                                    </p>
                                    <GameModeLink to="/sentencegen">Play Now!</GameModeLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GameModes;