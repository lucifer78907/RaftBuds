import introImage1 from '../assets/8.svg'
import introImage2 from '../assets/15.svg'
import { LiaHandshake } from "react-icons/lia";
import { FaSlideshare } from "react-icons/fa";
import { FaRegLaughSquint } from "react-icons/fa";


function Intro() {
    return (
        <section className="p-6 flex flex-col items-center justify-start mt-2 lg:mt-10 gap-6 h-full">
            <header className="flex flex-col items-center ">
                <h1 className="text-5xl lg:text-8xl tracking-wide text-orange-500 font-semibold">RaftBuds</h1>
                <p className="text-xl mt-2  lg:mt-6 lg:text-3xl  text-neutral-600">Your own office instagram</p>
            </header>
            <main className='mt-2 lg:mt-12'>
                <ul className='flex-col gap-8 flex lg:flex-row lg:gap-20 justify-evenly text-lg lg:text-3xl font-medium text-neutral-600'>
                    <li className='flex flex-col items-center gap-4'>
                        <div className='p-4 lg:p-10 bg-orange-200 flex items-center justify-center rounded-full'>
                            <LiaHandshake size={'2em'} className='fill-orange-400' />
                        </div>
                        Connect
                    </li>
                    <li className='flex flex-col items-center gap-4'>
                        <div className='p-4 lg:p-10 bg-orange-200 flex items-center justify-center rounded-full'>
                            <FaSlideshare size={'2em'} className='text-orange-400' />
                        </div>
                        Share
                    </li>
                    <li className='flex flex-col items-center gap-4'>
                        <div className='p-4 lg:p-10 bg-orange-200 flex items-center justify-center rounded-full'>
                            <FaRegLaughSquint size={'2em'} className='text-orange-400' />
                        </div>
                        Laugh
                    </li>
                </ul>
            </main>
            <aside className='mt-2 lg:mt-10 flex flex-col items-center gap-4'>
                <p className='text-lg text-center lg:text-xl text-neutral-500 font-medium tracking-wide'>Login to view posts, follow other people and much more!</p>
            </aside>
            <img src={introImage1} className='h-20 bottom-2 md:h-30  lg:h-40 xl:h-60 absolute lg:bottom-10 right-4 rotate-30' />
            <img src={introImage2} className='h-20 bottom-2 md:h-30  lg:h-40 xl:h-60 absolute lg:bottom-10 left-4 rotate-45' />
        </section>
    )
}

export default Intro