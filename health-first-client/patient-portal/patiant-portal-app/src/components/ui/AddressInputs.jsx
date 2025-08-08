import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

const AddressInputs = ({ 
  onChange, 
  values = {}, 
  withAutocomplete = false,
  error
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="street"
            name="street"
            type="text"
            value={values.street || ''}
            onChange={onChange}
            placeholder="Enter your street address"
            className="input-field pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={values.city || ''}
            onChange={onChange}
            placeholder="City"
            className="input-field"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            id="state"
            name="state"
            value={values.state || ''}
            onChange={onChange}
            className="input-field"
          >
            <option value="">Select State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={values.zipCode || ''}
            onChange={onChange}
            placeholder="ZIP Code"
            className="input-field"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default AddressInputs; 