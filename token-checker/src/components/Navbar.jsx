/* eslint-disable react/no-unknown-property */
import twitter from "../assets/twitterx.svg";
import logo from "../assets/logo.png";

const Navbar = () => {
	return (
		<>
			<div
				className='flex flex-row px-10 lg:px-20 lg:py-5 font-space-grotesk font-bold md:py-10
        justify-between p-5 border-b-[1px] border-gray-500 cursor-pointer sticky top-0 bg-transparent z-10 backdrop-blur-2xl'>
				<div className='flex flex-row justify-center items-center text-md font-bold text-white space-x-4'>
					<img src={logo} alt='img_alt' />
					<label>Tokenizer</label>
				</div>
				<div className='flex align-middle text-white'>
					<img className='' src={twitter} alt='' />
				</div>
			</div>
		</>
	);
};

export default Navbar;
