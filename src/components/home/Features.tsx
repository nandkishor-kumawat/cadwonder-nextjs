const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-100">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Text & Photo Search</h3>
                        <p>Find engineering solutions by simply searching with text or by uploading a photo.</p>
                    </div>
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Engineering Models</h3>
                        <p>Access popular engineering models like AutoCAD, Fusion 360, and Inventor.</p>
                    </div>
                    <div className="bg-white p-8 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-semibold mb-4">Free eBooks</h3>
                        <p>Download a wide range of engineering eBooks to enhance your learning for free.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
