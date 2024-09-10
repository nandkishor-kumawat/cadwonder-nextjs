const Pricing = () => {
    return (
        <section id="pricing" className="py-20 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12">Affordable Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Basic</h3>
                        <p className="text-lg mb-6">Get solutions for just ₹3</p>
                        <a href="#" className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-600 transition">
                            Get Started
                        </a>
                    </div>
                    <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Standard</h3>
                        <p className="text-lg mb-6">Solutions at ₹5</p>
                        <a href="#" className="bg-purple-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-purple-600 transition">
                            Get Started
                        </a>
                    </div>
                    <div className="p-8 bg-gray-50 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Premium</h3>
                        <p className="text-lg mb-6">Access everything for ₹10</p>
                        <a href="#" className="bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 transition">
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
