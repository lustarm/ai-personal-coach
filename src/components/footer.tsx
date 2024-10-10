const Footer = () => {
    return (
        < footer className="bg-gray-800 text-white py-10 mt-4" >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    {/* Footer Links */}
                    <ul className="mb-4 sm:mb-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-8">
                        <li>
                            <a href="#" className="hover:underline">Contact Us</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Terms of Service</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Privacy Policy</a>
                        </li>
                    </ul>

                    {/* Copyright */}
                    <p className="text-sm">&copy; {new Date().getFullYear()} AI Personal Coach. All rights reserved.</p>
                </div>
            </div>
        </footer >
    )
}

export default Footer
