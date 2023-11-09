import { useEffect, useState } from 'react'
import { useActions, useVariables } from '../../webbridge.es'

const TapcartBlock = () => {
	const variables = useVariables()
	const actions = useActions()
	const [variablesState, setVariablesState] = useState(null)
	const [customerIdentity, setCustomerIdentity] = useState(null)

	const [discountCode, setDiscountCode] = useState('')
	const handleDiscountCodeChange = event => {
		setDiscountCode(event.target.value)
	}

	const [giftCardCode, setGiftCardCode] = useState('')
	const handleGiftCardCodeChange = event => {
		setGiftCardCode(event.target.value)
	}

	const [toastMessage, setToastMessage] = useState('')
	const [toastType, setToastType] = useState('success')
	const handleToastMessageChange = event => {
		setToastMessage(event.target.value)
	}
	const handleToastTypeChange = event => {
		setToastType(event.target.value)
	}

	const [productId, setProductId] = useState('')
	const handleProductIdChange = event => {
		setProductId(event.target.value)
	}

	const [variantId, setVariantId] = useState('')
	const handleVariantIdChange = event => {
		setVariantId(event.target.value)
	}

	const [isRelatedProduct, setIsRelatedProduct] = useState(false)
	const handleIsRelatedProductChange = event => {
		setIsRelatedProduct(event.target.checked)
	}

	const [collectionId, setCollectionId] = useState('')
	const handleCollectionIdChange = event => {
		setCollectionId(event.target.value)
	}

	const [quantity, setQuantity] = useState(1)
	const [cartVariantId, setCartVariantId] = useState('')

	// Handlers
	const handleQuantityChange = event => {
		setQuantity(Number(event.target.value))
	}

	const handleCartVariantIdChange = event => {
		setCartVariantId(event.target.value)
	}

	const [sellingPlanId, setSellingPlanId] = useState(null)
	const handleSellingPlanIdChange = event => {
		setSellingPlanId(event.target.value)
	}

	useEffect(() => {
		if (variables) {
			setVariablesState(JSON.stringify(variables, null, 2))
		} else {
			console.error('Tapcart SDK not loaded.')
		}
	}, [variables])

	useEffect(() => {
		if (window.Tapcart) {
			window.Tapcart.registerEventHandler('cart/updated', cart => {
				console.log('cartUpdated', cart)
			})
		}
	}, [])

	useEffect(() => {
		if (window.Tapcart) {
			window.Tapcart.registerEventHandler('product/updated', product => {
				console.log('productUpdated', product)
			})
		}
	})

	const [screenType, setScreenType] = useState('web') // 'web' or 'internal'
	const [url, setUrl] = useState('')

	// New handlers
	const handleScreenTypeChange = e => setScreenType(e.target.value)
	const handleUrlChange = e => setUrl(e.target.value)

	console.log('variables', variables)

	const [withCartAttributes, setWithCartAttributes] = useState(false)
	const variablesString = JSON.stringify(variables, null, 2)

	return (
		<div className='mx-auto max-w-xl px-5 font-sans text-sm text-white'>
			<h2 className='py-2 text-white'>Variables</h2>
			<div className='mb-2 rounded bg-gray-800 p-5'>
				<pre>{variablesString}</pre>
			</div>

			<h2 className='py-2 text-white'>Discount Inputs & Actions</h2>
			<div className='mb-2 flex flex-col rounded bg-gray-800 p-5'>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='discountCode'>
						Discount Code
					</label>
					<input
						id='discountCode'
						type='text'
						value={discountCode}
						onChange={handleDiscountCodeChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter discount code'
					/>
				</div>
				<div className='flex flex-wrap justify-around'>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() =>
							actions.applyDiscount({
								discountCode
							})
						}
					>
						Apply Discount
					</button>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() =>
							actions.removeDiscounts({
								discountCode
							})
						}
					>
						Remove Discounts
					</button>
				</div>
			</div>

			<h2 className='py-2 text-white'>Gift Card Inputs & Actions</h2>
			<div className='mb-2 flex flex-col rounded bg-gray-800 p-5'>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='giftCardCode'>
						Gift Card Code
					</label>
					<input
						id='giftCardCode'
						type='text'
						value={giftCardCode}
						onChange={handleGiftCardCodeChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter gift card code'
					/>
				</div>
				<div className='flex flex-wrap justify-around'>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() => actions.applyGiftCard({ giftCardCode })}
					>
						Apply Gift Card
					</button>
				</div>
			</div>

			<h2 className='py-2 text-white'>Toast Inputs & Actions</h2>
			<div className='mb-2 flex flex-col rounded bg-gray-800 p-5'>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='toastMessage'>
						Toast Message
					</label>
					<input
						id='toastMessage'
						type='text'
						value={toastMessage}
						onChange={handleToastMessageChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter toast message'
					/>
				</div>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='toastType'>
						Toast Type
					</label>
					<select
						id='toastType'
						value={toastType}
						onChange={handleToastTypeChange}
						className='rounded bg-white px-3 py-2 text-black'
					>
						<option value='success'>Success</option>
						<option value='error'>Error</option>
					</select>
				</div>
				<div className='flex flex-wrap justify-around'>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() =>
							actions.showToast({ message: toastMessage, type: toastType })
						}
					>
						Show Toast
					</button>
				</div>
			</div>

			<h2 className='py-2 text-white'>Product Inputs & Actions</h2>
			<div className='mb-2 flex flex-col rounded bg-gray-800 p-5'>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='productId'>
						Product ID
					</label>
					<input
						id='productId'
						type='text'
						value={productId}
						onChange={handleProductIdChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter product ID'
					/>
				</div>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='variantId'>
						Variant ID
					</label>
					<input
						id='variantId'
						type='text'
						value={variantId}
						onChange={handleVariantIdChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter variant ID (optional)'
					/>
				</div>
				<div className='mb-2 flex w-full items-center'>
					<input
						id='isRelatedProduct'
						type='checkbox'
						checked={isRelatedProduct}
						onChange={handleIsRelatedProductChange}
						className='mr-2'
					/>
					<label className='text-white' htmlFor='isRelatedProduct'>
						Is Related Product
					</label>
				</div>
				<div className='flex flex-wrap justify-around'>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() =>
							actions.openProduct({ productId, variantId, isRelatedProduct })
						}
					>
						Open Product
					</button>
				</div>
			</div>

			<h2 className='py-2 text-white'>Collection Inputs & Actions</h2>
			<div className='mb-2 flex flex-col rounded bg-gray-800 p-5'>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='collectionId'>
						Collection ID
					</label>
					<input
						id='collectionId'
						type='text'
						value={collectionId}
						onChange={handleCollectionIdChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter collection ID'
					/>
				</div>
				<div className='flex flex-wrap justify-around'>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() => actions.openCollection({ collectionId })}
					>
						Open Collection
					</button>
				</div>
			</div>

			<h2 className='py-2 text-white'>Cart Inputs & Actions</h2>
			<div className='mb-2 flex flex-col rounded bg-gray-800 p-5'>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='quantity'>
						Quantity
					</label>
					<input
						id='quantity'
						type='number'
						value={quantity}
						onChange={handleQuantityChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter quantity'
					/>
				</div>

				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='variantId'>
						Variant ID
					</label>
					<input
						id='variantId'
						type='text'
						value={cartVariantId}
						onChange={handleCartVariantIdChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter variant ID (required)'
					/>
				</div>

				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='variantId'>
						Selling Plan ID
					</label>
					<input
						id='sellingPlanId'
						type='text'
						value={sellingPlanId}
						onChange={handleSellingPlanIdChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter selling plan ID'
					/>
				</div>

				<div className='mb-2 flex w-full items-center'>
					<input
						id='withCartAttributes'
						type='checkbox'
						checked={withCartAttributes}
						onChange={() => setWithCartAttributes(!withCartAttributes)}
						className='mr-2'
					/>
					<label className='text-white' htmlFor='withCartAttributes'>
						With Cart Attributes
					</label>
				</div>

				<div className='flex flex-wrap justify-around'>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() => {
							const val = {
								lineItems: [
									{ variantId: cartVariantId, quantity, sellingPlanId }
								]
							}
							if (withCartAttributes) {
								val.lineItems[0].attributes = [{ key: 'test', value: 'test' }]
							}
							return actions.addToCart(val)
						}}
					>
						Add To Cart
					</button>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() => actions.openCart()}
					>
						Open Cart
					</button>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() => {
							const val = {
								lineItems: [
									{ variantId: cartVariantId, quantity, sellingPlanId }
								]
							}

							if (withCartAttributes) {
								val.lineItems[0].attributes = [{ key: 'test', value: 'test' }]
							}
							return actions.removeFromCart(val)
						}}
					>
						Remove From Cart
					</button>
				</div>
			</div>

			<h2 className='py-2 text-white'>Open Screen Action</h2>
			<div className='mb-2 flex flex-col rounded bg-gray-800 p-5'>
				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='screenType'>
						Screen Type
					</label>
					<select
						id='screenType'
						value={screenType}
						onChange={handleScreenTypeChange}
						className='rounded bg-white px-3 py-2 text-black'
					>
						<option value='web'>Web</option>
						<option value='internal'>Internal</option>
					</select>
				</div>

				<div className='mb-2 flex w-full flex-col'>
					<label className='mb-2 text-white' htmlFor='url'>
						URL
					</label>
					<input
						id='url'
						type='text'
						value={url}
						onChange={handleUrlChange}
						className='rounded bg-white px-3 py-2 text-black'
						placeholder='Enter URL'
					/>
				</div>

				<div className='flex flex-wrap justify-around'>
					<button
						className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
						onClick={() => {
							actions.openScreen({ destination: { type: screenType, url } })
						}}
					>
						Open Screen
					</button>
				</div>
			</div>

			<h2 className='py-2 text-white'>Other Actions</h2>
			<div className='mb-2 flex flex-wrap justify-around rounded bg-gray-800 p-5'>
				<button
					className='m-2 w-full transform cursor-pointer rounded bg-gradient-to-r from-blue-400 to-blue-600 px-5 py-2 text-center text-white shadow-md transition-transform duration-200 hover:scale-105'
					onClick={() =>
						actions.getCustomerIdentity(null, {
							onSuccess: res => {
								console.log(res)
								return setCustomerIdentity(JSON.stringify(res, null, 2))
							}
						})
					}
				>
					Get Customer Identity
				</button>
				<div>
					<label>Customer Identity</label>
					<pre>{customerIdentity}</pre>
				</div>
			</div>
		</div>
	)
}

export default TapcartBlock
