import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonPrimary } from '../components/Buttons';

function HomeLink(props) {
    const history = useHistory();
    return (
        <ButtonPrimary onClick={() => history.push(props.to)}>{props.children}</ButtonPrimary>
    );
}

function Home() {
    return (
        <section class="flex flex-col space-y-1 pt-10 lg:pt-[30px] pb-10 lg:pb-20 items-center justify-center w-full">
            <div className="flex flex-col space-y-6 justify-center items-center drop-shadow-lg bg-white rounded-md p-6 border-2 border-primary">
                <h1 className="text-2xl font-bold text-black">WordPath is a collection of AI-based word games to improve your vocabulary, grammar, and memory.</h1>
            </div>
            <div class="flex flex-col space-y-10 pt-10 lg:pt-[30px] w-1/3 bg-white shadow-lg rounded-lg overflow-hidden mb-10">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxd4j9qyrXukMVtD7cC--F9xkJfIDUbGj-g&usqp=CAU"
                    alt="image"
                    class="w-full"
                />
                <div class="p-8 text-center">
                    <h3 className="text-2xl font-semibold text-black mb-6 w-full">
                        SentenceGen
                    </h3>
                    <p class="text-base text-body-color leading-relaxed mb-7 w-full">
                        SentenceGen is a game in which you must write a sentence that means the same thing as one given to you. You get points for complexity, so try to be sophisticated, but make sure not to lose the meaning.
                    </p>

                    <HomeLink to="/sentencegen">Play Now!</HomeLink>
                </div>
            </div>
        </section>
    )
} 

export default Home;