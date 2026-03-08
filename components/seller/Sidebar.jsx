import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname()
    const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

    return (
        <div className='md:w-64 w-16 bg-techBlack border-r min-h-screen border-techGray py-8 flex flex-col space-y-1'>
            {menuItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-3.5 px-6 gap-3.5 transition-all duration-300 group cursor-pointer ${isActive
                                    ? "text-techElectric bg-techElectric/5 border-r-2 border-techElectric"
                                    : "text-gray-400 hover:text-techWhite hover:bg-techWhite/5"
                                }`
                            }
                        >
                            <Image
                                src={item.icon}
                                alt={item.name}
                                className={`w-5 h-5 transition-all duration-300 filter invert ${isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'}`}
                            />
                            <p className='md:block hidden font-medium tracking-tight text-sm'>{item.name}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
