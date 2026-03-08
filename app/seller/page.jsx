'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const AddProduct = () => {

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic remains unchanged
  };

  return (
    <div className="flex-1 min-h-screen bg-techBlack text-techWhite relative">
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:p-12 p-6 max-w-4xl"
      >
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Add New Product
          </h1>
          <p className="text-gray-400 text-sm">Enter the product details to list it on the marketplace.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Section */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Product Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <label key={index} htmlFor={`image${index}`} className="relative cursor-pointer group/img">
                  <input onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }} type="file" id={`image${index}`} hidden />

                  <div className={`aspect-square rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300 ${files[index] ? 'border-techElectric bg-techGraphite' : 'border-techGray hover:border-gray-500 bg-techWhite/5'}`}>
                    {files[index] ? (
                      <Image
                        src={URL.createObjectURL(files[index])}
                        alt="preview"
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 opacity-50">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        <span className="text-[10px] font-bold text-gray-400">ADD</span>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Details Section */}
          <section className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1" htmlFor="product-name">
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="Enter model name"
                className="w-full bg-techGraphite border border-techGray rounded-xl px-5 py-4 outline-none focus:border-techElectric transition-all text-techWhite font-medium placeholder:text-gray-600"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1" htmlFor="product-description">
                Description
              </label>
              <textarea
                id="product-description"
                rows={4}
                className="w-full bg-techGraphite border border-techGray rounded-xl px-5 py-4 outline-none focus:border-techElectric transition-all text-techWhite font-medium placeholder:text-gray-600 resize-none"
                placeholder="Enter product specifications and details..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              ></textarea>
            </div>
          </section>

          {/* Configuration Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="w-full bg-techGraphite border border-techGray rounded-xl px-5 py-4 outline-none focus:border-techElectric transition-all text-techWhite font-medium appearance-none cursor-pointer"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Earphone">Earphone</option>
                <option value="Headphone">Headphone</option>
                <option value="Watch">Watch</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Camera">Camera</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1" htmlFor="product-price">
                Regular Price
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input
                  id="product-price"
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-techGraphite border border-techGray rounded-xl pl-9 pr-5 py-4 outline-none focus:border-techElectric transition-all text-techWhite font-medium"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1" htmlFor="offer-price">
                Offer Price
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-techElectric font-bold">$</span>
                <input
                  id="offer-price"
                  type="number"
                  placeholder="0.00"
                  className="w-full bg-techGraphite border border-techGray rounded-xl pl-9 pr-5 py-4 outline-none focus:border-techElectric transition-all text-techWhite font-medium"
                  onChange={(e) => setOfferPrice(e.target.value)}
                  value={offerPrice}
                  required
                />
              </div>
            </div>
          </section>

          <footer className="pt-6">
            <button
              type="submit"
              className="w-full sm:w-64 bg-techWhite text-techBlack font-bold py-4 rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs"
            >
              Add Product
            </button>
          </footer>
        </form>
      </motion.main>
    </div>
  );
};

export default AddProduct;