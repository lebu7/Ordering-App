import React from 'react';

const RegionPopup = ({ onClose, onSelectRegion }) => (
  <div className="fixed inset-0 bg-fixed bg-black/80 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg">
        <div className="text-gray-600 text-sm items-center text-center mx-auto font-semibold">Select your delivery region</div>
        <div>
            <p className="text-xs text-gray-400 mt-1">Chose a region for your delivery address</p>
        </div>
        <div className="flex gap-2 mt-1 p-2">
            <button
                type="button"
                className="text-xs items-center text-center"
                onClick={() => {
                    onSelectRegion("Nairobi Region");
                    onClose(); // Close the popup after selecting Nairobi Region
                }}
            >
                Nairobi
            </button>
            <button
                type="button"
                className="primary text-xs items-center text-center"
                onClick={() => onSelectRegion("Outside Nairobi")}
            >
                Other
            </button>
            </div>
        </div>
  </div>
);

export default RegionPopup;
