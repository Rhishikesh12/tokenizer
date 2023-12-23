/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import submit from "./assets/submit.png";
import clear from "./assets/clear.png";
import paste from "./assets/paste.png";

function App() {
	const [identities, setIdentities] = useState([]);
	const [results, setResults] = useState([]);

	const handleTextareaChange = (e) => {
		const textareaValue = e.target.value;
		const identitiesArray = textareaValue
			.split("\n")
			.filter((identity) => identity.trim() !== "");
		setIdentities(identitiesArray);
	};

	const clearInput = () => {
		setIdentities([]);
	};

	// const pasteInput = () => {
	// 	// Implement paste functionality if needed
	// };

	const pasteInput = async () => {
		try {
			const clipboardData = await navigator.clipboard.readText();
			const identitiesArray = clipboardData
				.split("\n")
				.filter((identity) => identity.trim() !== "");
			setIdentities(identitiesArray);
		} catch (error) {
			console.error("Error pasting from clipboard:", error);
		}
	};

	const fetchData = async () => {
		try {
			const resultsArray = await Promise.all(
				identities.map(async (identity) => {
					const response = await fetch(
						`https://tokenizer-7bic.onrender.com/api/grant/v1/solana_breakdown?identity=${identity}`
					);
					const result = await response.json();
					return result.length > 0 ? result[0].amount : "000000";
				})
			);

			setResults(resultsArray);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	// const formatAmount = (amount) => {
	// 	if (amount) {
	// 		const formattedAmount =
	// 			amount.substring(0, 4) + "." + amount.substring(4);
	// 		return formattedAmount;
	// 	} else {
	// 		return "000000";
	// 	}
	// };

	const formatAmount = (amount) => {
		if (amount) {
			const formattedAmount = parseInt(amount).toString().substring(0, 4);
			return formattedAmount;
		} else {
			return "0000";
		}
	};

	return (
		<div className='h-screen w-screen overflow-x-hidden overscroll-y-none bg-[#030711]'>
			<Navbar />

			<div>
				{/* ... (other JSX code) ... */}
				<div>
					<div className='px-20 mt-10 mb-6'>
						<div className='leading-loose'>
							<h3 className=' font-normal text-base text-gray-400 font-space-grotesk'>
								Check eligibility for different Solana airdrops 🔍
							</h3>
							<h2 className='text-white text-4xl font-bold font-space-grotesk'>
								Solana Airdrop Checker
							</h2>
						</div>
					</div>
					<hr className='mx-20 my-5 border-t-1 border-gray-500 cursor-default' />

					<div className='px-20 mt-4 mb-6'>
						<div className='leading-loose'>
							<h2 className='text-white text-2xl font-bold font-space-grotesk'>
								Enter addresses
							</h2>
							<h3 className='font-normal text-base text-gray-400 font-space-grotesk'>
								Enter addresses to check eligibility. One address per line.
							</h3>
						</div>
					</div>

					{/* TextArea */}
					<div className='max-w-8xl mx-20 my-5'>
						<textarea
							className='block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border font-space-grotesk
					border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-500
					   dark:placeholder-gray-400
					  dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700'
							rows='8'
							value={identities.join("\n")}
							onChange={handleTextareaChange}
							placeholder='Paste your addresses here...'></textarea>
					</div>
				</div>

				{/* Buttons */}
				<div className='flex flex-row justify-between px-20'>
					<button
						className='text-white text-sm items-center font-space-grotesk 
          px-32 py-[8px] border border-gray-600 flex flex-row rounded-lg mt-3 hover:bg-gray-900'
						onClick={clearInput}>
						<img className='mr-2' src={clear} alt='clear' />
						Clear
					</button>
					<button
						className='text-white text-sm items-center font-space-grotesk 
          px-32 py-[8px] border border-gray-600 flex flex-row rounded-lg mt-3 hover:bg-gray-900'
						onClick={pasteInput}>
						<img className='mr-2' src={paste} alt='submit' />
						Paste
					</button>
					<button
						className='text-black font-medium bg-white hover:bg-slate-300 text-sm items-center font-space-grotesk 
          px-52 py-[8px] border border-gray-600 flex flex-row rounded-lg mt-3'
						onClick={fetchData}>
						<img className='mr-2' src={submit} alt='submit' />
						Check
					</button>
				</div>
				<br />

				{/* Table */}
				<div>
					<div className='px-20 mt-5 mb-10 relative overflow-x-auto shadow-md sm:rounded-lg'>
						<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
							<caption className='py-5 dark:font-space-grotesk text-2xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-transparent'>
								Check Eligibility
								<p className='mt-1 dark:font-space-grotesk text-sm font-normal text-gray-500 dark:text-gray-400'>
									View eligibility for each address here.
								</p>
							</caption>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-white dark:font-bold dark:text-lg dark:font-space-grotesk'>
								<tr>
									<th scope='col' className='px-6 py-3'>
										Wallet Address
									</th>
									<th scope='col' className='px-6 py-3'>
										Pyth
									</th>
								</tr>
							</thead>
							<tbody>
								{identities.map((identity, index) => (
									<tr
										key={index}
										className='bg-white border-b dark:bg-transparent dark:font-space-grotesk dark:border-gray-700'>
										<th
											scope='row'
											className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
											{identity}
										</th>
										{/* <td className='px-6 py-4'>pyth</td> */}
										<td className='px-6 py-4'>
											{formatAmount(results[index])}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
