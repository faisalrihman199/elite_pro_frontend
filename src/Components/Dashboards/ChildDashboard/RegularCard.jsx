import React from 'react';

const RegularCard = ({ data }) => {
    const { icon: Icon, bgColor, heading, para } = data; // Destructure the passed object

    return (
        <div className="p-4 border border-gray-100 shadow-sm rounded-md">
            <div className="flex p-3">
                <div className='rounded-full p-3'  style={{ backgroundColor: bgColor, height:'55px' }}>
                    <Icon color='white' size={30} />
                </div>
                <div className='mx-4'>
                    <h3 className='text-xl font-semibold'>{heading}</h3>
                    <p className='text-lg font-medium'>{para}</p>
                </div>
            </div>
        </div>
    );
};

export default RegularCard;
