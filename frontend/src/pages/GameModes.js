import React, {useState} from 'react';
import axios from 'axios';
import TextInputBox from '../components/TextInputBox';
import {ButtonPrimary} from '../components/Buttons';
import {TextNotify} from '../components/Alerts';
import {Toaster} from 'react-hot-toast';

function GameModes(){
    return (
        <>
           <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
                <div class="container">
                    <div class="flex flex-row justify-center item-center">
                        <div class="w-full md:w-1/2 xl:w-1/3 px-4">
                            <div class="bg-white rounded-lg overflow-hidden mb-10">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxd4j9qyrXukMVtD7cC--F9xkJfIDUbGj-g&usqp=CAU"
                                alt="image"
                                class="w-full"
                                />
                            <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                <h3>
                                    <a
                                        href="javascript:void(0)"
                                        class="
                                        font-semibold
                                        text-dark text-xl
                                        sm:text-[22px]
                                        md:text-xl
                                        lg:text-[22px]
                                        xl:text-xl
                                        2xl:text-[22px]
                                        mb-4
                                        block
                                        hover:text-primary
                                        "
                                        >
                                    SentenceGen
                                    </a>
                                </h3>
                                <p class="text-base text-body-color leading-relaxed mb-7">
                                    SentenceGen is a game in which you must write a sentence that means the same thing as one given to you. You get points for complexity, so try to be sophisticated, but make sure not to lose the meaning.
                                </p>
                                <a
                                    href="javascript:void(0)"
                                    class="
                                    inline-block
                                    py-2
                                    px-7
                                    border border-[#E5E7EB]
                                    rounded-full
                                    text-base text-body-color
                                    font-medium
                                    hover:border-primary hover:bg-primary hover:text-white
                                    transition
                                    "
                                    >
                                Play Now!
                                </a>
                            </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 xl:w-1/3 px-4">
                            <div class="bg-white rounded-lg overflow-hidden mb-10">
                            <img
                                src="data:image/jpeg;base64,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"
                                alt="image"
                                class="w-full"
                                />
                            <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                <h3>
                                    <a
                                        href="javascript:void(0)"
                                        class="
                                        font-semibold
                                        text-dark text-xl
                                        sm:text-[22px]
                                        md:text-xl
                                        lg:text-[22px]
                                        xl:text-xl
                                        2xl:text-[22px]
                                        mb-4
                                        block
                                        hover:text-primary
                                        "
                                        >
                                    Synonymizer
                                    </a>
                                </h3>
                                <p class="text-base text-body-color leading-relaxed mb-7">
                                    Synonymizer is a game in which you must write a given word's synonym as fast as possible. You get points for both accuracy and for time, so be sure to be swift! See if you can make it onto the leaderboard!
                                </p>
                                <a
                                    href="javascript:void(0)"
                                    class="
                                    inline-block
                                    py-2
                                    px-7
                                    border border-[#E5E7EB]
                                    rounded-full
                                    text-base text-body-color
                                    font-medium
                                    hover:border-primary hover:bg-primary hover:text-white
                                    transition
                                    "
                                    >
                                Play Now!
                                </a>
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