import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-2 max-w-[240px] w-full cursor-pointer bg-techGraphite rounded-2xl p-3 border border-techGray hover:border-techElectric/50 hover:shadow-neon-hover transition-all duration-300 group"
        >
            <div className="relative w-full h-48 sm:h-56 bg-techBlack/50 rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-110 transition-transform duration-500 ease-out object-contain w-4/5 h-4/5 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(0,163,255,0.2)]"
                    width={800}
                    height={800}
                />
                <button className="absolute top-3 right-3 bg-techBlack/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-gray-400 hover:text-red-500 z-10 border border-techGray">
                    <Image
                        className="h-3.5 w-3.5 opacity-70 hover:opacity-100 transition-opacity filter brightness-0 invert"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <div className="w-full px-1 pt-3">
                <p className="text-sm md:text-base font-semibold text-techWhite w-full truncate mb-1">{product.name}</p>
                <div className="flex items-center gap-2 mb-3">
                    <p className="text-xs font-medium text-gray-400">{4.5}</p>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                className="h-3 w-3 opacity-90"
                                src={
                                    index < Math.floor(4)
                                        ? assets.star_icon
                                        : assets.star_dull_icon
                                }
                                alt="star_icon"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between w-full mt-auto">
                    <p className="text-lg font-bold text-techWhite tracking-tight">{currency}{product.offerPrice}</p>
                    <button className="px-4 py-2 bg-techElectric/10 text-techElectric font-semibold rounded-full text-xs hover:bg-techElectric hover:text-techWhite hover:shadow-neon transition-all duration-300">
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard