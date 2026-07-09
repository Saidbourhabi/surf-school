import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaAngleDown } from "react-icons/fa";
import { useBasinSubmit } from '../../../hooks/useBasinSubmit';

const ReservationSection = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isLoading, submit } = useBasinSubmit(import.meta.env.VITE_BASIN_ENDPOINT);

  const onSubmit = async (data) => {
    // * Combine country code + phone number
    const fullPhone = `${data.countryCode} ${data.phone}`;
    data.phone = fullPhone;
    delete data.countryCode; // we send only 'phone' to Basin

    const toastId = toast.loading('Sending your reservation...');
    const result = await submit(data);

    if (result.success) {
      toast.success('Reservation sent! We’ll get back to you soon.', { id: toastId });
      reset();
    } else {
      toast.error(`Submission failed: ${result.error}`, { id: toastId });
    }
  };

  return (
    <div className="isolate bg-[#262223] px-6 py-24 sm:py-32 lg:px-8">
      {/* Heading & subheading */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl uppercase text-balance text-[#05C7F2] sm:text-5xl">
          Contact
        </h2>
        <p className="mt-2 text-lg/8 text-[#f2f2f2]">
          Contact us with your enquiries and we can help you book
        </p>
      </div>

      {/* Reservation form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        noValidate
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* // * First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm/6  text-[#F2F2F2]">
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="firstName"
                type="text"
                autoComplete="given-name"
                {...register('firstName', { required: 'First name is required' })}
                className={`block w-full  bg-white/5 px-3.5 py-2 text-base text-[#F2F2F2] outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#05C7F2] ${
                  errors.firstName ? 'outline-red-500 focus:outline-red-500' : ''
                }`}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
              )}
            </div>
          </div>

          {/* // * Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm/6  text-[#F2F2F2]">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="lastName"
                type="text"
                autoComplete="family-name"
                {...register('lastName', { required: 'Last name is required' })}
                className={`block w-full  bg-white/5 px-3.5 py-2 text-base text-[#F2F2F2] outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#05C7F2] ${
                  errors.lastName ? 'outline-red-500 focus:outline-red-500' : ''
                }`}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* // * Email – full width */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6  text-[#F2F2F2]">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`block w-full  bg-white/5 px-3.5 py-2 text-base text-[#F2F2F2] outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#05C7F2] ${
                  errors.email ? 'outline-red-500 focus:outline-red-500' : ''
                }`}
                placeholder="Your Email Adress"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* // * Phone number – with country dropdown */}
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm/6  text-[#F2F2F2]">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex  bg-white/5 outline-1 -outline-offset-1 outline-white has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#05C7F2]">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="countryCode"
                    {...register('countryCode')}
                    className="col-start-1 row-start-1 w-full appearance-none  bg-transparent py-2 pr-7 pl-3.5 text-base text-[#05C7F2] placeholder:text-gray-500 sm:text-sm/6"
                    defaultValue="+212"
                  >
                    <option value="+212">MA</option>
                    <option value="+1">US</option>
                    <option value="+1">CA</option>
                    <option value="+44">UK</option>
                    <option value="+33">FR</option>
                    <option value="+49">DE</option>
                    <option value="+61">AU</option>
                  </select>
                  <FaAngleDown
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  />
                </div>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9\-+ ]+$/,
                      message: 'Invalid phone number',
                    },
                  })}
                  className={`block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-[#F2F2F2] placeholder:text-gray-500 focus:outline-none sm:text-sm/6 ${
                    errors.phone ? 'outline-red-500' : ''
                  }`}
                  placeholder="123-456-7890"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* // *  Arrival Date */}
          <div>
            <label htmlFor="arrivalDate" className="block text-sm/6  text-[#F2F2F2]">
              Arrival Date
            </label>
            <div className="mt-2.5">
              <input
                id="arrivalDate"
                type="date"
                {...register('arrivalDate', { required: 'Arrival date is required' })}
                className={`block w-full  bg-white/5 px-3.5 py-2 text-base text-[#F2F2F2] outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#05C7F2] [&::-webkit-calendar-picker-indicator]:invert ${
                  errors.arrivalDate ? 'outline-red-500 focus:outline-red-500' : ''
                }`}
              />
              {errors.arrivalDate && (
                <p className="mt-1 text-sm text-red-400">{errors.arrivalDate.message}</p>
              )}
            </div>
          </div>

          {/* // * Departure Date */}
          <div>
            <label htmlFor="departureDate" className="block text-sm/6  text-[#F2F2F2]">
              Departure Date
            </label>
            <div className="mt-2.5">
              <input
                id="departureDate"
                type="date"
                {...register('departureDate', { required: 'Departure date is required' })}
                className={`block w-full  bg-white/5 px-3.5 py-2 text-base text-[#F2F2F2] outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#05C7F2] [&::-webkit-calendar-picker-indicator]:invert ${
                  errors.departureDate ? 'outline-red-500 focus:outline-red-500' : ''
                }`}
              />
              {errors.departureDate && (
                <p className="mt-1 text-sm text-red-400">{errors.departureDate.message}</p>
              )}
            </div>
          </div>

              {/* // * Number of Guests */}

          <div>
            <label htmlFor="guests" className="block text-sm/6  text-[#F2F2F2]">
              Guests
            </label>
            <div className="mt-2.5">
              <input
                id="guests"
                type="number"
                min="1"
                {...register('guests', {
                  required: 'Number of guests is required',
                  min: { value: 1, message: 'At least 1 guest' },
                })}
                className={`block w-full  bg-white/5 px-3.5 py-2 text-base text-[#F2F2F2] outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#05C7F2] ${
                  errors.guests ? 'outline-red-500 focus:outline-red-500' : ''
                }`}
                placeholder="1"
              />
              {errors.guests && (
                <p className="mt-1 text-sm text-red-400">{errors.guests.message}</p>
              )}
            </div>
          </div>

          {/* // * Special Requests – full width */}
          <div className="sm:col-span-2">
            <label htmlFor="notes" className="block text-sm/6  text-[#F2F2F2]">
              Special Requests / Notes
            </label>
            <div className="mt-2.5">
              <textarea
                id="notes"
                rows={4}
                {...register('notes')}
                className="block w-full  bg-white/5 px-3.5 py-2 text-base text-[#F2F2F2] outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#05C7F2]"
                placeholder="Any special requests or additional information..."
              />
            </div>
          </div>
        </div>

        {/* // * Submit button */}
        <div className="mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="block w-full cursor-pointer  bg-[#05C7F2] px-3.5 py-2.5 text-center text-sm  text-[#F2F2F2] hover:bg-[#05c7f2c5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05C7F2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Submitting...' : 'Book Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationSection;