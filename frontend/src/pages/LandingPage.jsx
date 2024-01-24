import React from "react";
import customFetch from "../Utils/customFetch";
import { Button, Logo, TaskCard } from "../components";
import { Link } from "react-router-dom";
import hero from "../assets/study.svg";
import { LuTarget } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import mobileGif from "../assets/mobile.gif";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Faq } from "../components";

export const userLoader = async () => {
  try {
    const data = await customFetch.get("/users/user");
    return data;
  } catch (error) {
    return error;
  }
};

function LandingPage() {
  return (
    <main>
      {/* Header */}
      <header className='shadow-sm h-fit'>
        <div className='max-w-[1200px] m-auto  '>
          <div className='p-4 h-[100%] flex justify-between items-center '>
            <div className='uppercase font-[900] text-lg'>
              <Logo margin='true' />
            </div>
            <div>
              <nav>
                <Link to='/login' className='mr-4'>
                  <Button
                    text='Sign in'
                    hover='true'
                    color='black'
                    background='white'
                  />
                </Link>
                <Link to='/register'>
                  <Button text='Sign up' />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* Hero section */}
      <section className='py-10 bg-slate-100 h-fit flex items-center'>
        <div className='max-w-[900px] m-auto p-4'>
          <div className='grid max-md:block grid-cols-2 items-center gap-4'>
            <div className=''>
              <h1 className='text-[4em] font-[900]'>Timey</h1>
              <div className='my-8'>
                <Button text='Get Started' />
              </div>
              <p className='border-l-4 border-blue-600 text-zinc-500 space-y-4 text-[1.2em]  pl-2 leading-8'>
                🚀 Supercharge your studies 📚 Unlesh your potential with{" "}
                <span>Timey</span> - the ultimate student companion.
              </p>
            </div>
            <img className='max-md:mt-10' src={hero} alt='hero svg' />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='max-w-[1200px] m-auto py-20 px-4'>
        <div className='grid max-md:grid-cols-1 grid-cols-4 gap-8 justify-center items-center'>
          <TaskCard title='Goals' icon={<LuTarget />} />
          <TaskCard title='Notes' icon={<GiNotebook />} />
          <TaskCard />
          <TaskCard title='Assignment' icon={<MdOutlineAssignmentTurnedIn />} />
        </div>
      </section>
      {/* Demo Show */}

      <section className=''>
        <div className='max-w-[900px] max-md:text-center m-auto my-8 px-5 py-9'>
          <div>
            <h2 className='text-center text-[3em] font-[900] text-gray-950'>
              FAQ's
            </h2>
          </div>
          <div className=' grid grid-cols-2 items-center gap-8 max-md:grid-cols-1 justify-center'>
            <Faq
              question='What does Timey offer?'
              answer='Timey provides a range of features to enhance student productivity, including task management, goal setting, and assignment managemnet'
            />
            <Faq
              question='How can i add tasks to the app?'
              answer='Simply navigate to the todo page to add tasks by clicking on the Add Task button'
            />
            <Faq
              question='Is there feature for tracking study seassions'
              answer='Absoluetly! Use the timer on the dashboard to monitor the study seassions'
            />
            <Faq
              question='Does the app support goal setting?'
              answer='Yes, set acdemic and personal goals in the dedicated goal setting section.'
            />
          </div>
        </div>
      </section>
      {/* reach to us */}
      <section className='bg-purple-100'>
        <div className='max-w-[600px] m-auto py-[5em] px-5 text-center text-zinc-950'>
          <h1 className='text-[3em] font-[900]'>Let's Talk Timey</h1>
          <p className='py-5 text-md text-gray-600'>
            React to us about Timey and we will be happy to hear from you
          </p>
          <Button text='Contact Us' />
        </div>
      </section>
      {/* Footer */}
      <footer className='bg-blue-white'>
        <div className='max-w-[1300px] m-auto p-8'>
          <div className=' max-md:flex-col max-md:justify-center space-y-4 flex items-center justify-between'>
            <div className=''>
              <Logo margin={true} />
              <p className='pt-2 text-gray-500 text-xs'>
                The ultimate learning companion
              </p>
            </div>
            <div className=''>
              <nav className='max-md:flex-col  flex items-center space-x-5'>
                <Link>
                  <p className='text-zinc-950 font-[400] text-md'>
                    Terms of Service
                  </p>
                </Link>
                <Link>
                  <p className='text-zinc-950 font-[400] text-md'>
                    Privacy Policy
                  </p>
                </Link>
              </nav>
            </div>
            <div className='flex space-x-5 max-md:mt-4'>
              <a href='http://'>
                <FaFacebook />
              </a>
              <a href='http://'>
                <FaTwitter />
              </a>
              <a href='http://'>
                <FaLinkedin />
              </a>
            </div>
          </div>
          <hr className='my-5' />
          <p className='text-center text-sm'>
            Timey &copy;{new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
