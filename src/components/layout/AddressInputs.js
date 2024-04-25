export default function AddressInputs({addressProps, setAddressProp}) {
    const {phone, streetAddress, city, estate, country} = addressProps;
    return (
      <>
        <label>
            Phone Number  
        </label>
        <input
            className="text-sm" 
            type="tel" 
            placeholder="Phone Number" 
            value={phone} onChange={ev => setAddressProp('phone', ev.target.value)} 
        />
        <label>
            Address 
        </label>
        <input 
            className="text-sm"
            type="text" placeholder="Street address/ Apartments" 
            value={streetAddress} onChange={ev => setAddressProp('streetAddress', ev.target.value)} 
        />
        <div className="flex gap-2">
        <div>
            <label>
            City/ Town  
            </label>
            <input
                className="text-sm"
                type="text" 
                placeholder="City/Town" 
                value={city} onChange={ev => setAddressProp('city', ev.target.value)} 
            />
        </div>
        <div>
            <label>
            Estate  
            </label>
            <input 
                className="text-sm"
                type="text" 
                placeholder="Estate" 
                value={estate} onChange={ev => setAddressProp('estate', ev.target.value)} 
            />
        </div>
        </div>
        <label>
            Country  
        </label>
        <input 
            className="text-sm"
            type="text" 
            placeholder="Country" 
            value={country} onChange={ev => setAddressProp('country', ev.target.value)} 
        />
      </>  
    );
}