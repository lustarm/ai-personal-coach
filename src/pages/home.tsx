import Footer from "../components/footer"
import Navbar from "../components/navbar"

const Home = () => {
    return (
        <>
            <Navbar />

            <div className="relative flex flex-col col-auto">
                <img
                    src="./src/assets/coach.jpg"
                    className="bg-gray-100 shadow-md object-cover w-screen
                    brightness-50 h-96" // You can also set a specific height here
                />

                {/* Text container positioned at the top */}
                <div className="absolute inset-0 flex flex-col justify-start items-center text-center p-4"> {/* Add padding to give it some space from the top */}
                    <h1 className="text-3xl font-bold text-white">Welcome to AI Personal Coach</h1>
                    <p className="mt-4 text-white max-w-lg mx-auto">
                        Ready to unlock your full potential? With AI Personal Coach, you'll get personalized coaching and real-time
                        guidance tailored to your unique goals. Whether you're aiming to boost your productivity, improve your fitness,
                        or find balance in life, our AI-powered assistant is here to motivate, guide, and track your progress every
                        step of the way. Join now and start your journey towards a better you today!
                    </p>
                    <button className="mt-3 font-medium transition duration-300 ease-in-out bg-green-800 hover:bg-green-600 focus:outline-none text-white w-44 h-10 rounded-sm">
                        Talk to a coach now!
                    </button>
                </div>
                <div className="mt-10 flex flex-col md:flex-row items-center">
                    <div className="ml-8 flex-shrink-0">
                        <img
                            src="./src/assets/women.jpg"
                            className="object-cover"
                        />
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-black">
                            {/* Another header to inform what we do */}
                            Discover Your Potential with Our AI Coaching
                        </h1>
                        <p className="text-gray-700">
                            Our AI Personal Coach is designed to empower you to reach your goals, offering personalized guidance and support every step of the way.
                            Whether you're looking to improve your fitness, enhance your productivity, or find balance in your life, we’re here to help you succeed!
                        </p>
                    </div>
                </div>

            </div>


            <Footer />
        </>
    );

}

export default Home
